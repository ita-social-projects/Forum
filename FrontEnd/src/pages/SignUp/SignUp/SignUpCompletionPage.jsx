import { Link } from 'react-router-dom';
import SignUpComponentsPageLayout from './SignUpComponentsPageLayout';
import styles from './SignUpCompletionPage.module.css';

export function SignUpCompletionPage() {
  return (
    <SignUpComponentsPageLayout
      header={'Реєстрація майже завершена'}
      content={
        <>
          <p className={styles['completion-page__text']}>
            На зазначену Вами електронну пошту відправлено листа. <br />
            Будь ласка перейдіть за посиланням з листа для підтвердження вказаної електронної адреси. <br />
          </p>
          <div className={styles['resend-line']}>
            <p className={styles['resend-line__text']}>Не отримали листа?</p>
            <Link to="/sign-up/resend-activation" className={styles['resend-line__link']}>
              Надіслати ще раз
            </Link>
          </div>
        </>
      }
      footer={
        <Link className={styles['signup-page__button']} to="/login">
          Повернутися до входу
        </Link>
      }
    />
  );
}
