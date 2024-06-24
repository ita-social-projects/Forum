import React from 'react';
import styles from './PrivacyPolicy.module.css';
import privacyPolicyText from './text';
import TEXT_CONTENT from './text';
import LinkContainer from '../CookiesPolicyPage/LinkContainer.jsx';
import renderContent from '../CookiesPolicyPage/RenderContent.jsx';
import useScrollToTop from '../../hooks/useScrollToTop';


const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <div className={styles['privacy_policy']}>
      <div className={styles['privacy_policy__link_container']}>
        <LinkContainer />
        <img className={styles['privacy_policy__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
        <img className={styles['privacy_policy__img2']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
      </div>
      <div className={styles['privacy_policy__text_container']}>
        <h2 className={styles['privacy_policy__title']}>{privacyPolicyText.title} </h2>
        {renderContent(TEXT_CONTENT)}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
