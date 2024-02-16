import styles from './Contact.module.css';
import contactText from './text';
import Text from './text';
import { v4 as uuidv4 } from 'uuid';
import reactLogo from './img/dots.png';
import { useEffect } from 'react';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className={styles['contact_container']}>
        <div className={styles['contact__link_container']}>
            <div className={styles['link']}>
                <a className={styles['link_text']} href="/privacy-policy/">Privacy Policy<br /></a>
                <a className={styles['link_text']} href="/terms-and-conditions/">Terms & Conditions<br /></a>
                <a className={styles['link_text']} href="/cookies-policy/">Cookie Policy</a>
                <a className={styles['link_text__active']} href="/Contact/">Contact</a>
            </div>
            <img className={styles['contact__img1']} src={reactLogo} alt="Image dots" />
            <img className={styles['contact__img2']} src={reactLogo} alt="Image dots" />
        </div>
        <div className={styles['contact__text_container']}>
        <h2 className={styles['contact__title']}>{contactText.title} </h2>
        {Text.content.map((item) => {
            if (item.type === 'paragraph') {
            return <p className={styles['text_content']} key={item.id || uuidv4()}>{item.text}</p>;
            } else if (item.type === 'heading') {
            const HeadingTag =`h${item.level}`;
            return <HeadingTag className={styles['text_content__heading']} key={item.id || uuidv4()}>{item.text}</HeadingTag>;
            }else if (item.type === 'paragraph__margin_bottom') {
            return <p  className={styles['text_content__margin_bottom']} key={item.id || uuidv4()}>{item.text}</p>;
            } else if (item.type === 'list-item') {
            return (
                <ul key={item.id || uuidv4()} className={styles['custom-list']}>
                <li className={styles['custom-list__item']}>{item.text}</li>
                </ul>
            );
            }
            return null;
        })}
        </div>
    </div>
  );
};

export default Contact;
