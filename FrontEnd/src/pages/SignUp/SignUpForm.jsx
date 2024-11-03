import { useState } from 'react';
import { SignUpFormContentComponent } from './SignupForm/SignUpFormContent';
import styles from './SignUpForm.module.css';

export function SignUpFormComponent() {
  const [isValid, setIsValid] = useState(false);
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>Реєстрація</div>
      <SignUpFormContentComponent setIsValid={setIsValid}/>
      <div className={styles['form__footer']}>
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
  );
}
