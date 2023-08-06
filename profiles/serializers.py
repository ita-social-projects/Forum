from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

from .models import Profile, Activity, Category


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileRegistrationSerializer(UserCreateSerializer):
    person_email = serializers.EmailField(write_only=True)
    person_password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Profile
        fields = ["person_email", "person_password", "person_surname", "person_name", "comp_name", "comp_category", "comp_registered", "comp_is_startup"]

    def create(self, validated_data):
        user = Profile.objects.create(**validated_data)
        user.set_password(self.validated_data["person_password"])
        user.comp_category.set(self.validated_data["comp_category"])
        if self.validated_data["comp_registered"]:
            user.company_registered = 1
        if self.validated_data["comp_is_startup"]:
            user.company_registered = 1
        user.save()
        return user


class ProfileSerializer(UserSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
