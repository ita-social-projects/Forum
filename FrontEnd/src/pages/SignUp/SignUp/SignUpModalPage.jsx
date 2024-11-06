import { Link } from 'react-router-dom';
import styles from './SignUpModalPage.module.css';

export function SignUpModalPage() {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal__body']}>
        <img className={styles['sign-up-img-right']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
        <div className={styles['container-modal']}>
          <div className={styles['modal__header']}>Реєстрація майже завершена</div>
          <div className={styles['modal__footer']}>
            <div>
              <p>
                На зазначену Вами електронну пошту відправлено листа. <br />
                Будь ласка перейдіть за посиланням з листа для підтвердження вказаної електронної адреси. <br />
                На цьому реєстрацію завершено. <br />
              </p>
              <div className={styles['resend-line']}>
                <Link to="/sign-up/resend-activation" className={styles['resend-line__link']}>
                  Не отримали лист?
                </Link>
              </div>
            </div>
          </div>
          <div className={styles['modal__footer']}>
            <div className={styles['button-container']}>
              <Link className={styles['signup-page__button']} to="/login">
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
