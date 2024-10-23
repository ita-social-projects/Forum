import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Tooltip } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import classNames from 'classnames';

import EyeInvisible from '../../../pages/Authorization/EyeInvisible';
import EyeVisible from '../../../pages/Authorization/EyeVisible';

import styles from './SignUpFormContent.module.css';

import PropTypes from 'prop-types';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  NAME_SURNAME_PATTERN,
  COMPANY_NAME_PATTERN,
} from '../../../constants/constants';


const RulesModal = React.lazy(() => import('./RulesModal'));

export function SignUpFormContentComponent(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const reCaptchaRef = useRef();
  const onReCaptchaChange = () => reCaptchaRef.current = !reCaptchaRef.current;
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const errorMessageTemplates = {
    email: 'Електронна пошта не відповідає вимогам',
    password: 'Пароль не відповідає вимогам',
    confirmPassword: 'Паролі не співпадають. Будь ласка, введіть однакові паролі в обидва поля',
    nameSurnameFieldLength: 'Введіть від 2 до 50 символів',
    companyFieldLength: 'Введіть від 2 до 100 символів',
    notAllowedSymbols: 'Поле містить недопустимі символи та/або цифри',
    maxLength: 'Кількість символів перевищує максимально допустиму (50 символів)',
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    criteriaMode: 'all',
  });

  const { setIsValid } = props;
  // modal start
  const [isModalOpen, setIsModalOpen] = useState(false);
  SignUpFormContentComponent.propTypes = {
    setIsValid: PropTypes.func.isRequired,
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // modal end
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    setValue(name, checked);
    const otherOption = name === 'yurosoba' ? 'fop' : 'yurosoba';
    setValue(otherOption, false);
    if (!getValues('yurosoba') && !getValues('fop')) {
      setError('businessEntity', {
        type: 'manual',
        message: 'Виберіть, який суб\'єкт господарювання ви представляєте',
      });
    } else {
      clearErrors('businessEntity');
    }
  };

  const validateNameSurname = (value) => {
    const allowedSymbolsPattern = /^[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ'\s]+$/;
    const letterCount = (value.match(/[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ]/g) || [])
      .length;
    if (!allowedSymbolsPattern.test(value)) {
      return errorMessageTemplates.notAllowedSymbols;
    }
    if (letterCount < 2) {
      return errorMessageTemplates.nameSurnameFieldLength;
    }
    return true;
  };

  const onBlurHandler = (fieldName) => {
    let fieldValue = getValues(fieldName);
    if (fieldValue !== undefined && fieldValue !== null) {
      fieldValue = fieldValue.replace(/\s{2,}/g, ' ').trim();
      setValue(fieldName, fieldValue);
    }
  };

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);

  const handleValidation = async () => {
    await trigger(['password', 'confirmPassword']);
  };

  useEffect(() => {
    if (watch('password') && watch('confirmPassword')) {
      handleValidation();
    }
  }, [watch('confirmPassword'), watch('password')]);

  const onSubmit = async () => {
    let recaptcha_token = null;
    try {
      recaptcha_token = await reCaptchaRef.current.executeAsync();
    } catch (error) {
      console.warn('reCAPTCHA failed or quota expired:', error);
    }

    const dataToSend = {
      email: getValues('email'),
      password: getValues('password'),
      re_password: getValues('confirmPassword'),
      name: getValues('name'),
      surname: getValues('surname'),
      captcha: recaptcha_token,
      company: {
        name: getValues('companyName'),
        is_registered: getValues('representative').indexOf('company') > -1,
        is_startup: getValues('representative').indexOf('startup') > -1,
        is_fop: getValues('fop'),
      },
    };

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/`,
      data: dataToSend,
    })
      .then(() => {
        navigate('/sign-up/modal');
      })
      .catch((error) => {
        if (error.response.data.email) {
          setError('email', {
            type: 'manual',
            message: 'Ця електронна пошта вже зареєстрована пошта',
          });
        }
        if (error.response && error.response.status === 400) {
          toast.error('Не вдалося зареєструвати користувача, сталася помилка');
        }
      });
  };

  return (
    <div className={styles['signup-form']}>
      <form
        id="signUpForm"
        className={styles['signup-form__container']}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label className={styles['signup-form__label--text']}>
                Обов&apos;язкові поля позначені зірочкою
              </label>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required']}>
                  *
                </label>
                <label className={styles['signup-form__label--text']}>
                  Назва компанії
                </label>
              </div>
              <div className={styles['signup-form__field']}>
                <Tooltip
                  title={
                    !COMPANY_NAME_PATTERN.test(getValues('companyName')) &&
                    'Назва повинна містити від 2 до 100 символів'
                  }
                  trigger="focus"
                  pointAtCenter={true}
                >
                  <input
                    className={classNames(
                      styles['signup-form__input'],
                      {[styles['signup-form__input--error']]: errors.companyName}
                    )}
                    type="text"
                    placeholder="Введіть назву вашої компанії"
                    {...register('companyName', {
                      required: 'Не ввели назву компанії',
                      pattern: {
                        value: COMPANY_NAME_PATTERN,
                      },
                      minLength: {
                        value: 2,
                        message: errorMessageTemplates.companyFieldLength,
                      },
                    })}
                    maxLength={100}
                    onBlur={() => {
                      onBlurHandler('companyName');
                      trigger('companyName');
                    }}
                  />
                </Tooltip>
              </div>
              <div className={styles['signup-form__error']}>
                {errors.companyName && errors.companyName.message}
              </div>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required']}>
                  *
                </label>
                <label className={styles['signup-form__label--text']}>
                  Електронна пошта
                </label>
              </div>
              <div className={styles['signup-form__field']}>
                <Tooltip
                  title="Приклад електронної пошти logginname@example.com"
                  pointAtCenter={true}
                >
                  <input
                    className={classNames(
                      styles['signup-form__input'],
                      {[styles['signup-form__input--error']]: errors.email}
                    )}
                    placeholder="Введіть свою електронну пошту"
                    type="email"
                    {...register('email', {
                      required: 'Не ввели електронну пошту',
                      pattern: {
                        value: EMAIL_PATTERN,
                        message: errorMessageTemplates.email,
                      },
                    })}
                  />
                </Tooltip>
              </div>
              <div className={styles['signup-form__error']}>
                {errors.email && errors.email.message}
              </div>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required_special']}>
                  *
                </label>
                <div className={styles['signup-form__label--password']}>
                  <label>Пароль</label>
                  <label className={styles['signup-form__label--hint']}>
                    (Повинен містити від 8 символів, A-Z, a-z, 0-9)
                  </label>
                </div>
              </div>
              <div
                className={classNames(
                  styles['signup-form__field__password'],
                  {
                    [styles['signup-form__field__password--error']]: errors.password,
                    [styles['signup-form__field__password--show']]: showPassword
                  }
                )}
              >
                <input
                  className={styles['signup-form__input__password']}
                  placeholder="Введіть пароль"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Не ввели пароль',
                    pattern: {
                      value: PASSWORD_PATTERN,
                      message: errorMessageTemplates.password,
                    },
                    maxLength: {
                      value: 50,
                      message: errorMessageTemplates.maxLength
                    },
                    validate: (value) =>
                      watch('confirmPassword') !== value
                        ? errorMessageTemplates.confirmPassword
                        : null,
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
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  }
                />
              </div>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required_special']}>
                  *
                </label>
                <div className={styles['signup-form__label--password']}>
                  <label className={styles['signup-form__label--text']}>
                    Повторіть пароль
                  </label>
                  <label className={styles['signup-form__label--hint']}>
                    (Повинен містити від 8 символів, A-Z, a-z, 0-9)
                  </label>
                </div>
              </div>
              <div className={classNames(
                  styles['signup-form__field__password'],
                  {
                    [styles['signup-form__field__password--error']]: errors.confirmPassword,
                    [styles['signup-form__field__password--show']]: showConfirmPassword
                  }
                )}
              >
                <input
                  className={styles['signup-form__input__password']}
                  placeholder="Введіть пароль ще раз"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Не ввели пароль ще раз',
                    maxLength: {
                      value: 50,
                      message: errorMessageTemplates.maxLength
                    },
                    validate: (value) =>
                      watch('password') !== value
                        ? errorMessageTemplates.confirmPassword
                        : null,
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
                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => <p>{message}</p>}
                  />
              </div>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required']}>
                  *
                </label>
                <label className={styles['signup-form__label--text']}>
                  Прізвище
                </label>
              </div>
              <div className={styles['signup-form__field']}>
                <Tooltip
                  title={
                    !NAME_SURNAME_PATTERN.test(getValues('surname')) &&
                    'Прізвище повинне містити від 2 до 50 символів'
                  }
                  trigger="focus"
                  pointAtCenter={true}
                >
                  <input
                    className={classNames(
                      styles['signup-form__input'],
                      {[styles['signup-form__input--error']]: errors.surname}
                    )}
                    type="text"
                    placeholder="Введіть ваше прізвище"
                    {...register('surname', {
                      required: 'Не ввели прізвище',
                      validate: validateNameSurname,
                    })}
                    maxLength={50}
                    onBlur={() => {
                      onBlurHandler('surname');
                      trigger('surname');
                    }}
                  />
                </Tooltip>
              </div>
              <div className={styles['signup-form__error']}>
                {errors.surname && errors.surname.message}
              </div>
            </div>
            <div className={styles['signup-form__item']}>
              <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required']}>
                  *
                </label>
                <label className={styles['signup-form__label--text']}>Ім‘я</label>
              </div>
              <div className={styles['signup-form__field']}>
                <Tooltip
                  title={
                    !NAME_SURNAME_PATTERN.test(getValues('name')) &&
                    'Ім‘я повинне містити від 2 до 50 символів'
                  }
                  trigger="focus"
                  pointAtCenter={true}
                >
                  <input
                    className={classNames(
                      styles['signup-form__input'],
                      {[styles['signup-form__input--error']]: errors.name}
                    )}
                    type="text"
                    placeholder="Введіть ваше ім‘я"
                    {...register('name', {
                      required: 'Не ввели ім\'я',
                      validate: validateNameSurname,
                    })}
                    maxLength={50}
                    onBlur={() => {
                      onBlurHandler('name');
                      trigger('name');
                    }}
                  />
                </Tooltip>
              </div>
              <div className={styles['signup-form__error']}>
                {errors.name && errors.name.message}
              </div>
            </div>
          <div className={styles['representative']}>
            <div className={styles['representative__title']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label>Кого ви представляєте?</label>
            </div>
              <div className={styles['representative__content']}>
                <div className={styles['representative__option']}>
                  <div
                    className={classNames(styles['representative__checkbox-container'], {
                      [styles['representative__input--error']]: errors.representative,
                    })}
                  >
                    <input
                      type="checkbox"
                      name="company"
                      value={'company'}
                      {...register('representative', {
                        required:
                          'Виберіть, кого ви представляєте',
                      })}
                    />
                  </div>
                  <label className={styles['representative__label']}>
                    Зареєстрована компанія
                  </label>
                </div>
                <div className={styles['representative__option']}>
                  <div
                    className={classNames(styles['representative__checkbox-container'], {
                      [styles['representative__input--error']]: errors.representative,
                    })}
                  >
                    <input
                      type="checkbox"
                      name="startup"
                      value={'startup'}
                      {...register('representative', {
                        required:
                          'Виберіть, кого ви представляєте',
                      })}
                    />
                  </div>
                  <label className={styles['representative__label']}>
                    Стартап проект, який шукає інвестиції
                  </label>
                </div>
              </div>
            <div className={styles['signup-form__error']}>
              {errors.representative && errors.representative.message}
            </div>
          </div>
          <div className={styles['representative']}>
            <div className={styles['representative__title']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label>Який суб&apos;єкт господарювання ви представляєте?</label>
            </div>

              <div className={styles['representative__content']}>
              <div className={styles['representative__option']}>
                    <div
                      className={classNames(styles['representative__checkbox-container'], {
                        [styles['representative__input--error']]: errors.businessEntity,
                      })}
                    >
                      <input
                        type="checkbox"
                        {...register('fop', {
                          onChange: onChangeCheckbox,
                        })}
                      />
                    </div>
                    <label className={styles['representative__label']}>
                      Фізична особа-підприємець
                    </label>
                  </div>
                  <div className={styles['representative__option']}>
                    <div
                      className={classNames(styles['representative__checkbox-container'], {
                        [styles['representative__input--error']]: errors.businessEntity,
                      })}
                    >
                      <input
                        type="checkbox"
                        {...register('yurosoba', {
                          onChange: onChangeCheckbox,
                        })}
                      />
                    </div>
                    <label className={styles['representative__label']}>
                      Юридична особа
                    </label>
                  </div>
              </div>
            <div className={styles['signup-form__error']}>
              {errors.businessEntity && errors.businessEntity.message}
            </div>
          </div>
          <div className={styles['signup-form__checkboxes-container--rules']}>
            <label className={styles['rules__line--text']}>
              Реєструючись, я погоджуюсь з{' '}
              <a
                onClick={openModal}
                className={styles['rules__line--link']}
              >
                правилами використання
              </a>
              {' '}сайту Craftmerge
            </label>
          </div>
        <ReCAPTCHA
          ref={reCaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_V2_SITE_KEY}
          size="invisible"
          onChange={onReCaptchaChange}
          className={styles['signup-form__recaptcha']}
        />
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        {isModalOpen && <RulesModal closeModal={closeModal} />}
      </Suspense>
    </div>
  );
}
