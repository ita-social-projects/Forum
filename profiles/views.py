from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import SavedCompany, Profile
from .serializers import SavedCompanySerializer, ProfileSerializer


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
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk=None):
        user_id = self.request.user.id
        if self.request.method == "DELETE":
            return Profile.objects.filter(person_id=user_id, is_deleted=False)
        if self.request.method == 'GET':
            return Profile.objects.filter(is_deleted=False)
        if self.request.method == 'PUT':
            return Profile.objects.filter(profile_id=pk)
        if self.request.method == 'PATCH':
            return Profile.objects.filter(profile_id=pk)

    def update(self, request, pk=None, **kwargs):
        profile = get_object_or_404(self.get_queryset(pk=pk))
        if self.request.method == 'PUT':
            serializer = ProfileSerializer(profile, data=request.data)
        elif self.request.method == 'PATCH':
            serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
