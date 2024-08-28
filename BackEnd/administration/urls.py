from django.urls import path

from administration.views import (
    ContactsView,
    ProfilesListView,
    ProfileDetailView,
    UsersListView,
    UserDetailView,
    AutoModerationHoursView,
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
    path("contacts/", ContactsView.as_view(), name="contacts"),
]
