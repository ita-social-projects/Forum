from rest_framework import generics
from .serializers import *
from profiles.models import Profile


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = ProfileRegistrationSerializer


class UsersAPIList(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
