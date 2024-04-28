from django.utils.functional import cached_property
from django.shortcuts import get_object_or_404
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from ..models import Profile, Category, Activity, Region
from ..permissions import (
    IsOwner,
    RequestIsReadOnly,
    RequestIsCreate,
)
from ..serializers.serializers import (
    ViewedCompanySerializer,
    CategorySerializer,
    ActivitySerializer,
    RegionSerializer,
)


class ProfileViewCreate(CreateAPIView):
    serializer_class = ViewedCompanySerializer
    permission_classes = ((RequestIsCreate & (~IsAuthenticated | ~IsOwner)),)

    @cached_property
    def current_user(self):
        return (
            self.request.user if self.request.user.is_authenticated else None
        )

    @cached_property
    def _profile(self):
        return get_object_or_404(
            Profile.objects.active_only(),
            pk=self.kwargs["profile_id"],
        )

    def perform_create(self, serializer):
        serializer.save(user=self.current_user, company=self._profile)


class CategoryList(ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = (RequestIsReadOnly | IsAdminUser,)
    queryset = Category.objects.all()


class ActivityList(ListCreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (RequestIsReadOnly | IsAdminUser,)
    queryset = Activity.objects.all()


class RegionList(ListCreateAPIView):
    serializer_class = RegionSerializer
    permission_classes = (RequestIsReadOnly | IsAdminUser,)
    queryset = Region.objects.all()


class CategoryDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = (IsAdminUser,)
    queryset = Category.objects.all()


class ActivityDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (IsAdminUser,)
    queryset = Activity.objects.all()


class RegionDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = RegionSerializer
    permission_classes = (IsAdminUser,)
    queryset = Region.objects.all()
