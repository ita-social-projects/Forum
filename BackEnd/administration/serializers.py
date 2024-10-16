from django.contrib.auth import get_user_model
from rest_framework import serializers
from authentication.models import CustomUser
from profiles.models import (
    Profile,
    Region,
)
from utils.administration.create_password import generate_password
from utils.administration.send_email import send_email_about_admin_registration
from .models import AutoModeration, ModerationEmail

User = get_user_model()


class AdminRegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = (
            "id",
            "name_ukr",
        )


class AdminRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        write_only=True,
    )

    def validate(self, value):
        email = value.get("email").lower()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": "Email is already registered"}
            )

        return value

    def create(self, validated_data):
        email = validated_data.get("email")
        password = generate_password()
        admin = User.objects.create(
            email=email,
            is_staff=True,
            is_active=True,
        )
        admin.set_password(password)
        admin.save()
        send_email_about_admin_registration(email, password)
        return admin


class AdminUserListSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    registration_date = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "email",
            "name",
            "surname",
            "status",
            "company_name",
            "registration_date",
        )

    def get_company_name(self, obj) -> str:
        return obj.profile.name if hasattr(obj, "profile") else "No profile"

    def get_registration_date(self, obj) -> str:
        return (
            obj.profile.created_at if hasattr(obj, "profile") else "No profile"
        )

    def get_status(self, obj) -> dict:
        return {
            "is_active": obj.is_active,
            "is_deleted": obj.profile.is_deleted
            if hasattr(obj, "profile")
            else False,
            "status": obj.profile.status
            if hasattr(obj, "profile")
            else "pending",
        }


class AdminUserDetailSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            "name",
            "surname",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "company_name",
        )

    def get_company_name(self, obj) -> bool:
        return True if hasattr(obj, "profile") else False


class AdminCompanyListSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)
    regions = AdminRegionSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "person",
            "person_position",
            "regions",
            "official_name",
            "phone",
            "edrpou",
            "address",
            "is_deleted",
        )


class AdminCompanyDetailSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    activities = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    regions = AdminRegionSerializer(many=True, read_only=True)
    banner_image = serializers.ImageField(
        source="banner.image_path", required=False
    )
    logo_image = serializers.ImageField(
        source="logo.image_path", required=False
    )
    banner_approved_image = serializers.ImageField(
        source="banner_approved.image_path", required=False
    )
    logo_approved_image = serializers.ImageField(
        source="logo_approved.image_path", required=False
    )

    class Meta:
        model = Profile
        fields = (
            "name",
            "is_registered",
            "is_startup",
            "categories",
            "activities",
            "person",
            "person_position",
            "official_name",
            "regions",
            "common_info",
            "phone",
            "edrpou",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner",
            "logo",
            "banner_approved",
            "logo_approved",
            "banner_image",
            "banner_approved_image",
            "logo_image",
            "logo_approved_image",
            "is_deleted",
        )


class AutoModerationHoursSerializer(serializers.ModelSerializer):
    auto_moderation_hours = serializers.IntegerField(min_value=1, max_value=48)

    class Meta:
        model = AutoModeration
        fields = ("auto_moderation_hours",)


class ModerationEmailSerializer(serializers.ModelSerializer):
    email_moderation = serializers.EmailField()

    class Meta:
        model = ModerationEmail
        fields = ["email_moderation"]
