import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from './EmailFormContent.module.css';

export function SendEmailRestorePasswordFormContentComponent({ setIsValid }) {
  const navigate = useNavigate();

  const errorMessageTemplates = {
    required: 'Обов’язкове поле',
    email: 'Email не відповідає вимогам',
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

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
      url: `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/reset_password/`,
      withCredentials: false,
      data: dataToSend,
    })
      .then(() => {
        setIsValid(true);
        navigate('/reset-password/modal');
      })
      .catch(() => {
        toast.error('Формат електронної пошти некоректний.');
      });
  };

  return (
    <div className={styles['send-email-form']}>
      <form
        id="signUpForm"
        className={styles['send-email-form__container']}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <div className={styles['send-email-form__row']}>
          <div className={styles['send-email-form__column']}>
            <div className={styles['send-email-form__label']}>
              <label
                className={styles['send-email-form__label--required']}
              >
                *
              </label>
              <label className={styles['send-email-form__label--text']}>
                Електронна пошта
              </label>
            </div>
            <div className={styles['send-email-form__field']}>
              <input
                className={styles['send-email-form__input']}
                placeholder="Електронна пошта"
                type="email"
                {...register('email', {
                  required: errorMessageTemplates.required,
                  pattern: {
                    value: emailPattern,
                    message: errorMessageTemplates.email,
                  },
                })}
              />
            </div>
            <div className={styles['send-email-form__error']}>
              {errors.email && errors.email.message}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

SendEmailRestorePasswordFormContentComponent.propTypes = {
  setIsValid: PropTypes.func.isRequired,
};
