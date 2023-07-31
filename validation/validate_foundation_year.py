from django.core.exceptions import ValidationError


def validate_foundation_year(foundation_year_value: int):
    if len(str(foundation_year_value)) != 4:
        raise ValidationError("Foundation year must be exactly 4 digits long.")
