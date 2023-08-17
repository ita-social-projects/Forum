from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .models import Profile
from .serializers import ProfileSerializer

from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


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
