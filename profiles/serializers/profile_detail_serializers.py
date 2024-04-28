from rest_framework import serializers
from .serializers import (
    ActivitySerializer,
    CategorySerializer,
    RegionSerializer,
)
from ..models import (
    Profile,
)
from utils.regions_ukr_names import get_regions_ukr_names_as_string


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

    def get_regions_ukr_display(self, obj) -> str:
        return get_regions_ukr_names_as_string(obj)


class ProfileSensitiveDataROSerializer(serializers.Serializer):
    email = serializers.CharField(source="person.email", read_only=True)
    phone = serializers.CharField(read_only=True)


class ProfileDeleteSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)

    def validate_password(self, data):
        user = self.context["request"].user
        if not user.check_password(data):
            raise serializers.ValidationError("Invalid password")
        return data


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
