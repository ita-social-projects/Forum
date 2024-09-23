import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useStopwatch } from 'react-timer-hook';
import { toast } from 'react-toastify';

import validator from 'validator';
import EyeVisible from './EyeVisible';
import EyeInvisible from './EyeInvisible';
import classes from './LoginPage.module.css';
import { useAuth } from '../../hooks/';
import checkIfStaff from '../adminPage/checkIfStaff';

const LoginContent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const { minutes, isRunning, start, reset } = useStopwatch({
    autoStart: false,
  });

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    email: 'Електронна пошта не відповідає вимогам',
    unspecifiedError: 'Електронна пошта чи пароль вказані некоректно',
    rateError: 'Небезпечні дії на сторінці. Сторінка заблокована на 10 хвилин',
    blockedUserError: 'Профіль компанії було заблоковано внаслідок розміщення неприйнятного контенту',
  };

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    let errorMessage = '';

    if (errors.email?.message && errors.password?.message) {
      errorMessage = errors.email.message === errors.password.message
        ? errors.email.message
        : `${errors.email?.message || ''}\n${errors.password?.message || ''}`;
    } else if (errors.email?.message) {
      errorMessage = errors.email.message;
    } else if (errors.password?.message) {
      errorMessage = errors.password.message;
    } else if (errors.unspecifiedError?.message) {
      errorMessage = errors.unspecifiedError.message;
      toast.error(errorMessage);
    } else if (errors.rateError?.message) {
      errorMessage = errors.rateError.message;
      toast.error(errorMessage);
    } else if (errors.blockedUserError?.message) {
      errorMessage = errors.blockedUserError.message;
      toast.error(errorMessage);
    }
  }, [
    errors.email?.message,
    errors.password?.message,
    errors.unspecifiedError?.message,
    errors.rateError?.message,
    errors.blockedUserError?.message,
  ]);

  useEffect(() => {
    clearErrors('unspecifiedError');
    clearErrors('rateError');
    clearErrors('blockedUserError');
  }, [getValues('email'), getValues('password'), clearErrors]);

  const disabled = !isValid || (isRunning && minutes < 10);

  const onSubmit = async (value) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/token/login/`,
        {
          email: value.email,
          password: value.password,
        }
      );
      const authToken = response.data.auth_token;
      login(authToken);
      const isStaff = await checkIfStaff();
      if (isStaff) {
        navigate('/customadmin');
      } else {
        navigate('/profile/general-info');
      }
    }
    catch (error) {
      console.error('ERROR', error);
      if (error.response.status === 400) {
        const resp = error.response.data.non_field_errors[0];
        if (resp == 'Unable to log in with provided credentials.') {
          setError('unspecifiedError', {
            type: 'manual',
            message: errorMessageTemplates.unspecifiedError,
          });
        } else if (resp == 'User account is disabled.') {
          isRunning ? reset() : start();
          setError('rateError', {
            type: 'manual',
            message: errorMessageTemplates.rateError,
          });
        } else if (resp == 'Profile has been blocked.') {
            setError('blockedUserError', {
              type: 'manual',
              message: errorMessageTemplates.blockedUserError,
          });
        }
      }
    }
  };

  useEffect(() => {}, [disabled]);

  return (
    <div className={classes['login-basic']}>
      <div className={classes['login-header']}>
        <p>Вхід на платформу</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={classes['login-content']}>
          <div className={classes['login-content__items']}>
            <div className={classes['login-content__item']}>
              <label
                className={`${
                  errors.email && getValues('email').trim().length === 0
                    ? classes['error-dot']
                    : ''
                }`}
                htmlFor="email"
              >
                Електронна пошта
              </label>
              <div className={classes['login-content__email']}>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="Електронна пошта"
                  {...register('email', {
                    required: errorMessageTemplates.required,
                    validate: (value) =>
                      validator.isEmail(value) || errorMessageTemplates.email,
                  })}
                />
              </div>
              <span className={classes['error-message']}>
                {errors.email && errors.email.message}
                {errors.required && errors.required.message}
              </span>
            </div>
            <div className={classes['login-content__item']}>
              <label
                className={`${
                  errors.password && getValues('password').trim().length === 0
                    ? classes['error-dot']
                    : ''
                }`}
                htmlFor="password"
              >
                Пароль
              </label>
              <div className={classes['login-content__password']}>
                <div className={classes['login-content__password__wrapper']}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Пароль"
                    {...register('password', {
                      required: errorMessageTemplates.required,
                    })}
                  />
                  <span
                    className={classes['password-visibility']}
                    onClick={togglePassword}
                  >
                    {!showPassword ? <EyeInvisible /> : <EyeVisible />}
                  </span>
                </div>
              </div>
              <span className={classes['error-message']}>
                {errors.password && errors.password.message}
                {errors.required && errors.required.message}
                {errors.unspecifiedError && errors.unspecifiedError.message}
              </span>
            </div>
            <Link to="/reset-password" className={classes['forget-password']}>
              Забули пароль?
            </Link>
          </div>
        </div>
        <div className={classes['login-footer']}>
          <div className={classes['login-footer-buttons']}>
            <Link to="/">
              <button
                type="button"
                className={classes['login-footer-buttons__main']}
              >
                Головна
              </button>
            </Link>
            <button
              disabled={disabled}
              type="submit"
              className={
                disabled
                  ? classes['login-footer-buttons__signin__disabled']
                  : classes['login-footer-buttons__signin']
              }
            >
              Увійти
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginContent;
