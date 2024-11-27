import React from 'react';
import styles from './PrivacyPolicy.module.css';
import privacyPolicyText from './text';
import TEXT_CONTENT from './text';
import renderContent from '../CookiesPolicyPage/RenderContent.jsx';
import useScrollToTop from '../../hooks/useScrollToTop';


const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <div className={styles['privacy_policy']}>
      <div className={styles['privacy_policy__text_container']}>
        <h2 className={styles['privacy_policy__title']}>{privacyPolicyText.title} </h2>
        {renderContent(TEXT_CONTENT)}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
