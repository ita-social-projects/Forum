const RNOKPP_PATTRN = /^\d{10}$/;

function validateRnokpp(rnokpp) {
    if (RNOKPP_PATTRN.test(rnokpp)) {
        const valueForValidation = Array.from(rnokpp).map(Number);
        const weightCoeffBase = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += weightCoeffBase[i] * valueForValidation[i];
        }
        const key = (sum % 11) % 10;
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