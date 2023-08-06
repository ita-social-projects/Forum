from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import *
from profiles.models import Profile


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = ProfileRegistrationSerializer


class UsersAPIList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
