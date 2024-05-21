import { Link } from 'react-router-dom';
import styles from './RestorePasswordModalPage.module.css';
import DotDecorComponent from '../UI/dotDecor/DotDecor';

export function RestorePasswordModalPage() {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal__body']}>
        <DotDecorComponent position={'up-right'} />
        <div className={styles['container-modal']}>
            <div className={styles['modal__header']}>Відновлення паролю майже завершено</div>
            <div className={styles['modal__footer']}>
                <p>
                  На зазначену Вами електронну адресу були надіслені інструкції для зміни паролю. <br />
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
