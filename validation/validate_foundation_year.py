import datetime
from django.core.exceptions import ValidationError


def validate_foundation_year(foundation_year_value: int):
    current_year = datetime.datetime.now().year
    if len(str(foundation_year_value)) != 4 or foundation_year_value > current_year:
        raise ValidationError("Foundation year must be exactly 4 digits long.")
