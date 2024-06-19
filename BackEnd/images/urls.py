from django.urls import path
from .views import ImageCreateAPIView, ImageDestroyAPIView

app_name = "images"

urlpatterns = [
    path(
        "image/<str:image_type>/",
        ImageCreateAPIView.as_view(),
        name="image_create",
    ),
    path(
        "image/<str:image_type>/<uuid:image_uuid>",
        ImageDestroyAPIView.as_view(),
        name="image_delete",
    ),
]
