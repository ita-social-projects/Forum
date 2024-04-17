from django.core.exceptions import ValidationError


def validate_rnokpp(rnokpp_value: str):
    if len(rnokpp_value) != 10 or not rnokpp_value.isdecimal():
        raise ValidationError("RNOKPP must be exactly 10 digits long.")
