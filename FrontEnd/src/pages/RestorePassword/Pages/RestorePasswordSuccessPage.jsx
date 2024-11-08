import { Link } from 'react-router-dom';
import SignUpComponentsPageLayout from '../../SignUp/SignUp/SignUpComponentsPageLayout';
import styles from './RestorePasswordSuccessPage.module.css';

export function RestorePasswordSuccessPage() {
  return (
    <SignUpComponentsPageLayout
      header={'Пароль збережено'}
      content={
        <p className={styles['page__footer--text']}>
          Ваш новий пароль успішно збережено. <br />
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
