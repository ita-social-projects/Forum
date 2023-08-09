from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreatePasswordRetypeSerializer
from rest_framework import serializers

from validation.validate_password import validate_password_long, validate_password_include_symbols


User = get_user_model()


class UserRegistrationSerializer(UserCreatePasswordRetypeSerializer):
    person_email = serializers.EmailField(write_only=True)
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    comp_registered = serializers.BooleanField()
    comp_is_startup = serializers.BooleanField()

    class Meta(UserCreatePasswordRetypeSerializer.Meta):
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

    def validate(self, attrs):
        self.fields.pop("re_password", None)
        re_password = attrs.pop("re_password")
        password = attrs.get("password")
        try:
            validate_password_long(password)
            validate_password_include_symbols(password)
        except ValidationError as error:
            print(error)
            raise serializers.ValidationError({"password": error.message})
        if attrs["password"] == re_password:
            return attrs
        else:
            raise serializers.ValidationError(
                {"password": "The two password fields didn't match."})

    def create(self, validated_data: dict):
        comp_registered = validated_data.get("comp_registered")
        comp_is_startup = validated_data.get("comp_is_startup")
        if not comp_registered and not comp_is_startup:
            raise serializers.ValidationError(
                "You must choose either registered or is_startup")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(BaseUserSerializer):

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = "__all__"
