import { Link } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import { ResendActivationFormComponent } from '../../../components/SignUp/ResendActivationForm';

export function ResendActivationPage() {
  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__body']}>
      <img className={styles['sign-up-img-right']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
        <div className={styles.container}>
          <ResendActivationFormComponent />
          <div className={styles['sign-in-line']}>
            <div className={styles['sign-in-line__text']}>
              Вже були на нашому сайті?
            </div>
            <Link to="/login" className={styles['sign-in-line__link']}>
              Увійти
            </Link>
          </div>
        </div>
        <img className={styles['sign-up-img-left']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
      </div>
    </div>
  );
}
