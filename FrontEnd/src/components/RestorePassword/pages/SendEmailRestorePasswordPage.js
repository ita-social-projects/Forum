import styles from './SendEmailRestorePassword.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';
import { SendEmailRestorePasswordFormComponent } from '../components/restorepassword/SendEmailForm';

export function SendEmailRestorePasswordPage() {
  return (
    <div className={styles['sign-up']}>
      <div className={styles['sign-up__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles.container}>
          <SendEmailRestorePasswordFormComponent />
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
