import React, { useEffect, useState ,  Suspense} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'antd';
import EyeInvisible from '../../../../authorization/EyeInvisible';
import EyeVisible from '../../../../authorization/EyeVisible';
import { validateCompanyName, validateName, validateSurname } from './FieldValidation';
import styles from './SignUpFormContent.module.css';
import PropTypes from 'prop-types';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  NAME_SURNAME_PATTERN,
  COMPANY_NAME_PATTERN
} from '../../../../../constants/constants';

const RulesModal = React.lazy(() => import('./RulesModal'));

export function SignUpFormContentComponent(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    email: 'Email не відповідає вимогам',
    password: 'Пароль не відповідає вимогам',
    confirmPassword: 'Паролі не збігаються',
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
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
  useEffect(() => {
    setIsValid(isValid);
  }, [isValid, setIsValid]);


  const onSubmit = () => {

    const dataToSend = {
      email: getValues('email'),
      password: getValues('password'),
      re_password: getValues('confirmPassword'),
      name: getValues('name'),
      surname: getValues('surname'),
      company: {
        name: getValues('companyName'),
        is_registered: (getValues('representative').indexOf('company') > -1),
        is_startup: (getValues('representative').indexOf('startup') > -1),
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
            message: 'Вже зареєстрована пошта',
          });
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
        <div className={styles['signup-form__row']}>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label className={styles['signup-form__label--text']}>
                Назва компанії
              </label>
            </div>
            <div className={styles['signup-form__field']}>
              <Tooltip title={validateCompanyName(getValues('companyName'))}
                pointAtCenter={true}>
                <input
                  className={styles['signup-form__input']}
                  type="text"
                  placeholder="Назва компанії"
                  {...register('companyName', {
                    required: errorMessageTemplates.required,
                    pattern: {
                      value: COMPANY_NAME_PATTERN,
                    },
                  })}
                />
              </Tooltip>
            </div>
            <div className={styles['signup-form__error']}>
              {errors.companyName && errors.companyName.message}
            </div>
          </div>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label className={styles['signup-form__label--text']}>
                Електронна пошта
              </label>
            </div>
            <div className={styles['signup-form__field']}>
            <Tooltip title="Приклад електронної пошти logginname@example.com"
                pointAtCenter={true}>
              <input
                className={styles['signup-form__input']}
                placeholder="Електронна пошта"
                type="email"
                {...register('email', {
                  required: errorMessageTemplates.required,
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
        </div>
        <div className={styles['signup-form__row']}>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required_special']}>
                *
              </label>
              <div className={styles['signup-form__label--password']}>
                <label>Пароль</label>
                <label className={styles['signup-form__label--hint']}>
                  (Повинен містити від 8 до 50 символів, A-Z, a-z, 0-9)
                </label>
              </div>
            </div>
            <div className={styles['signup-form__field__password']}>
              <input
                className={styles['signup-form__input__password']}
                placeholder="Пароль"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
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
            <div className={styles['signup-form__error']}>
              {errors.password && errors.password.message}
            </div>
          </div>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required_special']}>
                *
              </label>
              <div className={styles['signup-form__label--password']}>
                <label className={styles['signup-form__label--text']}>
                  Повторіть пароль
                </label>
                <label className={styles['signup-form__label--hint']}>
                  (Повинен містити від 8 до 50 символів, A-Z, a-z, 0-9)
                </label>
              </div>
            </div>
            <div className={styles['signup-form__field__password']}>
              <input
                className={styles['signup-form__input__password']}
                placeholder="Пароль"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: errorMessageTemplates.required,
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
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
        </div>
        <div className={styles['signup-form__row']}>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label className={styles['signup-form__label--text']}>
                Прізвище
              </label>
            </div>
            <div className={styles['signup-form__field']}>
            <Tooltip title={validateSurname(getValues('surname'))}
                pointAtCenter={true}>
              <input
                className={styles['signup-form__input']}
                type="text"
                placeholder="Прізвище"
                {...register('surname', {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: NAME_SURNAME_PATTERN,
                },
                })}
              />
            </Tooltip>
            </div>
            <div className={styles['signup-form__error']}>
              {errors.surname && errors.surname.message}
            </div>
          </div>
          <div className={styles['signup-form__column']}>
            <div className={styles['signup-form__label']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label className={styles['signup-form__label--text']}>Ім‘я</label>
            </div>
            <div className={styles['signup-form__field']}>
            <Tooltip title={validateName(getValues('name'))}
                pointAtCenter={true}>
              <input
                className={styles['signup-form__input']}
                type="text"
                placeholder="Ім‘я"
                {...register('name', {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: NAME_SURNAME_PATTERN,
                },
                })}
              />
            </Tooltip>
            </div>
            <div className={styles['signup-form__error']}>
              {errors.name && errors.name.message}
            </div>
          </div>
        </div>
        <div className={styles['signup-form__checkboxes-container']}>
          <div className={styles['representative']}>
            <div className={styles['representative__title']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <label>Кого ви представляєте?</label>
            </div>
            <div className={styles['representative__container']}>
              <div className={styles['representative__content']}>
                <div className={styles['representative__column']}>
                  <div className={styles['representative__option']}>
                    <div
                      className={styles['representative__checkbox-container']}
                    >
                      <input
                        type="checkbox"
                        name="company"
                        value={'company'}
                        {...register('representative', {
                          required: errorMessageTemplates.required
                        })}
                      />
                    </div>
                    <label className={styles['representative__label']}>
                      Зареєстрована компанія
                    </label>
                  </div>
                </div>
                <div className={styles['representative__column']}>
                  <div className={styles['representative__option']}>
                    <div
                      className={styles['representative__checkbox-container']}
                    >
                      <input
                        type="checkbox"
                        name="startup"
                        value={'startup'}
                        {...register('representative', {
                          required: errorMessageTemplates.required
                        })}
                      />
                    </div>
                    <label className={styles['representative__label']}>
                      Стартап проект, який шукає інвестиції
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['signup-form__error']}>
              {errors.representative && errors.representative.message}
            </div>
          </div>
          <div className={styles['signup-form__checkboxes-container--rules']}>
            <div className={styles['rules__container']}>
              <label className={styles['signup-form__label--required']}>
                *
              </label>
              <div className={styles['rules__line']}>
                <input
                  type="checkbox"
                  className={styles['rules__checkbox']}
                  {...register('rulesAgreement', {
                    required: errorMessageTemplates.required,
                  })}
                />
                <label className={styles['rules__line--text']}>
                  Погоджуюсь з{' '}
                  <a onClick={openModal} className={styles['rules__line--link']}>
                    правилами використання
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Suspense fallback={<div>Loading...</div>}>
        {isModalOpen && <RulesModal closeModal={closeModal} />}
      </Suspense>
    </div>
  );
}
