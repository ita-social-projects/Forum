import { useState } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

import EyeInvisible from '../../../Authorization/EyeInvisible';
import EyeVisible from '../../../Authorization/EyeVisible';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';

import { PASSWORD_PATTERN } from '../../../../constants/constants';

import css from './PasswordField.module.css';

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
           className={classNames(css['password-field__label--content'], css['error-dot'], {
            [css['password-field__label--gap']]: label === 'Поточний пароль',
          })}
          htmlFor={inputId}
        >
          {label}
        </label>
        {label === 'Новий пароль' &&
          <label className={css['password-field__label--hint']} htmlFor={inputId}>
              Пароль повинен мати 8+ символів, містити принаймні велику, малу літеру (A..Z, a..z) та цифру (0..9).
          </label>
        }
      </div>
      <div className={css['password-field__password']}>
        <div className={css['password-field__password__wrapper']}>
          <input
            onKeyDown={preventEnterSubmit}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
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
