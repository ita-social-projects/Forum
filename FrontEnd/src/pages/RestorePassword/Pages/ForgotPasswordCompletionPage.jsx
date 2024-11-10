import { Link } from 'react-router-dom';
import SignUpComponentsPageLayout from '../../SignUp/SignUp/SignUpComponentsPageLayout';
import styles from './ForgotPasswordCompletionPage.module.css';

export function ForgotPasswordCompletionPage() {
  return (
    <SignUpComponentsPageLayout
      header={'Відновлення паролю майже завершено'}
      content={
        <p className={styles['completion-page__text']}>
          На вашу електронну адресу були надіслані інструкції для зміни паролю.<br />
        </p>
      }
      footer={
        <Link className={styles['login-page__button']} to="/login">
          Повернутися до входу
        </Link>
      }
    />
  );
}
