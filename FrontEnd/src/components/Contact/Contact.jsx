import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Select, Space } from 'antd';

import {
    EMAIL_PATTERN,
    MESSAGE_PATTERN
} from '../../constants/constants';

import LinkContainer from '../../pages/CookiesPolicyPage/LinkContainer.jsx';

import styles from './Contact.module.css';

const CATEGORY_OPTIONS = [
    { value: 'Технічне питання', label: 'Технічне питання' },
    { value: 'Рекомендації', label: 'Рекомендації' },
    { value: 'Питання', label: 'Питання' },
    { value: 'Інше', label: 'Інше' },
];

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
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

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
      } = useForm({
        mode: 'all',
        defaultValues: {
            'message': 'Привіт, хочу повідомити...',
            'email': '',
            },
      });

    const onSubmit = async (value) => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/admin/feedback/`, {
                email: value.email,
                message: value.message,
                category: value.category,
            });

            if (response.status === 200 || response.status === 201) {
                setShowModal(true);
                reset();
            }
        } catch (error) {
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
    };

    const closeModal = () => {
        setShowModal(false);
    };

   const closeErrorModal = () => {
        setShowErrorModal(false);
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
                <h2 className={styles['contact__title']}>Зворотній зв&apos;язок</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles['contact__form']} noValidate>
                    <div className={styles['contact__field']}>
                        <label className={styles['contact__label']} htmlFor="email">Email:</label>
                        <input className={styles['contact__input']}
                            id="email"
                            type="email"
                            placeholder="Ваша пошта"
                            {...register('email', {
                                required: 'Обов’язкове поле',
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: 'Електронна пошта не відповідає вимогам',
                                }
                            })}
                        />
                        {errors.email && <p className={styles['contact__error']}>{errors.email.message}</p>}
                    </div>
                    <div className={styles['contact__field']}>
                        <label className={styles['contact__label']} htmlFor="message">Категорія:</label>
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required: 'Будь ласка, оберіть тип повідомлення',
                            }}
                            render={({ field, fieldState: { error } }) =>
                                <Space direction="vertical" style={{ width: '100%', gap: '0px', }}>
                                    <Select
                                        placeholder="Оберіть категорію"
                                        {...field}
                                        style={{
                                        width: 400,
                                        padding: '0px',
                                        }}
                                        dropdownStyle={{
                                            width: '257px',
                                            paddingLeft: '0px',
                                            paddingRight: '0px',
                                            borderRadius: '2px',
                                          }}
                                        variant="borderless"
                                        className={styles['contact__select']}
                                        options={CATEGORY_OPTIONS}
                                        onChange={(value) => field.onChange(value)}
                                    />
                                    {error && <p className={styles['contact__error']}>{error.message}</p>}
                                </Space>
                            }
                        />
                    </div>
                    <div className={`${styles['contact__field']} ${styles['contact__field_message']}`}>
                        <label className={styles['contact__label']} htmlFor="message">Повідомлення:</label>
                        <textarea
                            id="message"
                            className={styles['contact__textarea']}
                            placeholder="Ваше повідомлення"
                            {...register('message', {
                                required: 'Обов’язкове поле',
                                pattern: {
                                    value: MESSAGE_PATTERN,
                                    message: 'Повідомлення не може бути коротшим за 10 символів',
                                }
                            })}
                            spellCheck={false}
                            />
                        {errors.message && <p className={styles['contact__error']}>{errors.message.message}</p>}
                    </div>
                    <div className={styles['contact__button_container']}>
                      <button type="submit" className={styles['contact__button_send']}>
                        {loading ? <Spin percent={percent}/> : 'Надіслати'}
                      </button>
                      <button type="button" onClick={handleCancel} className={styles['contact__button_cancel']}>
                        Відмінити
                      </button>
                    </div>
                </form>
            </div>
            {showModal && (
                <div className={styles['modal_feedback']}>
                    <div className={styles['modal_feedback_content']}>
                  <button
                    className={styles['modal_feedback_close']}
                    onClick={closeModal}
                    aria-label="Закрити модальне вікно"
                  >
                    <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/cross-btn.svg`} alt="Close button" />
                  </button>
                        <h2>Повідомлення успішно надіслано!</h2>
                       <div className={styles['contact__button_modal_container']}>
                        <Link to="/">
                            <button type="button" className={styles['contact__button_send']}>
                                На головну
                            </button>
                        </Link>
                        <button type="button" onClick={closeModal} className={styles['contact__button_cancel']}>
                            Закрити
                        </button>
                       </div>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className={styles['modal_feedback']}>
                    <div className={styles['modal_feedback_content']}>
                  <button
                    className={styles['modal_feedback_close']}
                    onClick={closeErrorModal}
                    aria-label="Закрити модальне вікно"
                  >
                    <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/cross-btn.svg`} alt="Close button" />
                  </button>
                        <h2>Щось пішло не так! Будь ласка, спробуйте ще раз</h2>
                       <div className={styles['contact__button_modal_container']}>
                        <Link to="/">
                            <button type="button" className={styles['contact__button_send']}>
                                На головну
                            </button>
                        </Link>
                        <button type="button" onClick={closeErrorModal} className={styles['contact__button_cancel']}>
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
