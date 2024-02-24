import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import EyeVisible from './EyeVisible';
import EyeInvisible from './EyeInvisible';
import classes from './LoginPage.module.css';
import checkIfStaff from '../adminPage/checkIfStaff';
import { useAuth } from '../../hooks/';


const LoginContent = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    email: 'Формат електронної пошти некоректний',
    unspecifiedError: 'Електронна пошта чи пароль вказані некоректно',
  };

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all'
  });

  const { setErrorMessage } = props;

  useEffect(() => {
    let errorMessage = '';

    if (errors.email?.message && errors.password?.message) {
      if (errors.email.message === errors.password.message) {
        errorMessage = errors.email.message;
      } else {
        errorMessage = `${errors.email?.message || ''}\n${errors.password?.message || ''}`;
      }
    } else if (errors.email?.message) {
      errorMessage = errors.email.message;
    } else if (errors.password?.message) {
      errorMessage = errors.password.message;
    } else if (errors.unspecifiedError?.message) {
      errorMessage = errors.unspecifiedError.message;
    }

    setErrorMessage(errorMessage);
  }, [errors.email?.message, errors.password?.message, errors.unspecifiedError?.message, setErrorMessage]);

  useEffect(() => {
    clearErrors('unspecifiedError');
  }, [getValues('email'), getValues('password'), clearErrors]);

  const onSubmit = async (value) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/login/`, {
        email: value.email,
        password: value.password,
      });
      const authToken = response.data.auth_token;
      auth.login(authToken);
      const isStaf = await checkIfStaff();
      if (isStaf) {
        navigate('/customadmin');
      } else {
        navigate('/profile/user-info');
      }
    }
    catch (error) {
      console.error('ERROR', error);
      if (error.response.status === 400) {
      setError('unspecifiedError', {
        type: 'manual',
        message: errorMessageTemplates.unspecifiedError
      });
    }}
  };

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
                    validate: (value) => validator.isEmail(value) || errorMessageTemplates.email,
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
                  <span className={classes['password-visibility']} onClick={togglePassword}>
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
            <Link to="/reset-password" className={classes['forget-password']}>Забули пароль?</Link>
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
              disabled={!isValid}
              type="submit"
              className={isValid ? classes['login-footer-buttons__signin'] : classes['login-footer-buttons__signin__disabled']}
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
