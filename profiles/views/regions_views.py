from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAdminUser
from ..permissions import RequestIsReadOnly
from ..models import Region
from ..serializers.region_serializers import RegionSerializer


class RegionList(ListCreateAPIView):
    serializer_class = RegionSerializer
    permission_classes = (RequestIsReadOnly | IsAdminUser,)
    queryset = Region.objects.all()


class RegionDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = RegionSerializer
    permission_classes = (IsAdminUser,)
    queryset = Region.objects.all()
