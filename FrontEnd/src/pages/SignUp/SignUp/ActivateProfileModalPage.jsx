import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoginPage from '../../../pages/Authorization/LoginPage';
import styles from './ActivateProfileModalPage.module.css';

export function ActivateProfileModalPage() {
  const { uid, token } = useParams();
  const [activationStatus, setActivationStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
      setModalVisible(true);
    } catch (error) {
      setActivationStatus('Помилка активації');
      setModalVisible(true);
    }
  };

  useEffect(() => {
    handleActivation();
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <LoginPage />
      {modalVisible && (
        <div className={styles['modal']}>
              <div className={styles['modal__header']}>
                {activationStatus === 'Помилка активації'
                  ? 'Помилка активації'
                  : 'Реєстрація завершена!'}
              </div>
              <div className={styles['modal__content']}>
                <p className={styles['modal__content--text']}>
                  {activationStatus === 'Помилка активації'
                    ? 'Під час активації сталася помилка. Спробуйте ще раз або зв\'яжіться з підтримкою.'
                    : 'Ви успішно підтвердили вказану електронну адресу.'}
                </p>
              </div>
              <div className={styles['modal__footer']}>
                <div className={styles['button-container']}>
                  <button
                    className={styles['signup-page__button']}
                    onClick={closeModal}
                  >
                    Закрити
                  </button>
                </div>
              </div>
        </div>
      )}
      {modalVisible && <div className={styles['blur-background']}></div>}
    </div>
  );
}
