import React, { useState, useEffect, useRef } from 'react'; // Add useEffect and useRef here
import axios from 'axios';
import LinkContainer from '../../pages/CookiesPolicyPage/LinkContainer.jsx';
import contactText from './text';
import useScrollToTop from '../../hooks/useScrollToTop'; // Ensure this is used
import {
    EMAIL_PATTERN,
    MESSAGE_PATTERN
} from '../../constants/constants';
import PropTypes from 'prop-types';
import DropDownMenu from '../MiniComponents/DropDownMenu/DropDownMenu.jsx';
import styles from './Contact.module.css';
import { Spin } from 'antd';

const Contact = () => {
    useScrollToTop(); // Call the hook to scroll to top on component mount

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Привіт, хочу повідомити...');
    const [category, setCategory] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [percent, setPercent] = useState(-50);
    const timerRef = useRef();

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setPercent((v) => {
                const nextPercent = v + 5;
                return nextPercent > 150 ? -50 : nextPercent;
            });
        }, 100);
        return () => clearTimeout(timerRef.current);
    }, [percent]);

    const categoryOptions = [
        { id: 1, name: 'Технічне питання' },
        { id: 2, name: 'Рекомендації' },
        { id: 3, name: 'Питання' },
        { id: 4, name: 'Інше' },
    ];

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (!EMAIL_PATTERN.test(value)) {
            setEmailError('Електронна пошта не відповідає вимогам');
        } else {
            setEmailError('');
        }
    };

    const handleMessageChange = (e) => {
        const { value } = e.target;
        setMessage(value);

        if (!MESSAGE_PATTERN.test(value)) {
            setMessageError('Повідомлення не може бути коротшим за 10 символів');
        } else {
            setMessageError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валідація перед відправкою
        if (!EMAIL_PATTERN.test(email)) {
            setEmailError('Електронна пошта не відповідає вимогам');
            return;
        }

        if (!MESSAGE_PATTERN.test(message)) {
            setMessageError('Повідомлення не може бути коротшим за 10 символів');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/admin/feedback/`, {
                email: email,
                message: message,
                category: category
            });

            if (response.status === 200) {
                setShowModal(true);
                setEmail('');
                setMessage('Привіт, хочу повідомити...');
                setCategory(null);
            }
        } catch (error) {
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleRedirect = () => {
        window.location.href = '/';
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles['contact_container']}>
            <div className={styles['contact__link_container']}>
                <LinkContainer />
                <img
                    className={styles['contact__img1']}
                    src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_12x10.png`}
                    alt="dots_12x10.png"
                />
            </div>
            <div className={styles['contact__text_container']}>
                <h2 className={styles['contact__title']}>{contactText.title}</h2>
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
                    {emailError && <p className={styles['contact__error']}>{emailError}</p>}
                    <DropDownMenu
                        value={category ? [category] : []} // Відображення повної назви категорії
                        onChange={(value) => setCategory(value[0] || null)}
                        options={categoryOptions}
                        updateHandler={(value) => setCategory(value[0] || null)}
                        className={styles['contact__select']}
                        placeholder="Оберіть категорію"
                        name="category"
                        label="Категорія:"
                    />
                    <label className={styles['contact__label']} htmlFor="message">Повідомлення:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        className={styles['contact__textarea']}
                        placeholder="Ваше повідомлення"
                        required
                    />
                    {messageError && <p className={styles['contact__error']}>{messageError}</p>}
                    <div className={styles['contact__button_container']}>
                      <button type="submit" className={styles['contact__button_send']}>
                        {loading ? <Spin percent={percent}/> : 'Надіслати'}
                      </button>
                      <button type="button" className={styles['contact__button_cancel']}>Відмінити</button>
                    </div>
                </form>
            </div>
            {showModal && (
                <div className={styles['modal_feedback']}>
                    <div className={styles['modal_feedback_content']}>
                        <h2>Повідомлення успішно надіслано!</h2>
                       <div className={styles['contact__button_modal_container']}>
                        <button type="button" onClick={handleRedirect} className={styles['contact__button_send']}>
                            На головну
                        </button>
                        <button type="button" onClick={closeModal} className={styles['contact__button_cancel']}>
                            Закрити
                        </button>
                       </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;

Contact.propTypes = {
    currentFormNameHandler: PropTypes.func,
};
