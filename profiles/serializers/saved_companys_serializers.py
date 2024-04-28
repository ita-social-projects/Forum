from rest_framework import serializers
from ..models import SavedCompany


class SavedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCompany
        fields = ("id", "user", "company", "added_at")
