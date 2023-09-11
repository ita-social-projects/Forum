from rest_framework import serializers
from authentication.models import CustomUser
from profiles.models import Profile


class AdminCompanySerializer(serializers.ModelSerializer):
    person = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Profile
        fields = "__all__"
