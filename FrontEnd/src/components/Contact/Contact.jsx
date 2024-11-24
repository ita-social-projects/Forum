import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spin, Select, Space } from 'antd';

import {
    EMAIL_PATTERN,
    MESSAGE_PATTERN
} from '../../constants/constants';


import styles from './Contact.module.css';

const CATEGORY_OPTIONS = [
    { value: 'Технічне питання', label: 'Технічне питання' },
    { value: 'Рекомендації', label: 'Рекомендації' },
    { value: 'Питання', label: 'Питання' },
    { value: 'Інше', label: 'Інше' },
];

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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
            'message': '',
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
                setModalMessage('Повідомлення успішно надіслано!');
                reset();
            }
        } catch (error) {
            setModalMessage('Щось пішло не так! Будь ласка, спробуйте ще раз!');
        } finally {
            setLoading(false);
        }
    };
    const closeModal = () => {
        setModalMessage('');
    };

    return (
        <div className={styles['contact_container']}>
            <div className={styles['contact__text_container']}>
                <h2 className={styles['contact__title']}>Зворотній зв&apos;язок</h2>
                <h4 className={styles['contact__info']}><a className={styles['contact__red__star']}>*</a> Обов&apos;язкові поля позначені зірочкою</h4>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className={styles['contact__form']}>
                    <div className={styles['contact__field']}>
                        <label className={styles['contact__label']} htmlFor="email"><a className={styles['contact__red__star']}>*</a>   Електронна пошта:</label>
                        <input className={styles['contact__input']}
                            id="email"
                            type="email"
                            placeholder="Введіть свою електронну пошту"
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
                        <label className={styles['contact__label']} htmlFor="message"><a className={styles['contact__red__star']}>*</a> Категорія:</label>
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required: 'Будь ласка, оберіть тип повідомлення',
                            }}
                            render={({ field, fieldState: { error } }) =>
                                <Space direction="vertical" style={{ width: '100%', gap: '0px', }}>
                                  <Select
                                      placeholder="Оберіть"
                                      {...field}
                                      style={{
                                          width: '100%',
                                          padding: 0,
                                      }}
                                      dropdownStyle={{
                                          width: 257,
                                          paddingLeft: 0,
                                          paddingRight: 0,
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
                    <div className={`${styles['contact__field_textarea']}`}>
                        <label className={styles['contact__label']} htmlFor="message"><a className={styles['contact__red__star']}>*</a> Повідомлення:</label>
                        <textarea
                            id="message"
                            className={styles['contact__textarea']}
                            placeholder="Введіть ваше повідомлення"
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
                    </div>
                    <div className={styles['contact__button_container']}>
                      <button type="submit" className={styles['contact__button_send']}>
                        {loading ? <Spin percent={percent}/> : 'Надіслати'}
                      </button>
                </div>
                </form>

            </div>
            {modalMessage && (
                <div className={styles['modal_feedback']}>
                    <div className={styles['modal_feedback_content']}>
                  <button
                    className={styles['modal_feedback_close']}
                    onClick={closeModal}
                    aria-label="Закрити модальне вікно"
                  >
                    <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/cross-btn.svg`} alt="Close button" />
                  </button>

                        <h2 className={styles['modal_feedback__title']}>{modalMessage}</h2>
                        <h2 className={styles['modal_feedback__info']}>Ваше повідомлення буде опрацьовано</h2>
                       <div className={styles['contact__button_modal_container']}>
                        <Link to="/">
                            <button type="button" className={styles['contact__button_modal_send']}>
                                На головну
                            </button>
                        </Link>
                       </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
