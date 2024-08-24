const compareValues = (defaultValue, currentValue, type) => {
    if (type === 'array') {
        return JSON.stringify(defaultValue) === JSON.stringify(currentValue);
    } else if (type === 'image') {
        return defaultValue?.uuid === currentValue?.uuid;
    } else if (type === 'phone') {
        return defaultValue === currentValue.replace(/[^\d]/g, '');
    } else {
        return defaultValue === currentValue;
    }
};


const defineChanges = (fields, profile, user) => {
    const userChanges = {};
    const profileChanges = {};

    Object.keys(fields).forEach(field => {
        const { defaultValue, type, context } = fields[field];
        const currentValue = context === 'user' ? user?.[field] : profile?.[field];

        if (context === 'user') {
            if (!compareValues(defaultValue, currentValue, type)) {
                userChanges[field] = currentValue;
            }
        } else {
            if (!compareValues(defaultValue, currentValue, type)) {
                if (type === 'image') {
                    profileChanges[field] = currentValue?.uuid || null;
                } else if (['regions', 'activities', 'categories'].includes(field)) {
                    profileChanges[field] = currentValue.map((obj) => obj.id);
                } else if (field === 'phone') {
                    profileChanges[field] = currentValue.replace(/[^\d]/g, '');
                } else {
                    profileChanges[field] = currentValue;
                }
            }}
    });

    return { userChanges, profileChanges };
};

export default defineChanges;