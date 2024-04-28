from rest_framework import serializers
from ..models import (
    Profile,
    Activity,
    Category,
    SavedCompany,
    ViewedCompany,
    Region,
)
from utils.regions_ukr_names import get_regions_ukr_names_as_string


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class RegionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name_eng = serializers.CharField()
    name_ukr = serializers.CharField()

    def update(self, instance, validated_data):
        instance.name_eng = validated_data.get("name_eng", instance.name_eng)
        instance.name_ukr = validated_data.get("name_ukr", instance.name_ukr)
        instance.save()
        return instance

    def create(self, validated_data):
        name_eng = validated_data.get("name_eng")
        name_ukr = validated_data.get("name_ukr")
        if (
            name_eng
            and Region.objects.filter(name_eng__iexact=name_eng).exists()
        ):
            raise serializers.ValidationError(
                "Region with this name already exists."
            )
        if (
            name_ukr
            and Region.objects.filter(name_ukr__iexact=name_ukr).exists()
        ):
            raise serializers.ValidationError(
                "Region with this name already exists."
            )
        return Region.objects.create(**validated_data)


class ProfileDetailSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    banner_image = serializers.ImageField(required=False)
    regions = RegionSerializer(many=True, read_only=True)
    regions_ukr_display = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "official_name",
            "regions",
            "regions_ukr_display",
            "common_info",
            "edrpou",
            "rnokpp",
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
            "regions",
            "regions_ukr_display",
            "common_info",
            "edrpou",
            "rnokpp",
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

    def get_is_saved(self, obj) -> bool:
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_regions_ukr_display(self, obj) -> str:
        return get_regions_ukr_names_as_string(obj)


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

    def get_user_profile_name(self, obj) -> str:
        if obj.user:
            return obj.user_profile_name
        return None

    def get_company_name(self, obj) -> str:
        return obj.company_name