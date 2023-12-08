from django.urls import path
from .views import (
    BannerChangeAPIView
)

app_name = "images"

urlpatterns = [
    path("banner/<pk>/", BannerChangeAPIView.as_view(), name="banner_change"),
]
