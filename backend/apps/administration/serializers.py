from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from djoser.serializers import UserSerializer

from backend.apps.authentication.models import CustomUser
from backend.apps.profiles.models import Profile


User = get_user_model()


class AdminUserSerializer(UserSerializer):
    phone_number = serializers.SerializerMethodField()

    def get_phone_number(self, user):
        try:
            return user.profile.phone_number
        except ObjectDoesNotExist:
            return None

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "name",
            "surname",
            "email",
            "phone_number",
            "is_active",
            "is_staff",
        )
        read_only_fields = ("phone_number", "email")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("email", "name", "surname")


class AdminCompanyListSerializer(serializers.ModelSerializer):
    person = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = (
            "name",
            "is_registered",
            "is_startup",
            "person",
            "person_position",
            "official_name",
            "phone",
            "edrpou",
            "address",
            "is_deleted",
        )


class AdminCompanyDetailSerializer(serializers.ModelSerializer):
    person = UserSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    activities = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
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
            "region",
            "common_info",
            "phone",
            "edrpou",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner_image",
            "is_deleted",
        )
