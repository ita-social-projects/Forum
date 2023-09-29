from rest_framework import serializers
from .models import Profile, Activity, Category, SavedCompany, ViewedCompany


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProfileListSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    region = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'name', 'person', 'is_registered', 'is_startup', 'official_name', 'region',
                  'common_info', 'address', 'categories', 'activities', 'banner_image', 'is_saved')
        read_only_fields = ('person',)

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_region(self, obj):
        return obj.get_region_display()


class ProfileDetailSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    is_saved = serializers.SerializerMethodField()
    region = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'official_name', 'region', 'common_info', 'edrpou', 'founded', 'address',
                  'startup_idea', 'name', 'is_registered', 'is_startup', 'categories', 'activities', 'service_info',
                  'product_info', 'banner_image', 'is_saved')
        read_only_fields = ('id', 'official_name', 'region', 'common_info', 'edrpou', 'founded', 'address',
                            'startup_idea', 'name', 'is_registered', 'is_startup', 'categories', 'activities',
                            'service_info', 'product_info', 'banner_image')

    def get_is_saved(self, obj):
        user = self.context["request"].user
        if user.is_authenticated:
            return obj.pk in self.context["saved_companies_pk"]
        return False

    def get_region(self, obj):
        return obj.get_region_display()


class ProfileOwnerDetailViewSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    email = serializers.ReadOnlyField(source='person.email')
    region = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'name', 'is_registered', 'is_startup', 'categories', 'activities', 'person', 'email',
                  'person_position', 'official_name', 'region', 'common_info', 'phone', 'edrpou', 'founded',
                  'service_info', 'product_info', 'address', 'startup_idea', 'banner_image', 'is_deleted')
        read_only_fields = ('id', 'name', 'is_registered', 'is_startup', 'categories', 'activities', 'person', 'email',
                            'person_position', 'official_name', 'region', 'common_info', 'phone', 'edrpou', 'founded',
                            'service_info', 'product_info', 'address', 'startup_idea', 'banner_image', 'is_deleted')

    def get_region(self, obj):
        return obj.get_region_display()


class ProfileOwnerDetailEditSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='person.email')

    class Meta:
        model = Profile
        fields = ('id', 'name', 'is_registered', 'is_startup', 'categories', 'activities', 'person', 'email',
                  'person_position', 'official_name', 'region', 'common_info', 'phone', 'edrpou', 'founded',
                  'service_info', 'product_info', 'address', 'startup_idea', 'banner_image', 'is_deleted')
        read_only_fields = ('person',)


class ProfileSensitiveDataROSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField(source='person.email')

    class Meta:
        model = Profile
        fields = ('phone', 'email',)
        read_only_fields = ('phone', 'email',)


class SavedCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCompany
        fields = ('id', 'user', 'company', 'added_at')
        read_only_fields = ('user',)


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
        return {'key': obj[0], 'value': obj[1]}
