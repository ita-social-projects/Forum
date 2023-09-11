from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import SerializerMethodField

User = get_user_model()


class AdminUserSerializer(UserSerializer):

    phone_number = SerializerMethodField('get_phone_number')

    def get_phone_number(self, user):
        try:
            return user.profile.comp_phone_number
        except ObjectDoesNotExist:
            return None

    class Meta(UserSerializer.Meta):
        model = User
        fields = (
            "id",
            "person_name",
            "person_surname",
            "person_email",
            "phone_number",
            "last_login",
            "is_active",
            "is_staff"
        )
        read_only_fields = ("phone_number", )
