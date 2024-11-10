import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpComponentsPageLayout from '../../SignUp/SignUp/SignUpComponentsPageLayout';
import { SendEmailRestorePasswordFormContentComponent } from '../Components/EmailFormContent';
import styles from './SendEmailForgotPasswordPage.module.css';

export function SendEmailForgotPasswordPage() {
  const [isValid, setIsValid] = useState(false);

  return (
    <SignUpComponentsPageLayout
      header={'Забули пароль'}
      content={
        <>
          <p className={styles['form__text']}>
            Введіть електронну адресу вказану при реєстрації для відновлення паролю. <br />
            На зазначену Вами електронну пошту буде відправлено листа з посиланням
            для відновлення паролю. <br />
          </p>
          <SendEmailRestorePasswordFormContentComponent setIsValid={setIsValid} />
        </>
      }
      footer={
        <>
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
        </>
      }
      signinLine={
        <>
          <div className={styles['sign-in-line']}>
            <div className={styles['sign-in-line__text']}>
              Я згадав свій пароль.
            </div>
            <Link to="/login" className={styles['sign-in-line__link']}>
              Повернутися до входу
            </Link>
          </div>
        </>
      }
    />

  );
}
