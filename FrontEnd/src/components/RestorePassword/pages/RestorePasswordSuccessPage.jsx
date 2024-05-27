import { Link } from 'react-router-dom';
import styles from './RestorePasswordSuccessPage.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';

export function RestorePasswordSuccessPage() {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles['container-modal']}>
          <div className={styles['modal__header']}>Пароль відновлено</div>
          <div className={styles['modal__footer--text']}>
            <p>
              Ваш пароль успішно відновлено. <br />
            </p>
          </div>
          <div className={styles['modal__footer']}>
            <div className={styles['button-container']}>
              <Link className={styles['login-page__button']} to="/login">
                Закрити
              </Link>
            </div>
          </div>
        </div>
        <DotDecorComponent position={'down-left'} />
      </div>
    </div>
  );
}