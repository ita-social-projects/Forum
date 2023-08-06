from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from validation.validate_password import validate_password_long, validate_password_include_symbols
from validation.validate_phone_number import validate_phone_number_len, validate_phone_number_is_digit
from validation.validate_edrpou import validate_edrpou
from validation.validate_foundation_year import validate_foundation_year_range
from validation.validate_image import validate_image_size, validate_image_format

REGIONS = (('E', "east"), ('W', "west"), ('N', "north"), ('S', "south"))


class ProfileManager(BaseUserManager):

    def create_user(self, person_email, person_password, person_surname, person_name, comp_name, comp_category, comp_registered=None, comp_is_startup=None):
        person_email = self.normalize_email(person_email)
        user = self.model(
            person_email=person_email,
            person_surname=person_surname,
            person_name=person_name,
            comp_name=comp_name,
            comp_category=comp_category,
            comp_registered=comp_registered,
            comp_is_startup=comp_is_startup
        )
        user.set_password(person_password)
        user.save()
        return user


class Profile(AbstractBaseUser):

    profile_id = models.IntegerField(primary_key=True)
    comp_category = models.ManyToManyField("Category")
    comp_activity = models.ManyToManyField("Activity")
    comp_name = models.CharField(max_length=50)
    comp_official_name = models.CharField(max_length=255, unique=True)
    comp_region = models.CharField(max_length=128, choices=REGIONS)
    comp_common_info = models.CharField(max_length=255)
    comp_phone_number = models.CharField(
        max_length=12,
        validators=[validate_phone_number_is_digit, validate_phone_number_len]
    )
    comp_EDRPOU = models.IntegerField(unique=True, validators=[validate_edrpou])
    comp_year_of_foundation = models.SmallIntegerField(validators=[validate_foundation_year_range])
    comp_service_info = models.TextField()
    comp_product_info = models.TextField()
    comp_address = models.TextField()
    comp_registered = models.BinaryField(max_length=1)
    comp_is_startup = models.BinaryField(max_length=1)
    comp_banner_image = models.ImageField(validators=[validate_image_format, validate_image_size])

    person_name = models.CharField(max_length=50)
    person_surname = models.CharField(max_length=50)
    person_position = models.CharField(max_length=50)
    person_email = models.EmailField(max_length=50, unique=True)
    person_password = models.CharField(
        max_length=128,
        validators=[validate_password_long, validate_password_include_symbols]
    )

    startup_idea = models.TextField()

    USERNAME_FIELD = "person_email"
    EMAIL_FIELD = "person_email"
    REQUIRED_FIELDS = [
        "person_password",
        "person_surname",
        "person_name",
        "comp_name",
        "comp_category",
        "comp_registered",
        "comp_is_startup",
    ]
    objects = ProfileManager()


class Activity(models.Model):
    activity_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)


class Category(models.Model):
    category_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
