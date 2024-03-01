import React, { useEffect } from 'react';
import styles from './cookiesPolicyComponent.module.css';
import CookiesPolicyText from './text.js';
import Text from './text.js';
import LinkContainer from './LinkContainer.jsx';
import renderContent from './RenderContent.jsx';

const CookiesPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['cookies_policy']}>
      <div className={styles['cookies_policy__link_container']}>
        <LinkContainer />
        <img className={styles['cookies_policy__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
        <img className={styles['cookies_policy__img2']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
      </div>
      <div className={styles['cookies_policy__text_container']}>
        <h2 className={styles['cookies_policy__title']}>{CookiesPolicyText.title}</h2>
        {renderContent(Text)}
      </div>
    </div>
  );
};

export default CookiesPolicy;
