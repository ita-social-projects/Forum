from rest_framework import serializers
from .models import (
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


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = "__all__"


class ProfileListSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    regions = RegionSerializer(many=True, read_only=True)
    regions_ukr_display = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "person",
            "is_registered",
            "is_startup",
            "official_name",
            "regions",
            "regions_ukr_display",
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

    def get_regions_ukr_display(self, obj):
        return get_regions_ukr_names_as_string(obj)


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


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

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_regions_ukr_display(self, obj):
        return get_regions_ukr_names_as_string(obj)


class ProfileOwnerDetailViewSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    email = serializers.ReadOnlyField(source="person.email")
    regions = RegionSerializer(many=True, read_only=True)
    regions_ukr_display = serializers.SerializerMethodField()

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
            "regions",
            "regions_ukr_display",
            "common_info",
            "phone",
            "edrpou",
            "rnokpp",
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
            "regions",
            "regions_ukr_display",
            "common_info",
            "phone",
            "edrpou",
            "rnokpp",
            "founded",
            "service_info",
            "product_info",
            "address",
            "startup_idea",
            "banner_image",
            "logo_image",
            "is_deleted",
        )

    def get_regions_ukr_display(self, obj):
        return get_regions_ukr_names_as_string(obj)


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
            "regions",
            "common_info",
            "phone",
            "edrpou",
            "rnokpp",
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

    def validate(self, data):
        edrpou = data.get("edrpou", self.instance.edrpou)
        rnokpp = data.get("rnokpp", self.instance.rnokpp)
        is_fop = data.get("is_fop", self.instance.is_fop)
        if rnokpp and not is_fop:
            raise serializers.ValidationError(
                {
                    "is_fop": "For the RNOKPP field filled out, FOP must be set to True"
                }
            )
        if edrpou and is_fop:
            raise serializers.ValidationError(
                {
                    "is_fop": "For the EDRPOU field filled out, FOP must be set to False"
                }
            )
        return data


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
        read_only_fields = ["user", ]

    def validate(self, attrs):
        user = self.context["request"].user
        company = attrs["company"]
        company__to_find = SavedCompany.objects.filter(user=user, company=company)
        if company__to_find:
            raise serializers.ValidationError("Company is already in users saved companies list")
        return attrs


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
