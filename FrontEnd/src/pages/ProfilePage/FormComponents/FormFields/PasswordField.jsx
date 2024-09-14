import { useState } from 'react';
import { PropTypes } from 'prop-types';
import EyeInvisible from '../../../../components/Authorization/EyeInvisible';
import EyeVisible from '../../../../components/Authorization/EyeVisible';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './PasswordField.module.css';
import { PASSWORD_PATTERN } from '../../../../constants/constants';

const PasswordField = (props) => {
  const errorMessages = {
    invalidPassword: 'Пароль не відповідає вимогам',
    passwordsDontMatch: 'Паролі не співпадають',
    requiredField: 'Обов’язкове поле',
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    name,
    error,
    watch,
    label,
    inputId,
    checkValid,
    checkMatch,
  } = props;

  return (
    <div className={css['password-field__item']}>
      <div className={css['password-field__label-wrapper']}>
        <label
          className={error[name] ? css['error-dot'] : ''}
          htmlFor={inputId}
        >
          {label}
        </label>
      </div>
      <div className={css['password-field__password']}>
        <div className={css['password-field__password__wrapper']}>
          <input
            onKeyDown={preventEnterSubmit}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            placeholder={label}
            required
            {...register(name, {
              required: errorMessages.requiredField,
              pattern: checkValid && {
                value: PASSWORD_PATTERN,
                message: errorMessages.invalidPassword,
              },
              validate: checkMatch.isCheck
                ? (value) => {
                    return (
                      value === watch(checkMatch.checkWith) ||
                      value === '' ||
                      errorMessages.passwordsDontMatch
                    );
                  }
                : null,
            })}
          />
        </div>
        <span
          aria-label="Toggle password visibility"
          className={css['password-visibility']}
          onClick={togglePassword}
        >
          {!showPassword ? <EyeInvisible /> : <EyeVisible />}
        </span>
      </div>
      {error[name] ? (
        <div className={css['error-message']}>{error[name].message}</div>
      ) : null}
    </div>
  );
};

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  inputId: PropTypes.string.isRequired,
  error: PropTypes.object,
  checkValid: PropTypes.bool.isRequired,
  checkMatch: PropTypes.shape({
    isCheck: PropTypes.bool.isRequired,
    checkWith: PropTypes.string,
  }),
};

export default PasswordField;
