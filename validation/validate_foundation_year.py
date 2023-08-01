import datetime
from django.core.exceptions import ValidationError


def validate_foundation_year_long(foundation_year_value: int) -> None:
    if len(str(foundation_year_value)) != 4:
        raise ValidationError("Foundation year must be exactly 4 digits long.")


def validate_foundation_year_is_valid(foundation_year_value: int) -> None:
    if foundation_year_value > datetime.datetime.now().year:
        raise ValidationError("Foundation year cannot be more than current year.")
