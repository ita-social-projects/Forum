from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import SavedCompany, Profile, ViewedCompany
from .serializers import (SavedCompanySerializer, ProfileSerializer, ViewedCompanySerializer,
                          ProfileSensitiveDataROSerializer, ProfileDetailSerializer)


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
    permission_classes = (IsAuthenticatedOrReadOnly, )

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
    Retrieve or delete a profile instance.
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self, pk=None):
        user_id = self.request.user.id
        if self.request.method == "DELETE":
            return Profile.objects.filter(person_id=user_id, is_deleted=False)
        if self.request.method == 'GET':
            return Profile.objects.filter(is_deleted=False)
        if self.request.method in ['PUT', 'PATCH']:
            return Profile.objects.filter(profile_id=pk)

    def get_serializer_class(self):
        get_contacts = self.request.query_params.get("get_contacts")
        if self.request.method == 'GET':
            return ProfileSensitiveDataROSerializer if get_contacts else ProfileDetailSerializer
        else:
            return ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_authenticated and request.query_params.get("get_contacts"):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if request.user.id == instance.person.id:
            serializer = ProfileSerializer(instance)
        else:
            serializer = self.get_serializer(instance)

        return Response(serializer.data)

    def update(self, request, pk=None, **kwargs):
        profile = get_object_or_404(self.get_queryset(pk=pk))
        if self.request.method == 'PUT':
            serializer = self.get_serializer(profile, data=request.data)
        elif self.request.method == 'PATCH':
            serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        profile = get_object_or_404(self.get_queryset(), pk=pk)
        profile.is_deleted = True
        profile.save()
        serializer = self.get_serializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


class ViewedCompanyList(ListCreateAPIView):
    serializer_class = ViewedCompanySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_id = self.request.user.id
        return ViewedCompany.objects.filter(user=user_id)
