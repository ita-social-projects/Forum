from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from authentication.models import CustomUser
from .serializers import UserSerializer
from .pagination import UserListPagination


class UsersListView(ListAPIView):
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    pagination_class = UserListPagination


class UserUpdateDestroyDetailView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsAdminUser]

    def retrieve(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response({'User': serializer.data})

    def update(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = CustomUser.objects.get(pk=pk)
        user.delete()
        return Response(f'User {pk} deleted', status=status.HTTP_204_NO_CONTENT)
