from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from profiles.models import Profile
from .serializers import AdminCompanySerializer


class AdminProfileList(ListCreateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = AdminCompanySerializer
    queryset = Profile.objects.filter(is_deleted=False)
    

class AdminProfileDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = AdminCompanySerializer
    queryset = Profile.objects.filter(is_deleted=False)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
