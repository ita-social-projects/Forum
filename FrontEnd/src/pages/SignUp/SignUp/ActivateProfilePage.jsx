import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from './ActivateProfilePage.module.css';

export function ActivateProfilePage() {
  const { uid, token } = useParams();
  const [activationStatus, setActivationStatus] = useState('');

  const handleActivation = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/activation/`,
        {
          uid: uid,
          token: token,
        }
      );

      setActivationStatus(response.data.message);
    } catch (error) {
      setActivationStatus('Помилка активації');
    }
  };

  useEffect(() => {
    handleActivation();
  }, []);

  return (
    <div className={styles['activation-page']}>
      <div  className={styles['activation-page__body']}>
        <div  className={styles['activation-page__container']}>
          <div className={styles['activation-page__header']}>
            {activationStatus === 'Помилка активації'
              ? 'Помилка активації'
              : 'Реєстрація завершена!'}
          </div>
          <div className={styles['activation-page__content']}>
            <p className={styles['activation-page__text']}>
              {activationStatus === 'Помилка активації'
                ? 'Під час активації сталася помилка. Спробуйте ще раз або зв\'яжіться з підтримкою.'
                : 'Ви успішно підтвердили вказану електронну адресу.'}
            </p>
          </div>
          <div className={styles['activation-page__footer']}>
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
