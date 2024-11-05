import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SignUpComponentsPageLayout from './SignUpComponentsPageLayout';
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
    <SignUpComponentsPageLayout
      header={
        activationStatus === 'Помилка активації'
          ? 'Помилка активації'
          : 'Реєстрація завершена!'
      }
      content={
        <p className={styles['activation-page__text']}>
          {activationStatus === 'Помилка активації'
            ? 'Під час активації сталася помилка. Спробуйте ще раз або зв\'яжіться з підтримкою.'
            : 'Ви успішно підтвердили вказану електронну адресу.'}
        </p>
      }
      footer={
        <Link className={styles['signup-page__button']} to="/login">
          Повернутися до входу
        </Link>
      }
    />
  );
}
