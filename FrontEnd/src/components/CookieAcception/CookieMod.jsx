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
    <div className={styles['cookie-banner']} data-testid="cookiemodal">
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
              про файли cookies.
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
            <div className={styles['modal-header']}>
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/cookies.png`}
                alt="cookies"
                className={styles['cookie-logo']}
              />
              <h3 className={styles['modal-title']}>
                Використання файлів &quot;Cookies&quot;
              </h3>
            </div>
            <div className={styles['modal-text-container']}>
              <p className={styles['modal-text']}>
                Файли &quot;cookies&quot; є невеликими текстовими файлами, які можуть бути розміщені на
                пристрої користувача під час відвідування Сайту. Вони дозволяють збирати та зберігати певну
                інформацію про відвідувачів, таку як налаштування мови, історія перегляду, дані
                автентифікації та інші деталі. Використання файлів &quot;cookies&quot; на Сайті сприяє
                поліпшенню зручності та персоналізації досвіду користувачів, дозволяючи зберігати інформацію
                про їхній вибір та взаємодію з різними елементами Сайту.
              </p>
              <p className={styles['modal-text-domains']}>
                Your permission applies to the following domains:
              </p>
              <ul className={styles['modal-domains']}>
                <li>cookieinfo.net</li>
                <li>intranet.cookieinfo.net</li>
              </ul>
            </div>
            <ul className={styles['modal-list']}>
              <li className={styles['modal-item']}>
                <div className={styles['item-header']}>
                  <h4 className={styles['item-title']}>Necessary</h4>
                  <input type="checkbox" checked disabled className={styles['modal-checkbox']} />
                </div>
                <p className={styles['item-description']}>
                  Necessary cookies help make a website usable by enabling basic functions like page
                  navigation and access to secure areas of the website. The website cannot function properly
                  without these cookies.
                </p>
              </li>
              <li className={styles['modal-item']}>
                <div className={styles['item-header']}>
                  <h4 className={styles['item-title']}>Statistic</h4>
                  <input
                    type="checkbox"
                    defaultChecked={cookies.statistics}
                    className={styles['modal-checkbox']}
                  />
                </div>
                <p className={styles['item-description']}>
                  Statistic cookies help website owners understand how visitors interact with websites by
                  collecting and reporting information anonymously.
                </p>
              </li>
              <li className={styles['modal-item']}>
                <div className={styles['item-header']}>
                  <h4 className={styles['item-title']}>Preferences</h4>
                  <input
                    type="checkbox"
                    defaultChecked={cookies.preferences}
                    className={styles['modal-checkbox']}
                  />
                </div>
                <p className={styles['item-description']}>
                  Preference cookies enable a website to remember information that changes the way the
                  website behaves or looks, like your preferred language or the region that you are in.
                </p>
              </li>
              <li className={styles['modal-item']}>
                <div className={styles['item-header']}>
                  <h4 className={styles['item-title']}>Marketing</h4>
                  <input
                    type="checkbox"
                    defaultChecked={cookies.marketing}
                    className={styles['modal-checkbox']}
                  />
                </div>
                <p className={styles['item-description']}>
                  Marketing cookies are used to track visitors across websites. The intention is to display
                  ads that are relevant and engaging for the individual user and thereby more valuable for
                  publishers and third-party advertisers.
                </p>
              </li>
            </ul>
            <div className={styles['modal-buttons']}>
              <button className={styles['save-btn']} onClick={accessCookie}>
                Дозволити обрані
              </button>
              <button
                className={styles['cancel-btn']}
                onClick={() => setDetailsVisible(false)}
              >
                Назад
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
