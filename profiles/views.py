from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import generics, status
from .serializers import *
from profiles.models import Profile


class RegisterAPIView(GenericAPIView):
    serializer_class = ProfileRegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersAPIList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
