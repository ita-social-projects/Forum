from rest_framework import serializers

from apps.profiles.models import Profile
from apps.profiles.api.serializers import CategorySerializer


class CompanySerializers(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "categories",
            "region",
            "founded",
            "service_info",
            "address",
            "banner_image",
        )
