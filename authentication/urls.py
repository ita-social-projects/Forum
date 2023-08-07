from django.urls import path, include

from django.urls import include, path
from profiles import views

app_name = "authentication"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    path("users/", views.UsersAPIView.as_view("{'get': 'list'}"), name="user_crud"),
]
