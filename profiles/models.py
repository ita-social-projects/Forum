from django.db import models
from validation.validate_phone_number import validate_phone_number_len, validate_phone_number_is_digit
from validation.validate_edrpou import validate_edrpou
from validation.validate_foundation_year import validate_foundation_year_range
from validation.validate_image import validate_image_size, validate_image_format

from authentication.models import CustomUser

REGIONS = (('E', "east"), ('W', "west"), ('N', "north"), ('S', "south"))


class Profile(models.Model):

    profile_id = models.AutoField(primary_key=True)
    comp_category = models.ManyToManyField("Category")
    comp_activity = models.ManyToManyField("Activity")
    comp_official_name = models.CharField(max_length=255, unique=True, default=None, null=True)
    comp_region = models.CharField(max_length=128, choices=REGIONS, default=None, null=True)
    comp_common_info = models.CharField(max_length=255, default=None, null=True)
    comp_phone_number = models.CharField(
        max_length=12,
        validators=[validate_phone_number_is_digit, validate_phone_number_len],
        default=None, null=True
    )
    comp_EDRPOU = models.IntegerField(unique=True, validators=[validate_edrpou], default=None, null=True)
    comp_year_of_foundation = models.SmallIntegerField(validators=[validate_foundation_year_range], default=None, null=True)
    comp_service_info = models.TextField(default=None, null=True)
    comp_product_info = models.TextField(default=None, null=True)
    comp_address = models.TextField(default=None, null=True)
    comp_banner_image = models.ImageField(validators=[validate_image_format, validate_image_size], null=True)

    person = models.OneToOneField(CustomUser, on_delete=models.PROTECT)
    person_position = models.CharField(max_length=50, default=None, null=True)
 
    startup_idea = models.TextField(default=None, null=True)


class Activity(models.Model):
    activity_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)


class Category(models.Model):
    category_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)


class CompanySavedList(models.Model):
    company = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='saved_list')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_list_items')
    added_at = models.DateTimeField(auto_now_add=True)
