from django.db import models
from .serializers import ProfileSerializer

REGIONS = ["east", "west", "north", "south"]


class Profile(models.Model):

    profile_id = models.IntegerField(primary_key=True)
    comp_category = models.ManyToManyField("Category")
    comp_activity = models.ManyToManyField("Activity")
    comp_name = models.CharField(max_length=50)
    comp_official_name = models.CharField(max_length=255, unique=True)
    comp_region = models.CharField(choices=REGIONS)
    comp_common_info = models.CharField(max_length=255)
    comp_phone_number = models.CharField(
        max_length=12,
        validators=[
            ProfileSerializer.validate_phone_number,
            # RegexValidator(r"^\d+$", message="Phone number must contain only numbers."),
        ]
    )
    comp_EDRPOU = models.IntegerField(unique=True, validators=[ProfileSerializer.validate_edrpou])
    comp_year_of_foundation = models.SmallIntegerField(
        max_length=4,
        validators=[ProfileSerializer.validate_foundation_year]
    )
    comp_service_info = models.TextField()
    comp_product_info = models.TextField()
    comp_address = models.TextField()
    comp_registered = models.BinaryField(max_length=1)
    comp_is_startup = models.BinaryField(max_length=1)
    comp_banner_image = models.ImageField(validators=[ProfileSerializer.validate_image])

    person_name = models.CharField(max_length=50)
    person_surname = models.CharField(max_length=50)
    person_position = models.CharField(max_length=50)
    person_email = models.EmailField(
        max_length=50,
        unique=True,
        validators=[ProfileSerializer.validate_email]
    )
    person_password = models.CharField(max_length=128, validators=[ProfileSerializer.validate_password])

    startup_idea = models.TextField()


class Activity(models.Model):
    activity_id = models.IntegerField(primary_key=True)
    name = models.CharField()


class Category(models.Model):
    category_id = models.IntegerField(primary_key=True)
    name = models.CharField()
