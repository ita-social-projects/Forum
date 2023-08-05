from django.urls import path

from profiles import views

app_name = "authentication"

urlpatterns = [
    path("register", views.RegisterAPIView.as_view(), name="user_registration"),

]