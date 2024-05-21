import { Link } from 'react-router-dom';
import styles from './RestorePasswordPage.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';
import { RestorePasswordFormComponent } from '../components/restorepassword/RestorePasswordForm';

export function RestorePasswordPage() {
  return (
    <div className={styles['reset-password']}>
      <div className={styles['reset-password__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles.container}>
          <RestorePasswordFormComponent />
          <div className={styles['sign-in-line']}>
            <div className={styles['sign-in-line__text']}>
              Вже були на нашому сайті?
            </div>
            <Link to="/login" className={styles['sign-in-line__link']}>
              Увійти
            </Link>
          </div>
        </div>
        <DotDecorComponent position={'down-left'} />
      </div>
    </div>
  );
}
