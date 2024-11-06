import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoginPage from '../../../pages/Authorization/LoginPage';
import styles from './ActivateProfileModal.module.css';

export function ActivationProfilePage() {
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
          <div className={styles['modal__overlay']} onClick={closeModal}></div>
          <div className={styles['modal__body']}>
            <div className={styles['container-modal']}>
              <div className={styles['modal__header']}>
                {activationStatus === 'Помилка активації'
                  ? 'Помилка активації'
                  : 'Реєстрація завершена!'}
              </div>
              <div className={styles['modal__content']}>
                {activationStatus === 'Помилка активації' ? (
                  <p>
                    Під час активації сталася помилка.
                    Спробуйте ще раз або зв`яжіться з підтримкою.
                  </p>
                ) : (
                    <a>
                      Ви успішно підтвердили вказану електронну адресу.
                    </a>
                )}
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
          </div>
        </div>
      )}
      {modalVisible && <div className={styles['blur-background']}></div>}
    </div>
  );
}
