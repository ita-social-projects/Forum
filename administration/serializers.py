from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import SerializerMethodField

User = get_user_model()


class AdminUserSerializer(UserSerializer):

    phone_number = SerializerMethodField()

    def get_phone_number(self, user):
        try:
            return user.profile.comp_phone_number
        except ObjectDoesNotExist:
            return None

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "name",
            "surname",
            "email",
            "phone_number",
            "is_active",
            "is_staff"
        )
        read_only_fields = ("phone_number", "email")
