from rest_framework import serializers
from profiles.models import Profile
from profiles.models import Profile, Category


# for imports json of company info
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)


class CompanySerializers(serializers.ModelSerializer):
    comp_category = CategorySerializer(many=True, read_only=True, source='comp_category.all')
    
    class Meta:
        model = Profile
        fields = ('profile_id', 'comp_name', 'comp_category', 'comp_region', 'comp_year_of_foundation', 'comp_service_info', 'comp_address', 'comp_banner_image')           # fields wich will be included is json
