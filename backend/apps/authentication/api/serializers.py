from collections import defaultdict

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from djoser.serializers import (
    UserCreatePasswordRetypeSerializer,
    UserSerializer,
)
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from backend.apps.profiles.models import Profile
from backend.api.validation.validate_password import (
    validate_password_long,
    validate_password_include_symbols,
)

User = get_user_model()


class CustomProfileSerializer(serializers.ModelSerializer):
    is_registered = serializers.BooleanField()
    is_startup = serializers.BooleanField()

    class Meta:
        model = Profile
        fields = ("name", "is_registered", "is_startup")


class UserRegistrationSerializer(UserCreatePasswordRetypeSerializer):
    company = CustomProfileSerializer(write_only=True)
    email = serializers.EmailField(
        write_only=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Email is already registered",
            )
        ],
    )
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = ("email", "password", "name", "surname", "company")

    def validate(self, value):
        custom_errors = defaultdict(list)
        self.fields.pop("re_password", None)
        re_password = value.pop("re_password")
        password = value.get("password")
        company_data = value.get("company")
        is_registered = company_data.get("is_registered")
        is_startup = company_data.get("is_startup")
        if not is_registered and not is_startup:
            custom_errors["comp_status"].append(
                "Please choose who you represent."
            )
        elif is_registered and is_startup:
            custom_errors["comp_status"].append(
                "Please choose either registered or startup."
            )
        try:
            validate_password_long(password)
        except ValidationError as error:
            custom_errors["password"].append(error.message)
        try:
            validate_password_include_symbols(password)
        except ValidationError as error:
            custom_errors["password"].append(error.message)
        if value["password"] != re_password:
            custom_errors["password"].append("Passwords don't match.")
        if custom_errors:
            raise serializers.ValidationError(custom_errors)
        return value

    def create(self, validated_data):
        company_data = validated_data.pop("company")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        Profile.objects.create(**company_data, person=user)
        return user


class UserListSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "name",
            "surname",
        )
