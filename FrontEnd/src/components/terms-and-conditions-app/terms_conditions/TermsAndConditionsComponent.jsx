import React from 'react';
import styles from './TermsAndConditionsComponent.module.css';
import TermsAndConditionsText from './text';
import TEXT_CONTENT from './text';
import LinkContainer from '../../CookiesPolicyPage/LinkContainer.jsx';
import renderContent from '../../CookiesPolicyPage/RenderContent.jsx';
import useScrollToTop from '../../../hooks/useScrollToTop';


const TermsAndConditions = () => {
  useScrollToTop();

  return (
    <div className={styles['TermsAndConditions']}>
      <div className={styles['TermsAndConditions__link_container']}>
        <LinkContainer />
        <img className={styles['TermsAndConditions__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
        <img className={styles['TermsAndConditions__img2']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
      </div>
      <div className={styles['TermsAndConditions__text_container']}>
        <h2 className={styles['TermsAndConditions__title']}>{TermsAndConditionsText.title} </h2>
        {renderContent(TEXT_CONTENT)}
      </div>
    </div>
  );
};

export default TermsAndConditions;
