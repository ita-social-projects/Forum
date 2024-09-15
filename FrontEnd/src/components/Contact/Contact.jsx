import React, { useState } from 'react';
import LinkContainer from '../CookiesPolicyPage/LinkContainer.jsx';
import styles from './Contact.module.css';
import useScrollToTop from '../../hooks/useScrollToTop';

const Contact = () => {
  useScrollToTop();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('Привіт, хочу повідомити...');
  const [category, setCategory] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Category:', category);
  };

  return (
    <div className={styles['contact_container']}>
      <div className={styles['contact__link_container']}>
        <LinkContainer />
      </div>

      <div className={styles['contact__form_container']}>
        <h2 className={styles['contact__title']}>Зворотній зв&apos;язок</h2>
        <form onSubmit={handleSubmit} className={styles['contact__form']}>
          <label className={styles['contact__label']} htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles['contact__input']}
            placeholder="Ваша пошта"
            required
          />

          <label className={styles['contact__label']} htmlFor="category">Категорія:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className={`${styles['contact__select']} ${category === '' ? styles['placeholder'] : ''}`}
            required
          >
            <option value="" disabled>Будь ласка, оберіть тип повідомлення</option>
            <option value="Технічне питання">Технічне питання</option>
            <option value="Рекомендації">Рекомендації</option>
            <option value="Питання">Питання</option>
            <option value="Інше">Інше</option>
          </select>

          <label className={styles['contact__label']} htmlFor="message">Повідомлення:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            className={styles['contact__textarea']}
            placeholder="Ваше повідомлення"
            required
          />

          <button type="submit" className={styles['contact__button']}>Надіслати</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
