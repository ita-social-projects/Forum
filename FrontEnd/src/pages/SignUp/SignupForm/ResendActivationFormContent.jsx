import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { EMAIL_PATTERN } from '../../../constants/constants';
import styles from './ResendActivationFormContent.module.css';

export function ResendActivationFormContent({ setIsValid }) {
  const navigate = useNavigate();

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    email: 'Email не відповідає вимогам',
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    const formIsValid = isValid;
    setIsValid(formIsValid);
  }, [isValid, setIsValid]);

  const onSubmit = () => {
    const dataToSend = {
      email: getValues('email'),
    };

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/resend_activation/`,
      withCredentials: false,
      data: dataToSend,
    })
      .then(() => {
        setIsValid(true);
        navigate('/login');
      })
      .catch(() => {
        toast.error('Виникла помилка. Спробуйте ще раз або зв\'яжіться з підтримкою.');
      });
  };

  return (
    <div className={styles['resend-activation-form']}>
      <form
        id="signUpForm"
        className={styles['resend-activation-form__container']}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className={styles['resend-activation-form__column']}>
          <div className={styles['resend-activation-form__label']}>
            <label
              className={styles['resend-activation-form__label--required']}
            >
              *
            </label>
            <label className={styles['resend-activation-form__label--text']}>
              Електронна пошта
            </label>
          </div>
          <div className={styles['resend-activation-form__field']}>
            <input
              className={styles['resend-activation-form__input']}
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
          </div>
          <div className={styles['resend-activation-form__error']}>
            {errors.email && errors.email.message}
          </div>
        </div>
      </form>
    </div>
  );
}

ResendActivationFormContent.propTypes = {
  setIsValid: PropTypes.func.isRequired,
};
