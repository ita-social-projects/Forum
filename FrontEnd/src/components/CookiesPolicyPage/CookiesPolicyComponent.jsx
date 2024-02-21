import styles from './cookiesPolicyComponent.module.css';
import CookiesPolicyText from './text.js';
import Text from './text.js';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentRenderer from './RenderingTextContainer.jsx';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['cookies_policy']}>
      <div className={styles['cookies_policy__link_container']}>
        <div className={styles['link']}>
          <Link className={styles['link_text']} to="/privacy-policy/">Privacy Policy<br /></Link>
          <Link className={styles['link_text']} to="/terms-and-conditions/">Terms & Conditions<br /></Link>
          <Link className={styles['link_text__active']} to="/cookies-policy/">Cookie Policy</Link>
          <Link className={styles['link_text']} to="/contact/">Contact</Link>
        </div>
        <img className={styles['cookies_policy__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
        <img className={styles['cookies_policy__img2']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
      </div>
      <div className={styles['cookies_policy__text_container']}>
        <h2 className={styles['cookies_policy__title']}>{CookiesPolicyText.title} </h2>
        {Text.content.map((item) => (
          <ContentRenderer key={item.id || uuidv4()} item={item} styles={styles} />
        ))}
      </div>
    </div>
  );
};

export default CookiesPolicy;
