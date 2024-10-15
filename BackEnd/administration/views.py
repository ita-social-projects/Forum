from django.http import JsonResponse
from django.views import View
from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
)

from rest_framework.generics import (
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    RetrieveUpdateAPIView,
    CreateAPIView,
)

from administration.serializers import AdminRegistrationSerializer
from forum.settings import CONTACTS_INFO
from administration.serializers import (
    AdminCompanyListSerializer,
    AdminCompanyDetailSerializer,
    AdminUserListSerializer,
    AdminUserDetailSerializer,
    AutoModerationHoursSerializer,
    ModerationEmailSerializer,
)
from administration.pagination import ListPagination
from administration.models import AutoModeration, ModerationEmail
from authentication.models import CustomUser
from profiles.models import Profile
from .permissions import IsStaffUser, IsStaffUserOrReadOnly, IsSuperUser
from django_filters.rest_framework import DjangoFilterBackend as filters
from .filters import UsersFilter


class UsersListView(ListAPIView):
    """
    List of users.
    Query parameters:
       ?sort=id&direction=asc
    Filters:
       ?company_name=
    """

    permission_classes = [IsStaffUser]
    pagination_class = ListPagination
    serializer_class = AdminUserListSerializer
    queryset = CustomUser.objects.all()  # .order_by("id") TODO
    filter_backends = [
        filters,
    ]
    filterset_class = UsersFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        status = self.request.query_params.get("status", None)
        if status:
            queryset = queryset.filter(status=status)

        sort = self.request.query_params.get("sort", "name")
        direction = self.request.query_params.get("direction", "asc")
        if direction == "desc":
            sort = f"-{sort}"
        return queryset.order_by(sort)


class UserDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user.
    """

    permission_classes = [IsStaffUser]
    serializer_class = AdminUserDetailSerializer
    queryset = CustomUser.objects.select_related("profile")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not Profile.objects.filter(person_id=instance.id).exists():
            return super().destroy(request, *args, **kwargs)
        else:
            return self.http_method_not_allowed(request, *args, **kwargs)


class ProfilesListView(ListAPIView):
    """
    List of profiles.
    """

    permission_classes = [IsStaffUser]
    pagination_class = ListPagination
    serializer_class = AdminCompanyListSerializer
    queryset = (
        Profile.objects.select_related("person")
        .prefetch_related("regions", "categories", "activities")
        .order_by("id")
    )


class ProfileDetailView(RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a Profiles.
    """

    permission_classes = [IsStaffUser]
    serializer_class = AdminCompanyDetailSerializer
    queryset = Profile.objects.select_related("person").prefetch_related(
        "regions", "categories", "activities"
    )


@extend_schema(
    request=AutoModerationHoursSerializer,
    responses={
        200: OpenApiResponse(
            response=AutoModerationHoursSerializer,
            examples=[
                OpenApiExample(
                    "Valid example",
                    summary="Valid example",
                    description="A valid example with auto_moderation_hours set to 24",
                    value={"auto_moderation_hours": 24},
                )
            ],
        ),
        400: OpenApiResponse(
            response=AutoModerationHoursSerializer,
            examples=[
                OpenApiExample(
                    "Invalid example",
                    summary="Invalid example",
                    description="An invalid example with auto_moderation_hours set to 50 (out of range)",
                    value={"auto_moderation_hours": 50},
                )
            ],
        ),
    },
)
class AutoModerationHoursView(RetrieveUpdateAPIView):
    """
    View for retrieving and updating 'auto_moderation_hours' - a value that sets
    the auto-approve delay (part of the moderation functionality).
    Value must be an integer between 1 and 48
    """

    permission_classes = [IsStaffUserOrReadOnly]
    serializer_class = AutoModerationHoursSerializer

    def get_object(self):
        return AutoModeration.get_auto_moderation_hours()


class ModerationEmailView(RetrieveUpdateAPIView):
    """
    View for retrieving and updating the ModerationEmail instance.
    Requires the user to be a superuser.
    """

    permission_classes = [IsSuperUser]
    serializer_class = ModerationEmailSerializer

    def get_object(self):
        return ModerationEmail.objects.first()


class ContactsView(View):
    """
    View for retrieving contact information.
    """

    def get(self, request):
        return JsonResponse(CONTACTS_INFO)


class CreateAdminUserView(CreateAPIView):
    """
    View for creating an admin user.
    """

    permission_classes = [
        IsSuperUser,
    ]
    serializer_class = AdminRegistrationSerializer
