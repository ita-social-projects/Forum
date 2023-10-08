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


def validate_image_size(image_file):
    import sys

    max_size = sys.getsizeof(image_file.file)
    # print(image_file, f"{max_size=}", f"{type(image_file)}")
    # print(sys.getsizeof(image_file.file))
    # print(image_file.__dict__)
    if max_size > 50000:
        raise ValidationError("Image size exceeds the maximum allowed (50MB).")
