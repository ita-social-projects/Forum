import re
from rest_framework import serializers

from authentication.models import CustomUser
from .models import Profile, Activity, Category, SavedCompany, ViewedCompany


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)
    person = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = "__all__"

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            saved_companies = obj.saved_list.filter(user=user)
            return saved_companies.exists() 
        return False
    

class ProfileDetailSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('comp_official_name', 'comp_region', 'comp_common_info', 'comp_EDRPOU', 'comp_year_of_foundation',
                  'comp_address', 'startup_idea', 'comp_name', 'comp_registered', 'comp_is_startup', 'category',
                  'activity', 'comp_service_info', 'comp_product_info', 'comp_banner_image')
        read_only_fields = ('comp_official_name', 'comp_region', 'comp_common_info', 'comp_EDRPOU',
                            'comp_year_of_foundation', 'comp_address', 'startup_idea', 'comp_name',
                            'comp_registered', 'comp_is_startup', 'category', 'activity', 'comp_service_info',
                            'comp_product_info', 'comp_banner_image')


class ProfileSensitiveDataROSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='person.person_email')

    class Meta:
        model = Profile
        fields = ('comp_phone_number', 'email',)
        read_only_fields = ('comp_phone_number', 'email',)


class SavedCompanySerializer(serializers.ModelSerializer):
    comp_official_name = serializers.ReadOnlyField(source='company.comp_official_name')
    comp_region = serializers.ReadOnlyField(source='company.comp_region')
    comp_common_info = serializers.ReadOnlyField(source='company.comp_common_info')
    comp_phone_number = serializers.ReadOnlyField(source='company.comp_phone_number')
    comp_EDRPOU = serializers.ReadOnlyField(source='company.comp_EDRPOU')
    comp_year_of_foundation = serializers.ReadOnlyField(source='company.comp_year_of_foundation')
    comp_address = serializers.ReadOnlyField(source='company.comp_address')
    startup_idea = serializers.ReadOnlyField(source='company.startup_idea')

    class Meta:
        model = SavedCompany
        fields = ('id', 'user', 'company', 'comp_official_name', 'comp_region', 'comp_common_info', 'comp_phone_number',
                  'comp_EDRPOU', 'comp_year_of_foundation', 'comp_address', 'startup_idea', 'added_at')


class ViewedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ViewedCompany
        fields = ('id', 'user', 'company', 'date')

    def validate(self, attrs):
        user = attrs.get("user")
        company = attrs.get("company")
        if company.person == user:
            raise serializers.ValidationError({"error": "You can not view your company."})
        return attrs

class FiltersQueryParamSerializer(serializers.Serializer):
    filters = serializers.CharField(required=True)
