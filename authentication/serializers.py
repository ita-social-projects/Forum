from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.core.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer, TokenCreateSerializer
from rest_framework import serializers

from profiles.models import Profile
from validation.validate_password import validate_password_long, validate_password_include_symbols


User = get_user_model()


class CustomProfileSerializer(serializers.ModelSerializer):
    comp_registered = serializers.BooleanField()
    comp_is_startup = serializers.BooleanField()

    class Meta:
        model = Profile
        fields = ("comp_name", "comp_registered", "comp_is_startup")


class UserRegistrationSerializer(UserCreatePasswordRetypeSerializer):
    company = CustomProfileSerializer(write_only=True)
    person_email = serializers.EmailField(write_only=True, validators=[UniqueValidator(
        queryset=User.objects.all(), message="Email is already registered")])
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)

    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = (
            "person_email",
            "password",
            "person_name",
            "person_surname",
            "company"
        )

    def validate(self, value):
        custom_errors = {"password": [],
                         "comp_status": []}
        self.fields.pop("re_password", None)
        re_password = value.pop("re_password")
        password = value.get("password")
        company_data = value.get("company")
        comp_registered = company_data.get("comp_registered")
        comp_is_startup = company_data.get("comp_is_startup")
        if not comp_registered and not comp_is_startup:
            custom_errors["comp_status"].append(
                "Please choose who you represent.")
        elif comp_registered and comp_is_startup:
            custom_errors["comp_status"].append(
                "Please choose either registered or startup.")
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
        if any(custom_errors.values()):
            filtered_errors = {key: value for key,
                               value in custom_errors.items() if value}
            raise serializers.ValidationError(filtered_errors)
        return value

    def create(self, validated_data):
        company_data = validated_data.pop("company")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        Profile.objects.create(**company_data,
                               person=user)
        return user


class UserListSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "person_email",
            "person_name",
            "person_surname",
        )


class UserTokenCreateSerializer(TokenCreateSerializer):
    password = serializers.CharField(
        required=False, style={"input_type": "password"})

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.fields[settings.DJOSER["LOGIN_FIELD"]] = serializers.CharField(
            required=False)

    def validate(self, value):
        password = value.get("password")
        params = {settings.DJOSER["LOGIN_FIELD"]: value.get(settings.DJOSER["LOGIN_FIELD"])}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                raise serializers.ValidationError({"error":
                                                   "Email or password is incorrect"})
        if self.user and self.user.is_active:
            return value
        raise serializers.ValidationError({"error":
                                           "Email or password is incorrect"})
