const EDRPOU_PATTERN = /^\d{8}$/;

function validateEdrpou(edrpou) {
    function calculateKey(weights, extra = 0) {
        return weights.reduce((sum, weight, idx) => sum + (weight + extra) * parseInt(edrpou[idx], 10), 0) % 11;
    }
    if (EDRPOU_PATTERN.test(edrpou)) {
        const weightsBase = (parseInt(edrpou, 10) > 30000000 && parseInt(edrpou, 10) < 60000000)
                            ? [7, 1, 2, 3, 4, 5, 6]
                            : [1, 2, 3, 4, 5, 6, 7];
        let key = calculateKey(weightsBase);
        if (key >= 10) {
            key = calculateKey(weightsBase, 2);
        }
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