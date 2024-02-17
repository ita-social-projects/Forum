from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from administration.serializers import (
    AdminUserSerializer,
    AdminCompanyListSerializer,
    AdminCompanyDetailSerializer,
)
from administration.pagination import ListPagination
from authentication.models import CustomUser
from profiles.models import Profile


class UsersListView(ListAPIView):
    """
    List of users.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = ListPagination
    serializer_class = AdminUserSerializer
    queryset = CustomUser.objects.all().order_by("id")


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = CustomUser.objects.all().order_by("id")


class AdminProfileList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = Profile.objects.all()

class AdminProfileDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.all()
