from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(ListAPIView):
    """
    List all profiles depending on query parameters:
     include_deleted: bool
     include_all: bool.
    """
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = Token.objects.get(key=self.request.auth.key).user_id
        include_deleted = self.request.query_params.get("include_deleted", False)
        include_all = self.request.query_params.get("include_all", False)
        if include_all:
            return Profile.objects.all()
        if include_deleted:
            return Profile.objects.filter(person_id=user_id)
        return Profile.objects.filter(is_deleted=False, person_id=user_id)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve or delete a profile instance.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.filter(is_deleted=False)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        user_id = Token.objects.get(key=request.auth.key).user_id
        profile = get_object_or_404(self.queryset, pk=pk, person_id=user_id)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        user_id = Token.objects.get(key=request.auth.key).user_id
        profile = get_object_or_404(self.queryset, pk=pk, person_id=user_id)
        profile.is_deleted = True
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
