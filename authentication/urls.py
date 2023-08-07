from django.urls import path, include

from django.urls import include, path, re_path
from . import views

app_name = "authentication"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    re_path(r"^auth/", include('djoser.urls.authtoken')),
    path("users/", views.UsersAPIView.as_view("{'get': 'list'}"), name="user_crud"),
]
