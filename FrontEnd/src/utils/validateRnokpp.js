// Validates the RNOKPP format. Must be exactly 10 digits.
const RNOKPP_PATTRN = /^\d{10}$/;

function validateRnokpp(rnokpp) {
    /* Calculates the checksum key using using the first 9 digits RNOKPP code and weight coefficients.
    * The checksum is calculated as follows:
    * sum the products of corresponding weight coefficients and digits, then apply modulo 11, and finally modulo 10.
    */
    if (RNOKPP_PATTRN.test(rnokpp)) {
        const valueForValidation = Array.from(rnokpp).map(Number);
        const weightCoefficients = [-1, 5, 7, 9, 4, 6, 10, 5, 7]; // Weight coefficients for corresponding RNOKPP digits.
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += weightCoefficients[i] * valueForValidation[i];
        }
        // Calculate checksum key.
        const key = (sum % 11) % 10;
        // Validate the RNOKPP by comparing the calculated key with its last digit.
        if (key === valueForValidation[9]) {
            return true;
        } else {
            throw new Error ('Помилковий РНОКПП');
        }
    } else {
        throw new Error ('РНОКПП має містити 10 цифр');
    }
}


export default validateRnokpp;