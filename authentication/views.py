from rest_framework import viewsets
from .serializers import *
from .models import CustomUser


class UsersAPIView(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer