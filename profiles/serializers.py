from django.contrib.auth.models import AnonymousUser
from rest_framework import serializers
from .models import Profile, Activity, Category, SavedCompany, ViewedCompany


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileListSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    region_display = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "person",
            "is_registered",
            "is_startup",
            "official_name",
            "region",
            "region_display",
            "common_info",
            "address",
            "founded",
            "categories",
            "activities",
            "banner_image",
            "logo_image",
            "is_saved",
        )

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_region_display(self, obj):
        return obj.get_region_display()


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProfileDetailSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    region_display = serializers.SerializerMethodField()
    banner_image = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = (
            "id",
            "official_name",
            "region",
            "region_display",
            "common_info",
            "edrpou",
            "ipn",
            "founded",
            "address",
            "startup_idea",
            "name",
            "is_registered",
            "is_startup",
            "is_fop",
            "categories",
            "activities",
            "service_info",
            "product_info",
            "banner_image",
            "logo_image",
            "is_saved",
        )
        read_only_fields = (
            "id",
            "official_name",
            "region",
            "region_display",
            "common_info",
            "edrpou",
            "ipn",
            "founded",
            "address",
            "startup_idea",
            "name",
            "is_registered",
            "is_startup",
            "is_fop",
            "categories",
            "activities",
            "service_info",
            "product_info",
            "banner_image",
            "logo_image",
        )

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_region_display(self, obj):
        return obj.get_region_display()


class ProfileOwnerDetailViewSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    email = serializers.ReadOnlyField(source="person.email")
    region_display = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "is_fop",
            "categories",
            "activities",
            "person",
            "email",
            "person_position",
            "official_name",
            "region",
            "region_display",
            "common_info",
            "phone",
            "edrpou",
            "ipn",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner_image",
            "logo_image",
            "is_deleted",
        )
        read_only_fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "is_fop",
            "categories",
            "activities",
            "person",
            "email",
            "person_position",
            "official_name",
            "region",
            "region_display",
            "common_info",
            "phone",
            "edrpou",
            "ipn",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner_image",
            "logo_image",
            "is_deleted",
        )

    def get_region_display(self, obj):
        return obj.get_region_display()


class ProfileOwnerDetailEditSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source="person.email")

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "is_registered",
            "is_startup",
            "is_fop",
            "categories",
            "activities",
            "person",
            "email",
            "person_position",
            "official_name",
            "region",
            "common_info",
            "phone",
            "edrpou",
            "ipn",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner_image",
            "logo_image",
            "is_deleted",
        )
        read_only_fields = ("person",)


class ProfileDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)

    def validate_password(self, data):
        user = self.context["request"].user
        if not user.check_password(data):
            raise serializers.ValidationError("Invalid password")
        return data


class ProfileSensitiveDataROSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source="person.email")

    class Meta:
        model = Profile
        fields = (
            "phone",
            "email",
        )
        read_only_fields = (
            "phone",
            "email",
        )


class SavedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCompany
        fields = ("id", "user", "company", "added_at")


class ViewedCompanySerializer(serializers.ModelSerializer):
    user_profile_name = serializers.SerializerMethodField()
    company_name = serializers.SerializerMethodField()

    class Meta:
        model = ViewedCompany
        fields = (
            "id",
            "user",
            "company",
            "date",
            "user_profile_name",
            "company_name",
        )
        read_only_fields = (
            "user",
            "company",
        )

    def get_user_profile_name(self, obj):
        if obj.user:
            return obj.user_profile_name
        return None

    def get_company_name(self, obj):
        return obj.company_name


class RegionSerializer(serializers.Serializer):
    def to_representation(self, obj):
        return {"key": obj[0], "value": obj[1]}
