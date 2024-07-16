import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BanerModeration = () => {
  const [moderationTime, setModerationTime] = useState(0);

  useEffect(() => {
    const fetchModerationTime = async () => {
      try {
        const response = await axios.get('/api/automoderation/');
        console.log('Response data:', response.data); // Додаємо логування для перевірки
        setModerationTime(response.data.auto_moderation_hours);
      } catch (error) {
        console.error('Error fetching moderation time:', error);
      }
    };

    fetchModerationTime();
  }, []);

  return (
    <div>
      <form>
            Контент доданий до Банеру буде підлягати модерації.
            Після затвердження модератором контент стане доступним усім користувачам сайту.
            Час модерації - до {moderationTime} годин. Якщо запит не буде розглянуто впродовж цього часу то зміни автоматично будуть вважатись затвердженими.
            УВАГА: Профіль буде заблоковано якщо доданий контент має непристойний зміст.
        {/* Інші поля */}
      </form>
    </div>
  );
};

export default BanerModeration;


