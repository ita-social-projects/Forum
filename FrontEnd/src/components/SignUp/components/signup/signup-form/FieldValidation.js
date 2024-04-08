export const validateCompanyName = (companyName) => {
    if (!companyName || companyName.length < 2 || companyName.length > 100) {
      return 'Назва повинна містити від 2 до 100 символів';
    }
    return null;
  };

  export const validateName = (name) => {
    if (!name || name.length < 2 || name.length > 50) {
      return 'Ім‘я повинне містити від 2 до 50 символів';
    }
    return null;
  };

  export const validateSurname = (surname) => {
    if (!surname || surname.length < 2 || surname.length > 50) {
      return 'Прізвище повинне містити від 2 до 50 символів';
    }
    return null;
  };
