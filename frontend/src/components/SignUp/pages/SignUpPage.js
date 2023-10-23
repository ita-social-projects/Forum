import styles from './SignUpPage.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';
import { SignUpFormComponent } from '../components/signup/SignUpForm';

export function SignUpPage() {
  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles.container}>
          <SignUpFormComponent />
          <div className={styles['sign-in-line']}>
            <div className={styles['sign-in-line__text']}>
              Вже були на нашому сайті?
            </div>
            <a href="/login" className={styles['sign-in-line__link']}>
              Увійти
            </a>
          </div>
        </div>
        <DotDecorComponent position={'down-left'} />
      </div>
    </div>
  );
}
