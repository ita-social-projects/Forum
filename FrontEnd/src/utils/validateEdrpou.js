// Validates the EDRPOU format. Must be exactly 8 digits.
const EDRPOU_PATTERN = /^\d{8}$/;

function validateEdrpou(edrpou) {
    /* Calculates the checksum key using the first 7 digits of EDRPOU code and weight coefficients.
     * The checksum is calculated as follows:
     * sum the products of corresponding weight coefficients and digits, then apply modulo 11.
     * If the key greater than 10, 'extra' is added to each weight to adjust the key calculation.
    */
    function calculateKey(weights, extra = 0) {
        return weights.reduce((sum, weight, idx) => sum + (weight + extra) * parseInt(edrpou[idx], 10), 0) % 11;
    }
    if (EDRPOU_PATTERN.test(edrpou)) {
        // Determine weight coefficients for calculating the checksum key, based on the value of the EDRPOU.
        const weightCoefficients = (parseInt(edrpou, 10) > 30000000 && parseInt(edrpou, 10) < 60000000)
                            ? [7, 1, 2, 3, 4, 5, 6] // weight coefficients for codes between 30000000 and 60000000.
                            : [1, 2, 3, 4, 5, 6, 7]; // weight coefficients for other values of codes.
        // Calculate checksum key.
        let key = calculateKey(weightCoefficients);
        // Recalculate with adjusted weights if initial key greater than 10.
        if (key > 10) {
            key = calculateKey(weightCoefficients, 2);
        }
        // Validate the EDRPOU by comparing the calculated key with its last digit.
        if (key < 10 && key === parseInt(edrpou[7], 10)) {
            return true;
        } else {
            throw new Error ('Помилковий код ЄДРПОУ');
        }
    } else {
        throw new Error ('ЄДРПОУ має містити 8 цифр');
    }
}


export default validateEdrpou;