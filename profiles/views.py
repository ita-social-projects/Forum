from rest_framework import generics, viewsets
from .serializers import *
from profiles.models import Profile


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = ProfileRegistrationSerializer


class UsersAPIView(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
