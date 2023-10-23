from django.core.exceptions import ValidationError


def validate_edrpou(edrpou_value: int):
    if len(str(edrpou_value)) != 8:
        raise ValidationError("EDRPOU must be exactly 8 digits long.")
