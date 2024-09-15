import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { PASSWORD_PATTERN } from '../../../../../constants/constants';
import EyeInvisible from '../../../../../components/Authorization/EyeInvisible';
import EyeVisible from '../../../../../components/Authorization/EyeVisible';
import styles from './RestorePasswordFormContent.module.css';

export function RestorePasswordFormContentComponent({ setIsValid }) {
  const navigate = useNavigate();
  const { uid, token } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    password: 'Пароль не відповідає вимогам',
    confirmPassword: 'Паролі не співпадають',
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  useEffect(() => {
    const formIsValid = isValid;
    setIsValid(formIsValid);
  }, [isValid, setIsValid]);

  const onSubmit = (formData) => {
    const dataToSend = {
      uid: uid,
      token: token,
      new_password: formData.new_password,
      re_new_password: formData.confirmPassword,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/reset_password_confirm/`,
        dataToSend
      )
      .then(() => {
        setIsValid(true);
        navigate('/reset-password/successfully');
      })
      .catch(() => {
        navigate('/reset-password/failed');
      });
  };

  return (
    <div>
      <div className={styles['reset-password-form']}>
        <form
          id="resetPasswordForm"
          className={styles['reset-password-form__container']}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <div className={styles['reset-password-form__row']}>
            <div className={styles['reset-password-form__column']}>
              <div className={styles['reset-password-form__label']}>
                <label
                  className={styles['reset-password-form__label--required']}
                >
                  *
                </label>
                <div className={styles['reset-password-form__label--password']}>
                  <label>Новий пароль</label>
                  <label className={styles['reset-password-form__label--hint']}>
                    (Повинен містити A-Z, a-z, 0-9)
                  </label>
                </div>
              </div>
              <div className={styles['reset-password-form__field__password']}>
                <input
                  className={styles['reset-password-form__input__password']}
                  placeholder="Новий пароль"
                  type={showPassword ? 'text' : 'password'}
                  {...register('new_password', {
                    required: errorMessageTemplates.required,
                    pattern: {
                      value: PASSWORD_PATTERN,
                      message: errorMessageTemplates.password,
                    },
                  })}
                />
                <span
                  className={styles['password-visibility']}
                  onClick={togglePassword}
                >
                  {!showPassword ? <EyeInvisible /> : <EyeVisible />}
                </span>
              </div>
              <div className={styles['reset-password-form__error']}>
                {errors.new_password && errors.new_password.message}
              </div>
            </div>
          </div>
          <div className={styles['reset-password-form__row']}>
            <div className={styles['reset-password-form__column']}>
              <div className={styles['reset-password-form__label']}>
                <label
                  className={styles['reset-password-form__label--required']}
                >
                  *
                </label>
                <div className={styles['reset-password-form__label--password']}>
                  <label className={styles['reset-password-form__label--text']}>
                    Повторіть новий пароль
                  </label>
                </div>
              </div>
              <div className={styles['reset-password-form__field__password']}>
                <input
                  className={styles['reset-password-form__input__password']}
                  placeholder="Повторіть пароль"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: errorMessageTemplates.required,
                    validate: (value) =>
                      value === getValues('new_password') ||
                      errorMessageTemplates.confirmPassword,
                  })}
                />
                <span
                  className={styles['password-visibility']}
                  onClick={toggleConfirmPassword}
                >
                  {!showConfirmPassword ? <EyeInvisible /> : <EyeVisible />}
                </span>
              </div>
              <div className={styles['reset-password-form__error']}>
                {errors.confirmPassword && errors.confirmPassword.message}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

RestorePasswordFormContentComponent.propTypes = {
  setIsValid: PropTypes.func.isRequired,
};
