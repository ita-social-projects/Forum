from rest_framework import serializers
from .activity_serializers import ActivitySerializer
from .category_serializer import CategorySerializer
from .region_serializers import RegionSerializer
from ..models import Profile
from utils.regions_ukr_names import get_regions_ukr_names_as_string


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

    def get_is_saved(self, obj) -> bool:
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_regions_ukr_display(self, obj) -> str:
        return str(get_regions_ukr_names_as_string(obj))


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
