import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignUpComponentsPageLayout from '../../SignUp/SignUp/SignUpComponentsPageLayout';
import { RestorePasswordFormContentComponent } from '../Components/RestorePasswordFormContent';
import styles from './RestorePasswordPage.module.css';

export function RestorePasswordPage() {

  const [isValid, setIsValid] = useState(false);
  const updateIsValid = (value) => {
    setIsValid(value);
  };

  return (
    <SignUpComponentsPageLayout
      header={'Відновлення паролю'}
      content={
        <RestorePasswordFormContentComponent setIsValid={updateIsValid}/>
      }
      footer={
        <button
          disabled={!isValid}
          form="resetPasswordForm"
          className={isValid ? styles['save-password__button'] : styles['save-password__button__disabled']}
          type="submit"
        >
          Зберегти пароль
        </button>
      }
      signinLine={
        <>
          <div className={styles['sign-in-line']}>
            <Link to="/login" className={styles['sign-in-line__link']}>
              Повернутися до входу
            </Link>
          </div>
        </>
      }
    />
  );
}
