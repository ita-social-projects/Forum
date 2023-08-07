from venv import create
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from validation.validate_password import validate_password_long, validate_password_include_symbols
from validation.validate_phone_number import validate_phone_number_len, validate_phone_number_is_digit
from validation.validate_edrpou import validate_edrpou
from validation.validate_foundation_year import validate_foundation_year_range
from validation.validate_image import validate_image_size, validate_image_format

REGIONS = (('E', "east"), ('W', "west"), ('N', "north"), ('S', "south"))

    
class ProfileManager(BaseUserManager):

    def create_user(self, person_email, password=None, **extra_fields):
        comp_category = extra_fields.pop("comp_category", None)
        person_email = self.normalize_email(person_email)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        user = self.model(
            person_email=person_email, **extra_fields)
        user.set_password(password)
        user.save()
        if comp_category is not None:
            user.comp_category.set(comp_category)
        return user

    def create_superuser(self, person_email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(person_email, password, **extra_fields)

class Profile(AbstractBaseUser, PermissionsMixin):

    profile_id = models.AutoField(primary_key=True)
    comp_category = models.ManyToManyField("Category")
    comp_activity = models.ManyToManyField("Activity")
    comp_name = models.CharField(max_length=50)
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
    comp_registered = models.BooleanField(default=None, null=True)
    comp_is_startup = models.BooleanField(default=None, null=True)
    comp_banner_image = models.ImageField(validators=[validate_image_format, validate_image_size], null=True)

    person_name = models.CharField(max_length=50)
    person_surname = models.CharField(max_length=50)
    person_position = models.CharField(max_length=50, default=None, null=True)
    person_email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(
        max_length=128,
        validators=[validate_password_long, validate_password_include_symbols]
    )

    startup_idea = models.TextField(default=None, null=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "person_email"
    EMAIL_FIELD = "person_email"
    REQUIRED_FIELDS = [
        "password",
        "person_surname",
        "person_name",
        "comp_name",
        # "comp_category",
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
