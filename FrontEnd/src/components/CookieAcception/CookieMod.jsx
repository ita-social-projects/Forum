import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styles from './CookieMod.module.css';

const CookieMod = ({ active, setActive }) => {
  const [cookies, setCookie] = useCookies(['necessary', 'statistics', 'preferences', 'marketing']);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const accessCookie = () => {
    const d = new Date();
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
    setCookie('necessary', true, { expires: d, sameSite: 'lax' });
    setCookie('statistics', true, { expires: d, sameSite: 'lax' });
    setCookie('preferences', true, { expires: d, sameSite: 'lax' });
    setCookie('marketing', true, { expires: d, sameSite: 'lax' });
    setActive(false);
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return active ? (
    <div className={styles['cookie-banner']}>
      {!detailsVisible ? (
        <div className={styles['cookie-content']}>
          <div className={styles['cookie-header']}>
            <img
              src={`${process.env.REACT_APP_PUBLIC_URL}/img/cookies.png`}
              alt="cookies"
              className={styles['cookie-logo']}
            />
            <h3 className={styles['cookie-title']}>Cookies</h3>
          </div>
          <p className={styles['cookie-text']}>
            Наш веб-сайт використовує файли cookie, щоб покращити ваш досвід.
          </p>
          <p className={styles['cookie-text']}>
            Дізнатися більше
            <Link to="/cookie-policy" className={styles['cookie-link']}>
                про файли cookie.
            </Link>
          </p>
          <div className={styles['cookie-buttons']}>
            <button className={styles['allow-all-btn']} onClick={accessCookie}>
              Дозволити всі
            </button>
            <button className={styles['settings-btn']} onClick={toggleDetails}>
              Налаштувати
            </button>
          </div>
        </div>
      ) : (
        <div className={styles['cookie-modal']}>
          <div className={styles['modal-content']}>
            <h3 className={styles['modal-title']}>
              Використання файлів &quot;Cookies&quot;
            </h3>
            <p className={styles['modal-text']}>
              Файли &quot;cookies&quot; є невеликими текстовими файлами, які можуть бути розміщені на пристрої
              користувача під час відвідування Сайту. Вони дозволяють збирати та зберігати певну інформацію
              про відвідувачів, таку як налаштування мови, історія перегляду, дані автентифікації та інші
              деталі. Використання файлів &quot;cookies&quot; на Сайті сприяє поліпшенню зручності та
              персоналізації досвіду користувачів, дозволяючи зберігати інформацію про їхній вибір та
              взаємодію з різними елементами Сайту.
            </p>
            <p className={styles['modal-text']}>
              Ваші налаштування застосовуються до наступних доменів:
            </p>
            <ul className={styles['modal-domains']}>
              <li>cookieinfo.net</li>
              <li>intranet.cookieinfo.net</li>
            </ul>
            <p className={styles['modal-category-title']}>Категорії файлів cookie:</p>
            <ul className={styles['modal-list']}>
              <li>
                <label>
                  <input type="checkbox" checked disabled /> Необхідні
                </label>
                <p className={styles['modal-description']}>
                  Необхідні файли cookie допомагають зробити веб-сайт придатним для використання,
                  увімкнувши базові функції, такі як навігація на сторінках і доступ до захищених розділів
                  сайту.
                </p>
              </li>
              <li>
                <label>
                  <input type="checkbox" defaultChecked={cookies.statistics} /> Статистичні
                </label>
                <p className={styles['modal-description']}>
                  Статистичні файли cookie допомагають власникам веб-сайтів зрозуміти, як відвідувачі
                  взаємодіють із сайтом, збираючи анонімну інформацію.
                </p>
              </li>
              <li>
                <label>
                  <input type="checkbox" defaultChecked={cookies.preferences} /> Переваги
                </label>
                <p className={styles['modal-description']}>
                  Файли cookie &quot;Переваги&quot; дозволяють веб-сайту запам&#39;ятовувати інформацію, яка
                  змінює зовнішній вигляд або поведінку сайту, наприклад вашу мову або регіон.
                </p>
              </li>
              <li>
                <label>
                  <input type="checkbox" defaultChecked={cookies.marketing} /> Маркетингові
                </label>
                <p className={styles['modal-description']}>
                  Маркетингові файли cookie використовуються для відстеження відвідувачів на веб-сайтах.
                  Мета полягає в тому, щоб показувати рекламу, яка є актуальною та цікавою для користувача.
                </p>
              </li>
            </ul>
            <div className={styles['modal-buttons']}>
              <button className={styles['cancel-btn']} onClick={() => setDetailsVisible(false)}>
                Назад
              </button>
              <button className={styles['save-btn']} onClick={accessCookie}>
                Дозволити обрані
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

CookieMod.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default CookieMod;
