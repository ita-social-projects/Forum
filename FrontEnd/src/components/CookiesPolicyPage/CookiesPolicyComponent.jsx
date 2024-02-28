import styles from './cookiesPolicyComponent.module.css';
import CookiesPolicyText from './text.js';
import Text from './text.js';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import LinkContainer from './LinkContainer.jsx';
import ContentRenderer from './RenderingTextContainer.jsx';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['cookies_policy']}>
      <div className={styles['cookies_policy__link_container']}>
        <LinkContainer /> {}
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
