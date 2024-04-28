from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAdminUser
from ..permissions import RequestIsReadOnly
from ..models import Activity
from ..serializers.activity_serializers import ActivitySerializer


class ActivityList(ListCreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (RequestIsReadOnly | IsAdminUser,)
    queryset = Activity.objects.all()


class ActivityDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (IsAdminUser,)
    queryset = Activity.objects.all()
