from rest_framework import serializers

from profiles.models import Profile, Category


class CompanySerializers(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'name', 'categories', 'region', 'founded', 'service_info', 'address', 'banner_image')
