import styles from './Contact.module.css';
import contactText from './text';
import Text from './text';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import ContentRenderer from '../CookiesPolicyPage/RenderingTextContainer.jsx';
import LinkContainer from '../CookiesPolicyPage/LinkContainer.jsx';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className={styles['contact_container']}>
        <div className={styles['contact__link_container']}>
        <LinkContainer /> {}
        <img className={styles['contact__img1']}
            src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
            alt="dots.png" />
        </div>
        <div className={styles['contact__text_container']}>
        <h2 className={styles['contact__title']}>{contactText.title} </h2>
        {Text.content.map((item) => (
          <ContentRenderer key={item.id || uuidv4()} item={item} styles={styles} />
        ))}
        </div>
    </div>
  );
};

export default Contact;
