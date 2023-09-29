from django.urls import path, re_path, include

from administration.views import AdminProfileList, AdminProfileDetail, UsersListView, UserDetailView

app_name = "administration"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    re_path(r"^auth/", include('djoser.urls.authtoken')),
    path('users/', UsersListView.as_view(), name='users-list'),
    path('users/<pk>/', UserDetailView.as_view(), name='user'),
    path('profiles/', AdminProfileList.as_view(), name='profile-list'),
    path('profiles/<pk>/', AdminProfileDetail.as_view(), name='profile-detail'),
]
