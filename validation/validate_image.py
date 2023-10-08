from django.core.exceptions import ValidationError
from PIL import Image


def validate_image_format(image: Image):
    valid_formats = ["PNG", "JPEG"]
    img = Image.open(image)
    format_ = img.format
    if format_ not in valid_formats:
        raise ValidationError(
            "Unsupported image format. Only PNG and JPEG are allowed."
        )


def validate_image_size(image: Image):
    import sys

    max_size = sys.getsizeof(image)
    print(f"{max_size=}")
    if max_size > 50:
        raise ValidationError("Image size exceeds the maximum allowed (50MB).")
