from django.urls import include, path
from profiles import views

app_name = "authentication"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    path("profile/<int:pk>", views.UsersAPIList.as_view(), name="user_crud"),
]
