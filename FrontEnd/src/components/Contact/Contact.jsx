import React, { useEffect } from 'react';
import renderContent from '../CookiesPolicyPage/RenderContent.jsx';
import LinkContainer from '../CookiesPolicyPage/LinkContainer.jsx';
import styles from './Contact.module.css';
import contactText from './text';
import TEXT_CONTENT from './text';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles['contact_container']}>
      <div className={styles['contact__link_container']}>
        <LinkContainer />
        <img className={styles['contact__img1']}
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
          alt="dots.png" />
      </div>
      <div className={styles['contact__text_container']}>
        <h2 className={styles['contact__title']}>{contactText.title}</h2>
        {renderContent(TEXT_CONTENT)}
      </div>
    </div>
  );
};

export default Contact;
