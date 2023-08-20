from rest_framework import serializers
from profiles.models import Profile

# for imports json of fompany info

class CompanySerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_id', 'comp_name', 'comp_common_info', 'comp_product_info')           # fields wich will be included is json