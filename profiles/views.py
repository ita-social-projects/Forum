from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import SavedCompany, Profile, ViewedCompany
from .serializers import SavedCompanySerializer, ProfileSerializer, ViewedCompanySerializer


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
            return Response({'error': 'Company already in saved list'}, status=status.HTTP_400_BAD_REQUEST)

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
        user_id = self.request.user.id
        company_type = self.request.query_params.get("company_type")
        activity_type = self.request.query_params.get("activity_type")
        HEADER_ACTIVITIES = ["producer", "importer", "retail", "HORACE"]

        if company_type == "startup":
            return Profile.objects.filter(comp_is_startup=True)
        elif company_type == "company":
            return Profile.objects.filter(comp_registered=True)
        if activity_type in HEADER_ACTIVITIES:
            return Profile.objects.filter(comp_activity__name=activity_type)

        profile_exists = Profile.objects.filter(person_id=user_id).exists()
        if self.request.method == "POST" and profile_exists:
            return Profile.objects.filter(person_id=user_id)

        return Profile.objects.filter(is_deleted=False)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve or delete a profile instance.
    """
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_id = self.request.user.id
        if self.request.method == "DELETE":
            return Profile.objects.filter(person_id=user_id, is_deleted=False)
        if self.request.method == 'GET':
            return Profile.objects.filter(is_deleted=False)

    def retrieve(self, request, pk=None):
        profile = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        profile = get_object_or_404(self.get_queryset(), pk=pk)
        profile.is_deleted = True
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


class ViewedCompanyList(ListCreateAPIView):
    queryset = ViewedCompany.objects.all()
    serializer_class = ViewedCompanySerializer
    permission_classes = (IsAuthenticated, )

    def list(self, request, *args, **kwargs):
        user_id = self.request.user.id
        viewed_companies = ViewedCompany.objects.filter(user=user_id)
        serializer = self.serializer_class(viewed_companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user_id = self.request.user.id
        company_id = request.data.get("profile_id")
        company = get_object_or_404(Profile, profile_id=company_id)
        if company.person.pk != user_id:
            serializer = self.serializer_class(data={"user": user_id, "company": company_id})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
