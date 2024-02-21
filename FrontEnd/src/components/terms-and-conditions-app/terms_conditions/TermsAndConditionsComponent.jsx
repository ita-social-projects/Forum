import styles from './TermsAndConditionsComponent.module.css';
import TermsAndConditionsText from './text';
import Text from './text';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentRenderer from '../../CookiesPolicyPage/RenderingTextContainer.jsx';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className={styles['TermsAndConditions']}>
        <div className={styles['TermsAndConditions__link_container']}>
            <div className={styles['link']}>
                <Link className={styles['link_text']} to="/privacy-policy/">Privacy Policy<br /></Link>
                <Link className={styles['link_text__active']} to="/terms-and-conditions/">Terms & Conditions<br /></Link>
                <Link className={styles['link_text']} to="/cookies-policy/">Cookie Policy</Link>
                <Link className={styles['link_text']} to="/contact/">Contact</Link>
            </div>
            <img className={styles['TermsAndConditions__img1']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
                alt="dots.png" />
            <img className={styles['TermsAndConditions__img2']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots.png`}
                alt="dots.png" />
        </div>
        <div className={styles['TermsAndConditions__text_container']}>
        <h2 className={styles['TermsAndConditions__title']}>{TermsAndConditionsText.title} </h2>
        {Text.content.map((item) => (
          <ContentRenderer key={item.id || uuidv4()} item={item} styles={styles} />
        ))}
        </div>
    </div>
  );
};

export default TermsAndConditions;

