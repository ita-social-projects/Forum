function validateRnokppKey(rnokpp) {
    if (rnokpp.length === 10 && !isNaN(rnokpp)) {
        const valueForValidation = Array.from(rnokpp).map(Number);
        const weightCoeffBase = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += weightCoeffBase[i] * valueForValidation[i];
        }
        const key = (sum % 11) % 10;
        return key === valueForValidation[9];
    }
    return false;
}


export default validateRnokppKey;