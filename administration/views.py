from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from administration.serializers import AdminCompanyListSerializer, AdminCompanyDetailSerializer
from administration.pagination import ListPagination
from profiles.models import Profile


class AdminProfileList(ListCreateAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = Profile.objects.filter(is_deleted=False)
    

class AdminProfileDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.filter(is_deleted=False)
