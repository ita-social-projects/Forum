from django.core.exceptions import ValidationError


def validate_password_long(password_value: str):
    if len(password_value) < 8:
        raise ValidationError("Password must be at least 8 characters long.")


def validate_password_include_symbols(password_value: str):
    if not any(char.isupper() for char in password_value):
        raise ValidationError("Password must include at least one uppercase letter (A-Z).")
    if not any(char.islower() for char in password_value):
        raise ValidationError("Password must include at least one lowercase letter (a-z).")
    if not any(char.isdigit() for char in password_value):
        raise ValidationError("Password must include at least one digit (0-9).")