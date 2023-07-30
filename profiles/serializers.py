from rest_framework import serializers
from django.core.exceptions import ValidationError
from PIL import Image
from .models import Profile, Activity, Category

REGIONS = ["east", "west", "north", "south"]


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"

    @staticmethod
    def validate_email(email_value: str):
        if "@" not in email_value:
            raise ValidationError("Email address must include the '@' symbol.")

    @staticmethod
    def validate_password(password_value: str):
        if len(password_value) < 8:
            raise ValidationError("Password must be at least 8 characters long.")
        if not any(char.isupper() for char in password_value):
            raise ValidationError("Password must include at least one uppercase letter (A-Z).")
        if not any(char.islower() for char in password_value):
            raise ValidationError("Password must include at least one lowercase letter (a-z).")
        if not any(char.isdigit() for char in password_value):
            raise ValidationError("Password must include at least one digit (0-9).")

    @staticmethod
    def validate_phone_number(phone_number_value: str):
        # validate number length
        if len(phone_number_value) != 12:
            raise ValidationError("Phone number must be exactly 12 characters long.")
        # validate number contain only digits
        if not phone_number_value.isdigit():
            raise ValidationError("Phone number must contain only numbers.")

    @staticmethod
    def validate_edrpou(edrpou_value: int):
        if len(str(edrpou_value)) != 8:
            raise ValidationError("EDRPOU must be exactly 8 digits long.")

    @staticmethod
    def validate_image(image: Image):
        # validate image format
        valid_formats = ["png", "jpeg", "jpg"]
        img = Image.open(image)
        format_ = img.format.lower()
        if format_ not in valid_formats:
            raise ValidationError("Unsupported image format. Only PNG and JPEG are allowed.")
        # validate image size
        max_size = 50 * 1024 * 1024  # 50MB in bytes
        if image.size > max_size:
            raise ValidationError("Image size exceeds the maximum allowed (50MB).")

    @staticmethod
    def validate_foundation_year(foundation_year_value: int):
        if len(str(foundation_year_value)) != 4:
            raise ValidationError("Foundation year must be exactly 4 digits long.")
