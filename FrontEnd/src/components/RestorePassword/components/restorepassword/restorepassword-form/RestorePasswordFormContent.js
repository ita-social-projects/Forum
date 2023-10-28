import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import EyeInvisible from '../../../../authorization/EyeInvisible';
import EyeVisible from '../../../../authorization/EyeVisible';
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
    confirmPassword: 'Паролі не збігаються',
  };

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$/;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm();

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
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>

    <div className={styles['signup-form']}>
      <form
        id="resetPasswordForm"
        className={styles['signup-form__container']}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className={styles['signup-form__column']}>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>*</label>
              <div className={styles['signup-form__label--password']}>
                <label>Новий пароль</label>
                <label className={styles['signup-form__label--hint']}>
                  (Повинен містити A-Z, a-z, 0-9)
                </label>
              </div>
            </div>
            <div className={styles['signup-form__field__password']}>
              <input
                className={styles['signup-form__input__password']}
                placeholder="Новий пароль"
                type={showPassword ? 'text' : 'password'}
                {...register('new_password', {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: passwordPattern,
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
            <div className={styles['signup-form__error']}>
              {errors.new_password && errors.new_password.message}
            </div>
          </div>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>*</label>
              <div className={styles['signup-form__label--password']}>
                <label className={styles['signup-form__label--text']}>
                  Повторіть пароль
                </label>
              </div>
            </div>
            <div className={styles['signup-form__field__password']}>
              <input
                className={styles['signup-form__input__password']}
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
            <div className={styles['signup-form__error']}>
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}
