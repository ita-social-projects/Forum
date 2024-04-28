from django.utils.functional import cached_property
from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Profile
from ..permissions import (
    IsOwner,
    RequestIsCreate,
)
from ..serializers.viewed_company_serializers import ViewedCompanySerializer


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
