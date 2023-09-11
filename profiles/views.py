from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import SavedCompany, Profile, ViewedCompany
from .serializers import (SavedCompanySerializer, ProfileSerializer, ViewedCompanySerializer,
                          ProfileSensitiveDataROSerializer, ProfileDetailSerializer)
from .permissions import UserIsProfileOwnerOrReadOnly
from django.http import JsonResponse


class SavedCompaniesListCreate(ListCreateAPIView):
    """
    List of saved companies.
    Add a company to the saved list.
    """
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        saved_companies = SavedCompany.objects.filter(user=user)
        serializer = SavedCompanySerializer(saved_companies, many=True)
        return Response({'Companies': serializer.data})

    def post(self, request):
        user = request.user
        pk = request.data.get('company_pk')

        # Check if the company is already in the user's saved list
        if SavedCompany.objects.filter(user=user, company_id=pk).exists():
            saved_company_destroyer = SavedCompaniesDestroy()
            return saved_company_destroyer.destroy(request, pk)

        serializer = SavedCompanySerializer(data={'company': pk, 'user': user.id})
        if serializer.is_valid():
            serializer.save()
            return Response({'Company added': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SavedCompaniesDestroy(DestroyAPIView):
    """
    Remove the company from the saved list.
    """
    permission_classes = [IsAuthenticated]

    def destroy(self, request, pk):
        user = request.user
        saved_company = get_object_or_404(SavedCompany, company_id=pk, user=user)
        saved_company.delete()
        return Response(f'Company {pk} deleted', status=status.HTTP_204_NO_CONTENT)


class ProfileList(ListCreateAPIView):
    """
    List all profiles depending on query parameters:
     include_deleted: bool
     include_all: bool.
    """
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        company_type = self.request.query_params.get("company_type")
        activity_type = self.request.query_params.get("activity_type")
        HEADER_ACTIVITIES = ["producer", "importer", "retail", "HORECA"]

        if company_type == "startup":
            return Profile.objects.filter(comp_is_startup=True)
        elif company_type == "company":
            return Profile.objects.filter(comp_registered=True)
        if activity_type in HEADER_ACTIVITIES:
            return Profile.objects.filter(comp_activity__name=activity_type)

        return Profile.objects.filter(is_deleted=False)

    def create(self, request):
        profile = Profile.objects.filter(person_id=self.request.user)
        if profile.exists():
            return Response(status=409)
        return super().create(request)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a profile instance.
    Retrieve:
        If user is a person in the profile, full info returned.
        Else profile info without sensitive data returned.
        If user is authenticated, he can get sensitive data via query param 'with_contacts'.
    """
    queryset = Profile.objects.filter(is_deleted=False)
    permission_classes = [UserIsProfileOwnerOrReadOnly]

    def get_serializer_class(self):
        get_contacts = self.request.query_params.get("with_contacts")

        profile_pk = self.kwargs.get('pk')
        profile_instance = Profile.objects.filter(profile_id=profile_pk).first()
        user_pk = self.request.user.id

        if self.request.method == 'GET':
            if profile_instance.person.id == user_pk:
                return ProfileSerializer
            return ProfileSensitiveDataROSerializer if get_contacts else ProfileDetailSerializer
        else:
            return ProfileSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class ViewedCompanyList(ListCreateAPIView):
    serializer_class = ViewedCompanySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_id = self.request.user.id
        return ViewedCompany.objects.filter(user=user_id)


def region_list(request):
    regions = [{region[0]: region[1]} for region in Profile.Region.choices]
    return JsonResponse(regions, safe=False)
