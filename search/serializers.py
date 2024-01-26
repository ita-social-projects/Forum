from rest_framework import serializers

from profiles.models import Profile, Category, SavedCompany
from profiles.serializers import CategorySerializer


class CompanySerializers(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "categories",
            "region",
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
