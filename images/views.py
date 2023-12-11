from rest_framework.generics import (
    RetrieveUpdateAPIView,
)
from rest_framework.parsers import MultiPartParser, FormParser

from profiles.permissions import UserIsProfileOwnerOrReadOnly
from profiles.models import Profile
from .serializers import BannerSerializer, LogoSerializer


class BannerRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = BannerSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.all()


class LogoRetrieveUpdate(RetrieveUpdateAPIView):
    permission_classes = (UserIsProfileOwnerOrReadOnly,)
    serializer_class = LogoSerializer
    parser_classes = (MultiPartParser, FormParser)
    queryset = Profile.objects.all()
