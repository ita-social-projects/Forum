import styles from './SignUpForm.module.css';
import { SignUpFormContentComponent } from './SignupForm/SignUpFormContent';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export function SignUpFormComponent() {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>Реєстрація</div>
      <SignUpFormContentComponent setIsValid={setIsValid}/>
      <div className={styles['form__footer']}>
        <div className={styles['button-container']}>
          <Link className={styles['main-page__button']} to="/">
            Головна
          </Link>
          <button
            disabled={!isValid}
            form="signUpForm"
            className={isValid ? styles['sign-up__button'] : styles['sign-up__button__disabled']}
            type="submit"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}
