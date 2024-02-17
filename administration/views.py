from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
    BasePermission,
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


class IsStafUser(BasePermission):
    def has_permission(self, request, view):
        print(request.user.is_staff)
        return request.user.is_staff


class UsersListView(ListAPIView):
    """
    List of users.
    """
    permission_classes = [IsAuthenticated, IsStafUser, IsAdminUser]
    pagination_class = ListPagination
    serializer_class = AdminUserSerializer
    queryset = CustomUser.objects.all().order_by("id")


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """
    permission_classes = [IsAuthenticated, IsStafUser, IsAdminUser]
    serializer_class = AdminUserSerializer
    queryset = CustomUser.objects.all().order_by("id")


class ProfilesListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsStafUser, IsAdminUser]
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = Profile.objects.all().order_by("id")


class ProfileDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsStafUser, IsAdminUser]
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.all().order_by("id")
