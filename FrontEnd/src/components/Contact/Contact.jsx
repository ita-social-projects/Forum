import styles from './Contact.module.css';
import contactText from './text';
import Text from './text';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentRenderer from '../CookiesPolicyPage/RenderingTextContainer.jsx';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className={styles['contact_container']}>
        <div className={styles['contact__link_container']}>
            <div className={styles['link']}>
                <Link className={styles['link_text']} to="/privacy-policy/">Privacy Policy<br /></Link>
                <Link className={styles['link_text']} to="/terms-and-conditions/">Terms & Conditions<br /></Link>
                <Link className={styles['link_text']} to="/cookies-policy/">Cookie Policy</Link>
                <Link className={styles['link_text__active']} to="/contact/">Contact</Link>
            </div>
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
