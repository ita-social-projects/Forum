<<<<<<< HEAD
from django.urls import path, include

=======
from django.urls import include, path
>>>>>>> c7a03f5e9b521400ef8838f674c1a62690690c48
from profiles import views

app_name = "authentication"

urlpatterns = [
    path("auth/", include('djoser.urls')),
<<<<<<< HEAD
    path("users/", views.UsersAPI.as_view("{'get': 'list'}"), name="user_crud"),
=======
    path("profile/<int:pk>", views.UsersAPIList.as_view(), name="user_crud"),
>>>>>>> c7a03f5e9b521400ef8838f674c1a62690690c48
]
