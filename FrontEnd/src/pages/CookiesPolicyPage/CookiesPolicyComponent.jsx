import React from 'react';
import styles from './cookiesPolicyComponent.module.css';
import CookiesPolicyText from './text.js';
import TEXT_CONTENT from './text.js';
import renderContent from './RenderContent.jsx';
import useScrollToTop from '../../hooks/useScrollToTop';

const CookiesPolicy = () => {
  useScrollToTop();

  return (
    <div className={styles['cookies_policy']}>
      <div className={styles['cookies_policy__text_container']}>
        <h2 className={styles['cookies_policy__title']}>{CookiesPolicyText.title}</h2>
        {renderContent(TEXT_CONTENT)}
      </div>
    </div>
  );
};

export default CookiesPolicy;
