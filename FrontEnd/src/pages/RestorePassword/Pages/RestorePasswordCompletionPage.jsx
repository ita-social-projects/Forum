import { Link } from 'react-router-dom';
import styles from './RestorePasswordCompletionPage.module.css';

export function RestorePasswordCompletionPage() {
  return (
    <div className={styles['completion-page']}>
      <div className={styles['completion-page__body']}>
        <div className={styles['completion-page__container']}>
          <div className={styles['completion-page__header']}>Відновлення паролю майже завершено</div>
          <div className={styles['completion-page__content']}>
            <p className={styles['completion-page__text']}>
              На вашу електронну адресу були надіслані інструкції для зміни паролю.<br />
            </p>
          </div>
          <div  className={styles['completion-page__footer']}>
            <div className={styles['button-container']}>
              <Link className={styles['login-page__button']} to="/login">
                Повернутися до входу
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
