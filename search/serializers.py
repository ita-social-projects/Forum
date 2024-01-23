from rest_framework import serializers

from profiles.models import Profile, Category, SavedCompany
from profiles.serializers import CategorySerializer


class CompanySerializers(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    # is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "categories",
            "region",
            "founded",
            "service_info",
            "address",
            "banner_image",
            "logo_image",
            # "is_saved",
        )

    # def get_is_saved(self, obj):
    #     # user = self.context["request"].user
    #     # saved_comp = SavedCompany.objects.filter(user_id=self.context["request"].user.id)
    #     # print(saved_comp, '*'*10)
    #     # saved_comp_id_list = [comp.company_id for comp in saved_comp]
    #     # print(saved_comp_id_list, '@'*10)
    #     # if user.is_authenticated:
    #     #     return obj.pk in saved_comp_id_list
    #     # return False
    #     user = self.context["request"].user
    #     if user.is_authenticated:
    #         return obj.pk in self.context["saved_companies_pk"]
    #     return False
