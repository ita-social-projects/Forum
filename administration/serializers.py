from rest_framework import serializers

from authentication.models import CustomUser
from profiles.models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'surname')


class AdminCompanyListSerializer(serializers.ModelSerializer):
    person = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = (
            'name',
            'is_registered',
            'is_startup',
            'person',
            'person_position',
            'official_name',
            'phone',
            'edrpou',
            'address',
            'is_deleted'
        )


class AdminCompanyDetailSerializer(serializers.ModelSerializer):
    person = UserSerializer(read_only=True)
    categories = serializers.SlugRelatedField(many=True, slug_field='name', read_only=True)
    activities = serializers.SlugRelatedField(many=True, slug_field='name', read_only=True)

    class Meta:
        model = Profile
        fields = (
            'name',
            'is_registered',
            'is_startup',
            'categories',
            'activities',
            'person',
            'person_position',
            'official_name',
            'region',
            'common_info',
            'phone',
            'edrpou',
            'founded',
            'service_info',
            'product_info',
            'address',
            'startup_idea',
            'banner_image',
            'is_deleted'
        )
