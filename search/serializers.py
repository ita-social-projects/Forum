from rest_framework import serializers
from profiles.models import Profile
from authentication.models import CustomUser

# for imports json of fompany info

class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'comp_name')           # fields wich will be included is json