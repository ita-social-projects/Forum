import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './CookieMod.module.css';
import cookiesimage from './cookieimg/homecookies.png';
import { useState } from 'react';

const CookieMod = ({ active, setActive }) => {
  const [cookies, setCookie] = useCookies();
  const [detailsVisible, setDetailsVisible] = useState(false);

  const accessCookie = () => {
    const d = new Date();
    const cookieLifeTime = 30 * 24 * 60 * 60 * 1000;
    d.setTime(d.getTime() + cookieLifeTime);
    setCookie('first', true, { expires: d, sameSite: 'lax' });
    setActive(false);
  };

  const denyCookie = () => {
    const d = new Date();
    const cookieLifeTime = 30 * 24 * 60 * 60 * 1000;
    d.setTime(d.getTime() + cookieLifeTime);
    setCookie('first', false, { expires: d, sameSite: 'lax' });
    setActive(false);
  };

  const toggleDetails = (event) => {
    event.preventDefault();
    setDetailsVisible(!detailsVisible);
  };

  return cookies.first ? null : (
    <div
      className={`${styles['modal-window']} ${active && styles['active']}`}
    >
      <div className={styles['modal-content']} data-testid="cookiemodal" onClick={(e) => e.stopPropagation()}>
        <p className={styles['cookie-text']}>
          Наш веб-сайт використовує файли cookie, щоб покращити ваш досвід. Ви
          можете відмовитися, якщо хочете. Дізнатися більше{' '}
          {
            <Link className={styles['cookie-link']} onClick={toggleDetails}>
              про кукі-файли
            </Link>
          }

        </p>
        {detailsVisible && (
          <div className={styles['cookie-details']}>
            <p><b>Використання файлів &quot;cookies&quot;</b></p>
            <p>
              1. Файли &quot;cookies&quot; є невеликими текстовими файлами, які можуть бути розміщені на пристрої
              користувача під час відвідування Сайту. Вони дозволяють збирати та зберігати певну інформацію про
              відвідувачів, таку як налаштування мови, історія перегляду, дані автентифікації та інші деталі.
              Використання файлів &quot;cookies&quot; на Сайті сприяє поліпшенню зручності та персоналізації досвіду
              користувачів, дозволяючи зберігати інформацію про їхній вибір та взаємодію з різними елементами Сайту.
            </p>
            <p>
              2. Користувач має можливість керувати використанням файлів &quot;cookies&quot; у налаштуваннях свого
              веб-браузера. Відключення файлів &quot;cookies&quot; може бути здійснено користувачем у будь-який
              момент. Проте важливо зауважити, що відключення &quot;cookies&quot; може призвести до обмеження
              функціональності Сайту, а також до втрати певних персоналізованих налаштувань та зручностей, які вони
              забезпечують.
            </p>
          </div>
        )}
        <img src={cookiesimage} alt="" className={styles['cookie-image']} />
        <button className={styles['green-btn']} onClick={accessCookie}>
          Погоджуюсь
        </button>
        <button className={styles['red-btn']} onClick={denyCookie}>
          Відмовляюсь
        </button>
      </div>
    </div>
  );
};

export default CookieMod;
