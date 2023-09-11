from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from profiles.models import Profile
from .serializers import AdminCompanySerializer


class ProfileList(ListCreateAPIView):
    serializer_class = AdminCompanySerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self):
        user_id = self.request.user.id
        company_type = self.request.query_params.get("company_type")
        activity_type = self.request.query_params.get("activity_type")
        HEADER_ACTIVITIES = ["producer", "importer", "retail", "HORACE"]

        if company_type == "startup":
            return Profile.objects.filter(comp_is_startup=True, is_approved=True)
        elif company_type == "company":
            return Profile.objects.filter(comp_registered=True, is_approved=True)
        if activity_type in HEADER_ACTIVITIES:
            return Profile.objects.filter(comp_activity__name=activity_type, is_approved=True)

        profile_exists = Profile.objects.filter(person_id=user_id, is_approved=True).exists()
        if self.request.method == "POST" and profile_exists:
            return Profile.objects.filter(person_id=user_id, is_approved=True)

        return Profile.objects.filter(is_deleted=False, is_approved=True)
    

class ProfileDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = AdminCompanySerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get_queryset(self, pk=None):
        user_id = self.request.user.id
        if self.request.method == "DELETE":
            return Profile.objects.filter(person_id=user_id, is_deleted=False)
        if self.request.method == 'GET':
            return Profile.objects.filter(is_deleted=False)
        if self.request.method in ['PUT', 'PATCH']:
            return Profile.objects.filter(profile_id=pk)

    def update(self, request, pk=None, **kwargs):
        profile = get_object_or_404(self.get_queryset(pk=pk))
        if self.request.method == 'PUT':
            serializer = AdminCompanySerializer(profile, data=request.data)
        elif self.request.method == 'PATCH':
            serializer = AdminCompanySerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        profile = get_object_or_404(self.get_queryset(), pk=pk)
        serializer = AdminCompanySerializer(profile)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        profile = get_object_or_404(self.get_queryset(), pk=pk)
        profile.is_deleted = True
        profile.save()
        serializer = AdminCompanySerializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
