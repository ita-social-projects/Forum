import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';

const LABELS = {
    'phoneNumber': 'Телефон',
    'companyEmail': 'Електронна пошта',
    'companySite': 'Сайт',
    'address': 'Адрес(и)',
    'Facebook': 'Facebook',
    'Instagram': 'Instagram',
    'Tiktok': 'Tiktok',
    'LinkedIn': 'LinkedIn',
    'Youtube': 'Youtube',
};

const ContactsInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const [phoneNumberError, setPhoneNumberError] = useState(null);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const onUpdateField = e => {
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onUpdatePhoneNumberField = e => {
        const receivedPhoneNumber = e.target.value;
        const parsedNumber = Number(receivedPhoneNumber);
        const isInteger = Number.isInteger(parsedNumber);
        if (isInteger) {
            if (receivedPhoneNumber && receivedPhoneNumber.length !== 10) {
                setPhoneNumberError('Номер повинен містити 10 цифр');
            } else {
                setPhoneNumberError(null);
            }
        } else {
            setPhoneNumberError('Номер повинен містити лише цифри');
        }
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const validateForm = () => {
        let isValid = true;
        if (user.phoneNumber && (user.phoneNumber.length !== 10 || !Number.isInteger(Number(user.phoneNumber)))) {
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            props.onUpdate(user);
            // TODO something
        } else {
            // TODO something
        }
    };

    return (
        <div className={css['form__container']}>
            <form id="ContactsInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType="tel"
                            name="phoneNumber"
                            fieldPlaceholder="+38"
                            label={LABELS.phoneNumber}
                            updateHandler={onUpdatePhoneNumberField}
                            requredField={false}
                            value={user.phoneNumber}
                            error={phoneNumberError}
                        />
                        <HalfFormField
                            inputType="text"
                            name="companyEmail"
                            label={LABELS.companyEmail}
                            updateHandler={onUpdateField}
                            requredField={false}
                            value={user.companyEmail}
                        />
                    </div>
                    <FullField
                        name="companySite"
                        label={LABELS.companySite}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.companySite}
                        fieldPlaceholder="Введіть URL"
                    />
                    <FullField
                        name="address"
                        label={LABELS.address}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.address}
                    />
                    <FullField
                        name="Facebook"
                        label={LABELS.Facebook}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.Facebook}
                        fieldPlaceholder="Введіть URL"
                    />
                    <FullField
                        name="Instagram"
                        label={LABELS.Instagram}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.Instagram}
                        fieldPlaceholder="Введіть URL"
                    />
                    <FullField
                        name="Tiktok"
                        label={LABELS.Tiktok}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.Tiktok}
                        fieldPlaceholder="Введіть URL"
                    />
                    <FullField
                        name="LinkedIn"
                        label={LABELS.LinkedIn}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.LinkedIn}
                        fieldPlaceholder="Введіть URL"
                    />
                    <FullField
                        name="Youtube"
                        label={LABELS.Youtube}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.Youtube}
                        fieldPlaceholder="Введіть URL"
                    />
                </div>
            </form>
        </div>
    );
};

export default ContactsInfo;
