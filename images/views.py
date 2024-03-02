from rest_framework.generics import (
    RetrieveUpdateAPIView,
)
from rest_framework.parsers import MultiPartParser, FormParser

from profiles.permissions import UserIsProfileOwnerOrReadOnly
from profiles.models import Profile
from .serializers import BannerSerializer, LogoSerializer
from utils.completeness_counter import completeness_count


class BannerRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.filter(is_deleted=False, person__is_active=True)

    def perform_update(self, serializer):
        completeness_count(serializer)


class LogoRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = LogoSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.filter(is_deleted=False, person__is_active=True)

    def perform_update(self, serializer):
        completeness_count(serializer)
