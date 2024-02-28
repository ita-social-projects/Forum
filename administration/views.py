from rest_framework.permissions import (
    IsAuthenticated,
    BasePermission,
)
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveAPIView,
)

from administration.serializers import (
    AdminCompanyListSerializer,
    AdminCompanyDetailSerializer,
    AdminUserListSerializer,
    AdminUserDetailSerializer,
    AdminUserStatusSerializer,
)
from administration.pagination import ListPagination
from authentication.models import CustomUser
from profiles.models import Profile
from rest_framework.exceptions import PermissionDenied


class IsStaffUser(BasePermission):
    """
    Custom is staff permission.
    """

    def has_permission(self, request, view):
        return request.user.is_staff


class UsersListView(ListAPIView):
    """
    List of users.
    """

    permission_classes = [IsAuthenticated, IsStaffUser]
    pagination_class = ListPagination
    serializer_class = AdminUserListSerializer
    queryset = CustomUser.objects.all().order_by("id")


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """

    permission_classes = [IsAuthenticated, IsStaffUser]
    serializer_class = AdminUserDetailSerializer
    queryset = CustomUser.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if Profile.objects.filter(person_id=instance.id).exists():
            raise PermissionDenied(
                "Cannot delete user with associated profiles."
            )
        else:
            return super().destroy(request, *args, **kwargs)


class ProfilesListView(ListCreateAPIView):
    """
    List of profiles.
    """

    permission_classes = [IsAuthenticated, IsStaffUser]
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = Profile.objects.all().order_by("id")


class ProfileDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a Profiles.
    """

    permission_classes = [IsAuthenticated, IsStaffUser]
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.all()


class UserStatus(RetrieveAPIView):
    """
    User status.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = AdminUserStatusSerializer

    def get_object(self):
        return self.request.user
