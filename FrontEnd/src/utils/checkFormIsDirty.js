const isValueDirty = (defaultValue, currentValue) => {
    if (defaultValue === null && currentValue === '') {
      return false;
    }
    return defaultValue !== currentValue;
  };

const compareArrays = (array1, array2) => {
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
      if (key === 'founded') {
        if (((defaultValue === null && currentValue !== '')) || (defaultValue.toString() !== currentValue.toString())) {
          return true;
        }
        return false;
      }
      return isValueDirty(defaultValue, currentValue);
    });
  };

export default checkFormIsDirty;