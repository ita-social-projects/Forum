from rest_framework import serializers
from images.models import ProfileImage

from validation.validate_image import (
    validate_image_format,
    validate_banner_size,
    validate_logo_size,
)


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileImage
        fields = (
            "uuid",
            "image_type",
            "image_path",
            "created_by",
            "content_type",
            "image_size",
            "hash_md5",
            "is_approved",
            "is_deleted",
            "created_at",
        )
        read_only_fields = (
            "uuid",
            "created_at",
            "created_by",
            "image_type",
            "content_type",
            "image_size",
            "hash_md5",
            "is_approved",
            "is_deleted",
        )

    def validate(self, value):
        image = value.get("image_path")
        image_type = value.get("image_type")
        if image:
            validate_image_format(image)
            if image_type == "banner":
                validate_banner_size(image)
            else:
                validate_logo_size(image)
        return value
