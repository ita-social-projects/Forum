const formatPhoneForComparison = (phone) => {
  if (!phone) return '';
  return phone.replace(/\D+/g, '');
};

const isValueDirty = (defaultValue, currentValue) => {
  if (typeof defaultValue === 'string' && typeof currentValue === 'string') {
    if (defaultValue.startsWith('380') && currentValue.startsWith('+380')) {
      defaultValue = formatPhoneForComparison(defaultValue);
      currentValue = formatPhoneForComparison(currentValue);
    }
  }

  if (defaultValue === null && currentValue === '') {
    return false;
  }
  return defaultValue !== currentValue;
};

const compareArrays = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }
  return (
    array1.length === array2.length &&
    array1.every(element1 =>
      array2.some(element2 =>
        Object.keys(element1).every(key => element1[key] === element2[key])
      )
    )
  );
};

const checkFormIsDirty = (fields, userData, profileData) => {
  return Object.keys(fields).some(key => {
    const { defaultValue, type, context } = fields[key];
    const currentValue = context === 'user' ? userData?.[key] : profileData?.[key];

    if (type === 'array') {
      return !compareArrays(defaultValue, currentValue);
    }

    if (type === 'image') {
      return defaultValue?.uuid !== currentValue?.uuid;
    }

    if (key === 'founded') {
      if ((defaultValue !== null && currentValue !== null && defaultValue?.toString() !== currentValue?.toString()) ||
          (defaultValue === null && (currentValue !== null && currentValue !== ''))) {
        return true;
      }
      return false;
    }

    return isValueDirty(defaultValue, currentValue);
  });
};

export default checkFormIsDirty;
