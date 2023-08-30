from rest_framework import serializers
from authentication.models import CustomUser
from profiles.models import Profile


class AdminCompanySerializer(serializers.ModelSerializer):
    person = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Profile
        fields = (
            "profile_id",
            "person",
            "person_position",
            "comp_name",
            "comp_region",
            "comp_phone_number",
            "comp_EDRPOU",
            "comp_address",
            "is_deleted"
        )
