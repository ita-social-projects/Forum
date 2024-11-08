import { Link } from 'react-router-dom';
import SignUpComponentsPageLayout from '../../SignUp/SignUp/SignUpComponentsPageLayout';
import styles from './RestorePasswordSuccessPage.module.css';

export function RestorePasswordFailedPage() {
  return (
    <SignUpComponentsPageLayout
      header={'Посилання неактивне'}
      content={
        <p className={styles['page__footer--text']}>
          Зміна паролю неможлива. <br />
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
