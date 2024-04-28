import django_filters
from rest_framework.generics import (
    ListCreateAPIView,
)
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from forum.pagination import ForumPagination
from ..models import SavedCompany, Profile
from ..serializers.profile_list_serializers import (
    ProfileListSerializer,
    ProfileCreateSerializer,
)
from ..filters import ProfileFilter


class ProfileList(ListCreateAPIView):
    """
    List all profiles depending on query parameters:
     include_deleted: bool
     include_all: bool.
    """

    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = ForumPagination
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
    ]
    filterset_class = ProfileFilter

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProfileListSerializer
        else:
            return ProfileCreateSerializer

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

    def get_queryset(self):
        user_id = self.request.query_params.get("userid")
        queryset = (
            Profile.objects.active_only()
            .prefetch_related("regions", "categories", "activities")
            .order_by("id")
        )
        if user_id:
            try:
                return queryset.filter(person_id=user_id)
            except ValueError:
                pass
        return queryset

    def create(self, request):
        profile = Profile.objects.filter(person_id=self.request.user)
        if profile.exists():
            return Response(status=409)
        return super().create(request)
