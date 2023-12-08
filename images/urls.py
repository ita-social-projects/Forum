from django.urls import path
from .views import BannerRetrieveUpdate

app_name = "images"

urlpatterns = [
    path("banner/<pk>/", BannerRetrieveUpdate.as_view(), name="banner_change"),
]
