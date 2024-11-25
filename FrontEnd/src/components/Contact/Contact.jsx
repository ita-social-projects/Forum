import { useState, useEffect, useRef } from 'react';
import { Spin } from 'antd';

import SignUpComponentsPageLayout from '../../pages/SignUp/SignUp/SignUpComponentsPageLayout';
import { ContactFormContent } from './ContactFormContent';
import styles from './Contact.module.css';

const Contact = () => {
    const [percent, setPercent] = useState(-50);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleLoading = (loadingState) => {
        setIsLoading(loadingState);
    };

    return (
        <SignUpComponentsPageLayout
            header={'Зворотній зв\'язок'}
            content={<ContactFormContent onLoading={handleLoading}/>}
            footer={
                <button
                    form="contactForm"
                    className={styles['contact__button_send']}
                    type="submit"
                >
                {isLoading ? <Spin percent={percent}/> : 'Надіслати'}
              </button>
            }
        />
    );
};

export default Contact;
