import axios from 'axios';
import{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainPage from '../landing-page/MainPage';
import classes from './ModerationModal.module.css';


export function ModerationModal() {
    const { uid, timestamp, action } = useParams();
    const [moderationStatus, setModerationStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const errorMessages = {
      'There is a new request for moderation. URL is outdated' :
      'Помилка: профіль було повторно оновлено. Існує новіший запит на модерацію. Посилання застаріле.',
      'The change approval request has been processed. URL is outdated':
      'Помилка: запит на затвердження змін вже було опрацьовано. Посилання застаріле.'
    };

    const handleModeration = async () => {
      try {
        await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/api/profiles/moderation/`,
          {
            uid: uid,
            timestamp: timestamp,
            action: action
          }
        );
        action === 'approve' ? setModerationStatus('Зміни успішно затверджено') : setModerationStatus('Зміни успішно скасовано. Профіль компанії заблоковано');
        setModalVisible(true);
      } catch (error) {
        setModerationStatus('Помилка застосування змін');
        if (error.response && error.response.status === 400) {
          Object.keys(error.response.data).forEach((key) => {
            const message = error.response.data[key][0];
            if (errorMessages[message]) {
              setModerationStatus(errorMessages[message]);
            }
          });
        }
        setModalVisible(true);
      }
    };

    useEffect(() => {
      handleModeration();
    }, []);

    const closeModal = () => {
      setModalVisible(false);
    };

    return (
      <div>
      <MainPage />
      {modalVisible && (
        <div className={classes['modal']}>
            <div className={classes['modal__content']}>
                {moderationStatus}
            </div>
            <div className={classes['modal__footer']}>
                <div className={classes['button-container']}>
                    <button
                    className={classes['modal__button']}
                    onClick={closeModal}
                    >
                    Закрити
                    </button>
                </div>
            </div>
        </div>
      )}
      {modalVisible && <div className={classes['blur-background']}></div>}
    </div>
    );
  }