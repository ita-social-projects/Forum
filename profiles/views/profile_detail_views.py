from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
)
from utils.completeness_counter import completeness_count
from ..models import SavedCompany, Profile
from ..permissions import UserIsProfileOwnerOrReadOnly
from ..serializers.serializers import ProfileDetailSerializer

from ..serializers.profile_detail_serializers import (
    ProfileOwnerDetailViewSerializer,
    ProfileSensitiveDataROSerializer,
    ProfileDeleteSerializer,
    ProfileOwnerDetailEditSerializer,
)


class ProfileDetail(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a profile instance.
    Retrieve:
        If user is a person in the profile, full info returned.
        Else profile info without sensitive data returned.
        If user is authenticated, he can get sensitive data via query param 'with_contacts'.
    """

    queryset = (
        Profile.objects.active_only()
        .select_related("person")
        .prefetch_related("regions", "categories", "activities")
    )
    permission_classes = [UserIsProfileOwnerOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_companies_pk = frozenset(
                SavedCompany.objects.filter(
                    user=self.request.user
                ).values_list("company_id", flat=True)
            )
            context.update({"saved_companies_pk": saved_companies_pk})
        return context

    def get_serializer_class(self):
        get_contacts = self.request.query_params.get("with_contacts")

        profile_pk = self.kwargs.get("pk")
        profile_instance = (
            Profile.objects.select_related("person")
            .filter(id=profile_pk)
            .first()
        )
        user_pk = self.request.user.id

        if self.request.method == "GET":
            if profile_instance.person.id == user_pk:
                return ProfileOwnerDetailViewSerializer
            return (
                ProfileSensitiveDataROSerializer
                if get_contacts
                else ProfileDetailSerializer
            )
        elif self.request.method == "DELETE":
            return ProfileDeleteSerializer
        else:
            return ProfileOwnerDetailEditSerializer

    def perform_destroy(self, instance):
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        instance.is_deleted = True
        instance.save()

    def perform_update(self, serializer):
        completeness_count(serializer)
