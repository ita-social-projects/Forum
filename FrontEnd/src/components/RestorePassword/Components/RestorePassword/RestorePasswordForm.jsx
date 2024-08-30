import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RestorePasswordFormContentComponent } from './RestorePasswordForm/RestorePasswordFormContent';
import styles from './RestorePasswordForm.module.css';


export function RestorePasswordFormComponent() {
  const [isValid, setIsValid] = useState(false);
  const updateIsValid = (value) => {
    setIsValid(value);
  };
  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>Відновлення паролю</div>
      <RestorePasswordFormContentComponent setIsValid={updateIsValid}/>
      <div className={styles['form__footer']}>
        <div className={styles['button-container']}>
          <Link className={styles['main-page__button']} to="/">
            Головна
          </Link>
          <button
            disabled={!isValid}
            form="resetPasswordForm"
            className={isValid ? styles['sign-up__button'] : styles['sign-up__button__disabled']}
            type="submit"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
