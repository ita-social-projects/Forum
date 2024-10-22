import { Link } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import { SignUpFormComponent } from '../SignUpForm';

export function SignUpPage() {
  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__body']}>
        <div className={styles.container}>
          <SignUpFormComponent />
          <div className={styles['sign-in-line']}>
            <div className={styles['sign-in-line__text']}>
              Ви вже зареєстровані у нас?
            </div>
            <Link to="/login" className={styles['sign-in-line__link']}>
              Увійти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
