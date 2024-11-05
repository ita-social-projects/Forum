import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ResendActivationFormContent } from '../SignupForm/ResendActivationFormContent.jsx';
import SignUpComponentsPageLayout from './SignUpComponentsPageLayout';
import styles from './ResendActivationPage.module.css';

export function ResendActivationPage() {
  const [isValid, setIsValid] = useState(false);

  const updateIsValid = (value) => {
    setIsValid(value);
  };

  return (
    <SignUpComponentsPageLayout
      header={'Надіслати лист для активації ще раз'}
      content={
        <>
          <p className={styles['form__text']}>
            Введіть електронну адресу вказану при реєстрації для повторного
            надіслення листа. <br />
            На зазначену Вами електронну пошту буде відправлено листа з посиланням
            для активації. <br />
          </p>
          <ResendActivationFormContent setIsValid={updateIsValid} />
        </>
      }
      footer={
        <>
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
        </>
      }
    />
  );
}
