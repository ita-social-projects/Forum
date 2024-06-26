from django.core.exceptions import ValidationError
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

MAX_ALLOWED_BANNER_IMAGE_SIZE = 5 * 1024 * 1024
MAX_ALLOWED_LOGO_IMAGE_SIZE = 1 * 1024 * 1024


def validate_image_format(image: Image):
    valid_formats = ["PNG", "JPEG"]
    with Image.open(image) as img:
        format_ = img.format
        if format_ not in valid_formats:
            raise ValidationError(
                "Unsupported image format. Only PNG and JPEG are allowed."
            )


def validate_banner_size(image_file):
    max_size = image_file.size
    if max_size > MAX_ALLOWED_BANNER_IMAGE_SIZE:
        raise ValidationError("Image size exceeds the maximum allowed (5MB).")


def validate_logo_size(image_file):
    max_size = image_file.size
    if max_size > MAX_ALLOWED_LOGO_IMAGE_SIZE:
        raise ValidationError("Image size exceeds the maximum allowed (1MB).")
