from rest_framework import serializers

from authentication.models import CustomUser

from .models import Profile, Activity, Category


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    person = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Profile
        fields = "__all__"