from rest_framework import serializers
from profiles.models import Profile
from authentication.models import CustomUser
from profiles.models import Profile, Category
# from profiles.serializers import CategorySerializer

# for imports json of fompany info
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

class CompanySerializers(serializers.ModelSerializer):
    comp_category = CategorySerializer(many=True, read_only=True, source='comp_category.all')
    
    # category = CategorySerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = ('profile_id', 'comp_name', 'comp_category', 'comp_region', 'comp_year_of_foundation', 'comp_service_info', 'comp_address', 'comp_banner_image')           # fields wich will be included is json