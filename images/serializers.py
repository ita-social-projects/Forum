from rest_framework import serializers
from profiles.models import Profile


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('banner_image',)
