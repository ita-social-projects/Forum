from django.urls import path
from .views import BannerRetrieveUpdate, LogoRetrieveUpdate

app_name = "images"

urlpatterns = [
    path("banner/<pk>/", BannerRetrieveUpdate.as_view(), name="banner_change"),
    path("logo/<pk>/", LogoRetrieveUpdate.as_view(), name="logo_change"),
]
