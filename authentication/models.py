from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from validation.validate_password import validate_password_long, validate_password_include_symbols


class CustomUserManager(BaseUserManager):

    def create_user(self, person_email, password=None, **extra_fields):
        person_email = self.normalize_email(person_email)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('is_active', False)
        user = self.model(
            person_email=person_email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, person_email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        return self.create_user(person_email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
        person_email = models.EmailField(max_length=50, unique=True)
        person_name = models.CharField(max_length=50)
        person_surname = models.CharField(max_length=50)
        password = models.CharField(
            max_length=128,
            validators=[validate_password_long, validate_password_include_symbols]
        )
        
        comp_name = models.CharField(max_length=50)
        comp_registered = models.BooleanField(default=None, null=True)
        comp_is_startup = models.BooleanField(default=None, null=True)

        USERNAME_FIELD = "person_email"
        EMAIL_FIELD = "person_email"
        REQUIRED_FIELDS = [
                "password",
                "person_surname",
                "person_name",
                "comp_name",
                "comp_registered",
                "comp_is_startup",
            ]

        objects = CustomUserManager()
        