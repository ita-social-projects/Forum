import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResendActivationFormContent } from '../SignupForm/ResendActivationFormContent.jsx';
import styles from './ResendActivationPage.module.css';

export function ResendActivationPage() {
  const [isValid, setIsValid] = useState(false);

  const updateIsValid = (value) => {
    setIsValid(value);
  };

  return (
    <div className={styles['resend-activation__page']}>
      <div className={styles['resend-activation__body']}>
        <div className={styles['resend-activation__container']}>
            <div className={styles['form__header']}>
              Надіслати лист для активації ще раз
            </div>
            <div className={styles['form__content']}>
                <p className={styles['form__text']}>
                  Введіть електронну адресу вказану при реєстрації для повторного
                  надіслення листа. <br />
                  На зазначену Вами електронну пошту буде відправлено листа з посиланням
                  для активації. <br />
                </p>
                <ResendActivationFormContent setIsValid={updateIsValid} />
                </div>
            <div className={styles['form__footer']}>
              <div className={styles['button-container']}>
                <button
                  disabled={!isValid}
                  form="signUpForm"
                  className={
                    isValid
                      ? styles['resend-activation__button']
                      : styles['resend-activation__button__disabled']
                  }
                  type="submit"
                >
                  Надіслати
                </button>
                <Link className={styles['cancel__button']} to="/sign-up">
                  Скасувати
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
