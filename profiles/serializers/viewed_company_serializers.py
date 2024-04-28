from rest_framework import serializers
from ..models import ViewedCompany


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
