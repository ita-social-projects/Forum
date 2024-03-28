from django.core.exceptions import ValidationError


def validate_ipn(ipn_value: str):
    if len(ipn_value) != 10 or not ipn_value.isdecimal():
        raise ValidationError("IPN must be exactly 10 digits long.")
