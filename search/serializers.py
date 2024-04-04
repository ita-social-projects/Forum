from rest_framework import serializers

from profiles.models import Profile, Category, SavedCompany
from profiles.serializers import (
    CategorySerializer,
    ActivitySerializer,
    RegionSerializer,
)
from utils.regions_ukr_names import get_regions_ukr_names_as_string


class CompanySerializers(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    regions = RegionSerializer(many=True, read_only=True)
    regions_ukr_display = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "categories",
            "activities",
            "regions",
            "regions_ukr_display",
            "founded",
            "address",
            "banner_image",
            "logo_image",
            "person",
            "is_saved",
        )

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_regions_ukr_display(self, obj):
        return get_regions_ukr_names_as_string(obj)
