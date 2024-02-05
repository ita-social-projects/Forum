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

    queryset = CustomUser.objects.filter(is_superuser=False).order_by("id")
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = ListPagination


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """

    queryset = CustomUser.objects.filter(is_superuser=False).order_by("id")
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer


class AdminProfileList(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = Profile.objects.filter(is_deleted=False)


class AdminProfileDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.filter(is_deleted=False)
