from django.core.exceptions import ValidationError


def validate_rnokpp(rnokpp: str):
    if len(rnokpp) != 10 or not rnokpp.isdecimal():
        raise ValidationError("RNOKPP must be exactly 10 digits long.")
    value_for_validation = [int(i) for i in rnokpp]
    # Weight coefficients for calculating the checksum key
    weight_coeff_base = [-1, 5, 7, 9, 4, 6, 10, 5, 7]
    # Calculate the checksum key using the first 9 digits of RNOKPP code and weight coefficients.
    key = (
        sum(weight_coeff_base[i] * value_for_validation[i] for i in range(9))
        % 11
    ) % 10
    # Validate the RNOKPP by comparing the calculated checksum key with its last digit.
    if key == value_for_validation[-1]:
        return True
    else:
        raise ValidationError(
            "RNOKPP is not correct, checksum key is not valid."
        )
