import { Link } from 'react-router-dom';
import styles from './SignUpCompletionPage.module.css';

export function SignUpCompletionPage() {
  return (
    <div className={styles['completion-page']}>
      <div className={styles['completion-page__body']}>
        <div className={styles['completion-page__container']}>
          <div className={styles['completion-page__header']}>Реєстрація майже завершена</div>
          <div className={styles['completion-page__content']}>
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
          </div>
          <div className={styles['completion-page__footer']}>
            <div className={styles['button-container']}>
              <Link className={styles['signup-page__button']} to="/login">
                Повернутися до входу
              </Link>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
