from django.core.exceptions import ValidationError


def validate_edrpou(edrpou_value: str):
    if len(edrpou_value) != 8 or not edrpou_value.isdecimal():
        raise ValidationError("EDRPOU must be exactly 8 digits long.")
