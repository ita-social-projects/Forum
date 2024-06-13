from uuid import uuid4
from django.db import models
from authentication.models import CustomUser


def image_directory_path(instance, filename):
    return f"{instance.image_type}/{filename}"


class ProfileImage(models.Model):

    BANNER = "banner"
    LOGO = "logo"

    IMAGE_TYPES = (
        (BANNER, "banner"),
        (LOGO, "logo"),
    )

    uuid = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="created_images"
    )
    image_type = models.CharField(max_length=10, choices=IMAGE_TYPES)
    content_type = models.CharField(max_length=5, blank=True)
    image_path = models.ImageField(upload_to=image_directory_path, blank=True)
    image_size = models.PositiveIntegerField(null=True)
    hash_md5 = models.CharField(max_length=32, blank=True)
    is_approved = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
