import styles from './ResendActivationForm.module.css';
import { ResendActivationFormContentComponent } from './SignupForm/ResendActivationFormContent';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function ResendActivationFormComponent() {
  const [isValid, setIsValid] = useState(false);

  const updateIsValid = (value) => {
    setIsValid(value);
  };
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        Надіслати лист для активації ще раз
      </div>
      <div className={styles['form__footer']}>
        <p>
          Введіть електронну адресу вказану при реєстрації для повторного
          надіслення листа. <br />
          На зазначену Вами електронну пошту буде відправлено листа з посиланням
          для активації. <br />
        </p>
      </div>
      <ResendActivationFormContentComponent setIsValid={updateIsValid} />
      <div className={styles['form__footer']}>
        <div className={styles['button-container']}>
          <Link className={styles['signup-page__button']} to="/sign-up">
            Скасувати
          </Link>
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
        </div>
      </div>
    </div>
  );
}
