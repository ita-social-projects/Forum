from django.urls import path

from administration.views import (
    ProfilesListView,
    ProfileDetailView,
    UsersListView,
    UserDetailView,
    AutoModerationHoursView,
    ModerationEmailView,
)

app_name = "administration"

urlpatterns = [
    path("users/", UsersListView.as_view(), name="users-list"),
    path("users/<pk>/", UserDetailView.as_view(), name="user-detail"),
    path("profiles/", ProfilesListView.as_view(), name="profile-list"),
    path("profiles/<pk>/", ProfileDetailView.as_view(), name="profile-detail"),
    path(
        "automoderation/",
        AutoModerationHoursView.as_view(),
        name="automoderation_hours",
    ),
    path("email/", ModerationEmailView.as_view(), name="moderation-email"),
]
