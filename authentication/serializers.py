from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.core.exceptions import ValidationError
from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer, TokenCreateSerializer
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
                {"password": "Passwords don't match."})

    def create(self, validated_data: dict):
        comp_registered = validated_data.get("comp_registered")
        comp_is_startup = validated_data.get("comp_is_startup")
        if not comp_registered and not comp_is_startup:
            raise serializers.ValidationError({"error":
                                               "Please choose who you represent"})
        if comp_registered and comp_is_startup:
            raise serializers.ValidationError({"error":
                                               "Please choose either registered or startup"})
        if User.objects.filter(person_email=validated_data["person_email"]):
            raise serializers.ValidationError(
                {"error": "Email is already registered"})
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.is_active = True
        user.save()
        return user


class UserListSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "person_email",
            "person_name",
            "person_surname",
            "comp_name",
            "comp_registered",
            "comp_is_startup",
        )


class UserTokenCreateSerializer(TokenCreateSerializer):
    password = serializers.CharField(
        required=False, style={"input_type": "password"})

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.fields[settings.DJOSER["LOGIN_FIELD"]] = serializers.CharField(
            required=False)

    def validate(self, attrs):
        password = attrs.get("password")
        params = {settings.DJOSER["LOGIN_FIELD"]: attrs.get(settings.DJOSER["LOGIN_FIELD"])}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                raise serializers.ValidationError({"error":
                                                   "Email or password is incorrect"})
        if self.user and self.user.is_active:
            return attrs
        raise serializers.ValidationError({"error":
                                           "Email or password is incorrect"})
