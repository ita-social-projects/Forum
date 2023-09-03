from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from authentication.models import CustomUser
from .serializers import AdminUserSerializer
from .pagination import UserListPagination


class UsersListView(ListAPIView):
    queryset = CustomUser.objects.filter(is_superuser=False).order_by('id')
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = UserListPagination


class UserDetailView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def retrieve(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = AdminUserSerializer(user)
        return Response({'User': serializer.data})

    def update(self, request, pk, **kwargs):
        user = CustomUser.objects.get(pk=pk)

        if self.request.method == 'PUT':
            serializer = AdminUserSerializer(user, data=request.data)
        elif self.request.method == 'PATCH':
            serializer = AdminUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        user.delete()
        return Response(f'User {pk} deleted', status=status.HTTP_204_NO_CONTENT)
