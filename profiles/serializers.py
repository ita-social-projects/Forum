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
            return obj.pk in self.context["saved_companies_pk"]
        return False


class ProfileDetailSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(many=True, read_only=True)
    category = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ('official_name', 'region', 'common_info', 'edrpou', 'founded', 'address', 'startup_idea', 'name',
                  'is_registered', 'is_startup', 'category', 'activity', 'service_info', 'product_info',
                  'banner_image')
        read_only_fields = ('official_name', 'region', 'common_info', 'edrpou', 'founded', 'address', 'startup_idea',
                            'name', 'is_registered', 'is_startup', 'category', 'activity', 'service_info',
                            'product_info', 'banner_image')


class ProfileSensitiveDataROSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='person.email')

    class Meta:
        model = Profile
        fields = ('phone', 'email',)
        read_only_fields = ('phone', 'email',)


class SavedCompanySerializer(serializers.ModelSerializer):
    official_name = serializers.ReadOnlyField(source='company.official_name')
    region = serializers.ReadOnlyField(source='company.region')
    common_info = serializers.ReadOnlyField(source='company.common_info')
    phone = serializers.ReadOnlyField(source='company.phone')
    edrpou = serializers.ReadOnlyField(source='company.edrpou')
    founded = serializers.ReadOnlyField(source='company.founded')
    address = serializers.ReadOnlyField(source='company.address')
    startup_idea = serializers.ReadOnlyField(source='company.startup_idea')

    class Meta:
        model = SavedCompany
        fields = ('id', 'user', 'company', 'official_name', 'region', 'common_info', 'phone', 'edrpou', 'founded',
                  'address', 'startup_idea', 'added_at')


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


class RegionSerializer(serializers.Serializer):

    def to_representation(self, obj):
        return {obj[0]: obj[1]}
