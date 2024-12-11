from django.http import JsonResponse
from django.views import View
from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse,
)

from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
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
    ManageCategoriesSerializer,
    CategoryDetailSerializer,
)
from administration.pagination import ListPagination
from administration.models import AutoModeration, ModerationEmail
from authentication.models import CustomUser
from profiles.models import Profile, Category
from .permissions import IsStaffUser, IsStaffUserOrReadOnly, IsSuperUser
from .serializers import FeedbackSerializer
from utils.administration.send_email_feedback import send_email_feedback

from django_filters.rest_framework import DjangoFilterBackend
from .filters import UsersFilter, CategoriesFilter


class UsersListView(ListAPIView):
    """
    View to list users with optional filtering and ordering.

    ### Query Parameters:
    -  **id** / **surname** / **email** /  **is_active** /  **is_staff** / **is_superuser** / **is_deleted**
    - **company_name** /  **registration_date**

    ### Ordering:
    - Use the `ordering` parameter to sort the results.
    - Example: `/users/?ordering=id` (ascending by ID) or `/users/?ordering=-id` (descending by ID).

    ### Filters:
    - Filters are applied using `DjangoFilterBackend`. All the above query parameters are supported for filtering.
    **Without is_deleted**
    """

    permission_classes = [IsStaffUser]
    pagination_class = ListPagination
    serializer_class = AdminUserListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UsersFilter
    queryset = CustomUser.objects.select_related("profile").order_by("id")


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


class FeedbackView(CreateAPIView):
    serializer_class = FeedbackSerializer

    def perform_create(self, serializer):
        """
        Performs the creation of a new feedback record and sends an email notification.

        Parameters:
        - serializer (FeedbackSerializer): The serializer instance containing validated data.

        Returns:
        None

        This method extracts the email, message, and category from the validated data in the serializer.
        It then calls the `send_email_feedback` function to send an email notification with the provided feedback details.
        """
        email = serializer.validated_data["email"]
        message = serializer.validated_data["message"]
        category = serializer.validated_data["category"]

        send_email_feedback(email, message, category)


class ManageCategoriesView(ListCreateAPIView):
    """
    Manage categories
    ### Query Parameters:
    -  **id** / **name**

    ### Ordering:
    - Use the `ordering` parameter to sort the results.
    - Example: `/manage_categori/?ordering=id` (ascending by ID) or `/manage_categori/?ordering=-id` (descending by ID).

    ### Filters:
    - Filters are applied using `DjangoFilterBackend`. All the above query parameters are supported for filtering.
    """

    permission_classes = [IsStaffUser]
    serializer_class = ManageCategoriesSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CategoriesFilter
    pagination_class = ListPagination
    queryset = Category.objects.all().order_by("id")


class CategoryDetailView(RetrieveUpdateAPIView):
    """
    Modify activity category
    """

    permission_classes = [IsStaffUser]
    serializer_class = CategoryDetailSerializer
    queryset = Category.objects.all()
