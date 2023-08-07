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
    comp_category = serializers.SlugRelatedField(
        slug_field="category_id",
        queryset=Category.objects.all(),
        many=True
    )
    comp_registered = serializers.BooleanField()
    comp_is_startup = serializers.BooleanField()

    class Meta:
        model = Profile
        fields = (
            "person_email",
            "person_password",
            "person_name",
            "person_surname",
            "comp_name",
            "comp_category",
            "comp_registered",
            "comp_is_startup",
        )

    def create(self, validated_data: dict):
        user = Profile.objects.create(**validated_data)
        user.set_password(validated_data["person_password"])
        user.comp_category.set(validated_data["comp_category"])
        if validated_data["comp_registered"]:
            user.comp_registered = 1
        if validated_data["comp_is_startup"]:
            user.comp_is_startup = 1
        user.save()
        return user


class ProfileSerializer(UserSerializer):
    comp_activity = ActivitySerializer(many=True, read_only=True)
    comp_category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
