import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';
import TextField from './FormFields/TextField';

const LABELS = {
    'product_info': 'Товари',
    'service_info': 'Послуги',
};

const TEXT_AREA_MAX_LENGTH = 1000;

const ProductServiceInfo = (props) => {
    const [profile, setProfile] = useState(props.profile);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdate(profile);
    };

    return (
        <div className={css['form__container']}>
            <form id="ProductServiceInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className={css['fields']}>
                    <TextField
                        name="product_info"
                        label={LABELS.product_info}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={profile.product_info ?? ''}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name="service_info"
                        label={LABELS.service_info}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={profile.service_info ?? ''}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductServiceInfo;
