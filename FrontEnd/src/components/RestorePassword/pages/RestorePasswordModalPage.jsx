import { Link } from 'react-router-dom';
import styles from './RestorePasswordModalPage.module.css';

export function RestorePasswordModalPage() {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal__body']}>
        <img className={styles['sign-up-img-right']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
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
        <img className={styles['sign-up-img-left']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
      </div>
    </div>
  );
}
