from rest_framework import serializers
from authentication.models import CustomUser
from profiles.models import Profile


class AdminRegionSerialaizer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name_ukr = serializers.CharField(read_only=True)


class AdminUserListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField(read_only=True)
    name = serializers.CharField(read_only=True)
    surname = serializers.CharField(read_only=True)


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


class AdminCompanyListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    is_registered = serializers.BooleanField(read_only=True)
    is_startup = serializers.BooleanField(read_only=True)
    person = AdminUserDetailSerializer(read_only=True)
    person_position = serializers.CharField(read_only=True)
    regions = AdminRegionSerialaizer(many=True, read_only=True)
    official_name = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    edrpou = serializers.CharField(read_only=True)
    address = serializers.CharField(read_only=True)
    is_deleted = serializers.BooleanField(read_only=True)


class AdminCompanyDetailSerializer(serializers.ModelSerializer):
    person = AdminUserDetailSerializer(read_only=True)
    categories = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    activities = serializers.SlugRelatedField(
        many=True, slug_field="name", read_only=True
    )
    regions = AdminRegionSerialaizer(many=True, read_only=True)

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
            "banner_image",
            "is_deleted",
        )
