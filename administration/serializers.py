from rest_framework import serializers
from djoser.serializers import UserSerializer

from authentication.models import CustomUser
from profiles.models import Profile


class AdminUserListSerializer(serializers.ModelSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ("id", "email", "name", "surname",)


class AdminUserDetailSerializer(serializers.ModelSerializer):
    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = (
            "name",
            "surname",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
        )

class AdminCompanyListSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "person",
            "person_position",
            "region",
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

