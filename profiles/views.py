from .models import Profile
from .serializers import ProfileSerializer

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ProfileList(ListAPIView):
    """
    List all profiles depending on query parameter include_deleted.
    """
    serializer_class = ProfileSerializer

    def get_queryset(self):
        include_deleted = self.request.query_params.get("include_deleted", False)
        if include_deleted:
            return Profile.objects.all()
        return Profile.objects.filter(is_deleted=False)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve or delete a profile instance.
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.filter(is_deleted=False)

    def retrieve(self, request, pk=None):
        # queryset = Profile.objects.all()
        profile = get_object_or_404(self.queryset, pk=pk)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        profile = get_object_or_404(self.queryset, pk=pk)
        profile.is_deleted = True
        profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
