from django.db import models
from django.core.validators import MaxLengthValidator

from authentication.models import CustomUser
from validation.validate_edrpou import validate_edrpou
from validation.validate_foundation_year import validate_foundation_year_range
from validation.validate_image import (
    validate_image_size,
    validate_logo_size,
    validate_image_format,
)
from validation.validate_phone_number import (
    validate_phone_number_len,
    validate_phone_number_is_digit,
)


class Region(models.TextChoices):
    EMPTY_VALUE = "", ""
    KYIV = "Kyiv", "Київ"
    VINNYTSIA_REGION = "Vinnytsia region", "Вінницька область"
    VOLYN_REGION = "Volyn region", "Волинська область"
    DNIPRO_REGION = "Dnipro region", "Дніпропетровська область"
    DONETSK_REGION = "Donetsk region", "Донецька область"
    ZHYTOMYR_REGION = "Zhytomyr region", "Житомирська область"
    ZAKARPATTIA_REGION = "Zakarpattia region", "Закарпатська область"
    ZAPORIZHZHIA_REGION = "Zaporizhzhia region", "Запорізька область"
    IVANOFRANKIVSK_REGION = (
        "IvanoFrankivsk region",
        "Івано-Франківська область",
    )
    KYIV_REGION = "Kyiv region", "Київська область"
    KIROVOHRAD_REGION = "Kirovohrad region", "Кіровоградська область"
    CRIMEA = "Crimea", "Автономна Республіка Крим"
    LUHANSK_REGION = "Luhansk region", "Луганська область"
    LVIV_REGION = "Lviv region", "Львівська область"
    MYKOLAIV_REGION = "Mykolaiv region", "Миколаївська область"
    ODESA_REGION = "Odesa region", "Одеська область"
    POLTAVA_REGION = "Poltava region", "Полтавська область"
    RIVNE_REGION = "Rivne region", "Рівненська область"
    SEVASTOPOL = "Sevastopol", "Севастополь"
    SUMY_REGION = "Sumy region", "Сумська область"
    TERNOPIL_REGION = "Ternopil region", "Тернопільська область"
    KHARKIV_REGION = "Kharkiv region", "Харківська область"
    KHERSON_REGION = "Kherson region", "Херсонська область"
    KHMELNYTSKYI_REGION = "Khmelnytskyi region", "Хмельницька область"
    CHERKASY_REGION = "Cherkasy region", "Черкаська область"
    CHERNIVTSI_REGION = "Chernivtsi region", "Чернівецька область"
    CHERNIHIV_REGION = "Chernihiv region", "Чернігівська область"


class Profile(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=100, default=None, null=True)
    is_registered = models.BooleanField(default=None, null=True)
    is_startup = models.BooleanField(default=None, null=True)

    categories = models.ManyToManyField("Category")
    activities = models.ManyToManyField("Activity")

    person = models.OneToOneField(CustomUser, on_delete=models.PROTECT)
    person_position = models.CharField(max_length=50, blank=True, default="")

    official_name = models.CharField(
        max_length=255, unique=True, null=True, blank=True, default=None
    )
    region = models.CharField(
        max_length=128,
        choices=Region.choices,
        blank=True,
        default=Region.EMPTY_VALUE,
    )
    common_info = models.TextField(
        validators=[MaxLengthValidator(2000)], blank=True, default=""
    )
    phone = models.CharField(
        max_length=12,
        validators=[validate_phone_number_is_digit, validate_phone_number_len],
        blank=True,
        default="",
    )
    edrpou = models.CharField(
        max_length=8,
        unique=True,
        validators=[validate_edrpou],
        default=None,
        blank=True,
        null=True,
    )
    founded = models.SmallIntegerField(
        validators=[validate_foundation_year_range], default=None, null=True
    )
    service_info = models.TextField(blank=True, default="")
    product_info = models.TextField(blank=True, default="")
    address = models.TextField(blank=True, default="")
    startup_idea = models.TextField(blank=True, default="")

    banner_image = models.ImageField(
        upload_to="banners",
        validators=[validate_image_format, validate_image_size],
        null=True,
        blank=True,
    )

    logo_image = models.ImageField(
        upload_to="logos",
        validators=[validate_image_format, validate_logo_size],
        null=True,
        blank=True,
    )

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    completeness = models.SmallIntegerField(default=0)


class Activity(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class SavedCompany(models.Model):
    company = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="saved_list"
    )
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="saved_list_items"
    )
    added_at = models.DateTimeField(auto_now_add=True)


class ViewedCompany(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, blank=True, null=True
    )
    company = models.ForeignKey(Profile, on_delete=models.CASCADE)

    @property
    def user_profile_name(self):
        return self.user.profile.name

    @property
    def company_name(self):
        return self.company.name
