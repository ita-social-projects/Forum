import { Link } from 'react-router-dom';
import styles from './SendEmailRestorePassword.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';
import { SendEmailRestorePasswordFormComponent } from '../components/restorepassword/SendEmailForm';

export function SendEmailRestorePasswordPage() {
  return (
    <div className={styles['reset-password']}>
      <div className={styles['reset-password__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles.container}>
          <SendEmailRestorePasswordFormComponent />
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
