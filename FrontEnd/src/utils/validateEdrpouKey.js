function validateEdrpouKey(edrpou) {
    function calculateKey(weights, extra = 0) {
        return weights.reduce((sum, weight, idx) => sum + (weight + extra) * parseInt(edrpou[idx], 10), 0) % 11;
    }
    if (edrpou.length === 8 && !isNaN(edrpou)) {
        const weightsBase = (parseInt(edrpou, 10) > 30000000 && parseInt(edrpou, 10) < 60000000)
                            ? [7, 1, 2, 3, 4, 5, 6]
                            : [1, 2, 3, 4, 5, 6, 7];
        let key = calculateKey(weightsBase);
        if (key >= 10) {
            key = calculateKey(weightsBase, 2);
        }
        return key < 10 && key === parseInt(edrpou[7], 10);
    }
    return false;
}


export default validateEdrpouKey;