from rest_framework import serializers
from ..models import (
    Activity,
    Category,
    Region,
)


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class RegionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name_eng = serializers.CharField()
    name_ukr = serializers.CharField()

    def update(self, instance, validated_data):
        instance.name_eng = validated_data.get("name_eng", instance.name_eng)
        instance.name_ukr = validated_data.get("name_ukr", instance.name_ukr)
        instance.save()
        return instance

    def create(self, validated_data):
        name_eng = validated_data.get("name_eng")
        name_ukr = validated_data.get("name_ukr")
        if (
            name_eng
            and Region.objects.filter(name_eng__iexact=name_eng).exists()
        ):
            raise serializers.ValidationError(
                "Region with this name already exists."
            )
        if (
            name_ukr
            and Region.objects.filter(name_ukr__iexact=name_ukr).exists()
        ):
            raise serializers.ValidationError(
                "Region with this name already exists."
            )
        return Region.objects.create(**validated_data)
