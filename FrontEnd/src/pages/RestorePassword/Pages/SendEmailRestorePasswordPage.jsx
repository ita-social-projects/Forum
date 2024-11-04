import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './SendEmailRestorePassword.module.css';
import { SendEmailRestorePasswordFormContentComponent } from '../Components/RestorePassword/RestorePasswordForm/EmailFormContent';

export function SendEmailRestorePasswordPage() {
  const [isValid, setIsValid] = useState(false);

  return (
    <div className={styles['reset-password__page']}>
      <div className={styles['reset-password__body']}>
        <div className={styles['reset-password__container']}>
          <div className={styles['form__header']}>
            Забули пароль
          </div>
          <div className={styles['form__content']}>
            <p className={styles['form__text']}>
              Введіть електронну адресу вказану при реєстрації для відновлення паролю. <br />
              На зазначену Вами електронну пошту буде відправлено листа з посиланням
              для відновлення паролю. <br />
            </p>
            <SendEmailRestorePasswordFormContentComponent setIsValid={setIsValid} />
          </div>
          <div className={styles['form__footer']}>
            <div className={styles['button-container']}>
              <button
                disabled={!isValid}
                form="signUpForm"
                className={
                  isValid
                    ? styles['send-email__button']
                    : styles['send-email__button__disabled']
                }
                type="submit"
              >
                Відновити пароль
              </button>
            </div>
          </div>
        </div>
        <div className={styles['sign-in-line']}>
          <div className={styles['sign-in-line__text']}>
            Я згадав свій пароль.
          </div>
          <Link to="/login" className={styles['sign-in-line__link']}>
            Повернутися до входу
          </Link>
        </div>
      </div>
    </div>
  );
}
