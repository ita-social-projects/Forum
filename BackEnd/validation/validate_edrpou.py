from django.core.exceptions import ValidationError


def validate_edrpou(edrpou: str):
    if len(edrpou) != 8 or not edrpou.isdecimal():
        raise ValidationError("EDRPOU must be exactly 8 digits long.")
    value_for_validation = [int(i) for i in edrpou]
    # Determine weight coefficients for calculating the checksum key, based on the value of the EDRPOU.
    weight_coeff_base = (
        [7, 1, 2, 3, 4, 5, 6]
        if 30000000 < int(edrpou) < 60000000
        else [1, 2, 3, 4, 5, 6, 7]
    )

    # Calculate the checksum key using the first 7 digits of EDRPOU code and weight coefficients.
    # If the key greater than 10, 'extra' is added to each weight to adjust the key calculation.
    def calculate_key(extra=0):
        return (
            sum(
                (weight_coeff_base[i] + extra) * value_for_validation[i]
                for i in range(7)
            )
            % 11
        )

    key = calculate_key()
    if key > 10:
        key = calculate_key(2)
    if key < 10 and key == value_for_validation[-1]:
        return True
    else:
        raise ValidationError(
            "EDRPOU is not correct, checksum key is not valid."
        )
