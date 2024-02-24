from django.urls import include, path, re_path

from administration.views import (
    ProfilesListView,
    ProfileDetailView,
    UsersListView,
    UserDetailView,
    UserStatus,
)

app_name = "administration"

urlpatterns = [
    path("users/", UsersListView.as_view(), name="users-list"),
    path("users/<pk>/", UserDetailView.as_view(), name="user-detail"),
    path("profiles/", ProfilesListView.as_view(), name="profile-list"),
    path(
        "profiles/<pk>/", ProfileDetailView.as_view(), name="profile-detail"
    ),
    path("status/", UserStatus.as_view(), name="user-status"),
]
