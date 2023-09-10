from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from authentication.models import CustomUser
from .serializers import AdminUserSerializer
from .pagination import UserListPagination


class UsersListView(ListAPIView):
    """
    List of users.
    """
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = UserListPagination

    def get_queryset(self):
        return CustomUser.objects.filter(is_superuser=False).order_by('id')


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = AdminUserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(is_superuser=False).order_by('id')




