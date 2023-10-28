import styles from './SendEmailForm.module.css';
import { SendEmailRestorePasswordFormContentComponent } from './restorepassword-form/EmailFormContent';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SendEmailRestorePasswordFormComponent() {
  const [isValid, setIsValid] = useState(false);

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        Забули пароль
      </div>
      <div className={styles['form__footer']}>
        <p>
          Введіть електронну адресу вказану при реєстрації для відновлення паролю. <br />
          На зазначену Вами електронну пошту буде відправлено листа з посиланням
          для відновлення паролю. <br />
        </p>
      </div>
      <SendEmailRestorePasswordFormContentComponent setIsValid={setIsValid} />
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
