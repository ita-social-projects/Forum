from django.urls import path

from administration.views import (
    ProfilesListView,
    ProfileDetailView,
    UsersListView,
    UserDetailView,
)

app_name = "administration"

urlpatterns = [
    path("users/", UsersListView.as_view(), name="users-list"),
    path("users/<pk>/", UserDetailView.as_view(), name="user"),
    path("profiles/", ProfilesListView.as_view(), name="profile-list"),
    path(
        "profiles/<pk>/", ProfileDetailView.as_view(), name="profile-detail"
    ),
]
