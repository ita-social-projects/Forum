import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './CookieMod.module.css';
import cookiesimage from './cookieimg/homecookies.png';

const CookieMod = ({ active, setActive }) => {
  const [cookies, setCookie] = useCookies();
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
  return cookies.first ? null : (
    <div
      className={`${styles['modal-window']} ${active && styles['active']}`}
      onClick={() => setActive(false)}
    >
      <div className={styles['modal-content']} data-testid="cookiemodal">
        <p className={styles['cookie-text']}>
          Наш веб-сайт використовує файли cookie, щоб покращити ваш досвід. Ви
          можете відмовитися, якщо хочете. Дізнатися більше{' '}
          {
            <Link to="/privacy-policy#17" className={styles['cookie-link']}>
              про кукі-файли
            </Link>
          }
        </p>
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
