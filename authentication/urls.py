from django.urls import path, include

from profiles import views

app_name = "authentication"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    path("users/", views.UsersAPI.as_view("{'get': 'list'}"), name="user_crud"),
]
