from django.core.exceptions import ValidationError
from PIL import Image


def validate_image_format(image: Image):
    valid_formats = ["png", "jpeg", "jpg"]
    img = Image.open(image)
    format_ = img.format.lower()
    if format_ not in valid_formats:
        raise ValidationError("Unsupported image format. Only PNG and JPEG are allowed.")


def validate_image_size(image: Image):
    max_size = 50 * 1024 * 1024  # 50MB in bytes
    if image.size > max_size:
        raise ValidationError("Image size exceeds the maximum allowed (50MB).")
