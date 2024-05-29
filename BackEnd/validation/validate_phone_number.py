from django.core.exceptions import ValidationError


def validate_phone_number_len(phone_number_value: str):
    if len(phone_number_value) != 12:
        raise ValidationError(
            "Phone number must be exactly 12 characters long."
        )


def validate_phone_number_is_digit(phone_number_value: str):
    if not phone_number_value.isdigit():
        raise ValidationError("Phone number must contain only numbers.")
