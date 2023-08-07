from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework import serializers


User = get_user_model()


class UserRegistrationSerializer(UserCreateSerializer):
    person_email = serializers.EmailField(write_only=True)
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    comp_registered = serializers.BooleanField()
    comp_is_startup = serializers.BooleanField()

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = (
            "person_email",
            "password",
            "person_name",
            "person_surname",
            "comp_name",
            "comp_registered",
            "comp_is_startup",
        )

    def create(self, validated_data: dict):
        user = User.objects.create(**validated_data)
        if validated_data["comp_registered"]:
            user.comp_registered = True
        if validated_data["comp_is_startup"]:
            user.comp_is_startup = True
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(BaseUserSerializer):

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = "__all__"
