import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';
import TextField from './FormFields/TextField';

const LABELS = {
    'productInfo': 'Товари',
    'serviceInfo': 'Послуги',
    'logisticProductService': 'Логістика товарів/ послуг',
    'cooperationFormat': 'Формат співпраці',
    'competitiveAdvantage': 'Конкурентна перевага',
};

const ProductServiceInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const maxLength = 1000;

    useEffect(() => {
        props.CurrentFormNameHandler('ProductServiceInfo');
    }, []);

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= maxLength)
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdate(user);
        // TODO something
    };

    return (
        <div className={css['form__container']}>
            <form id='ProductServiceInfo' onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <TextField
                        name='productInfo'
                        label={LABELS.productInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.productInfo}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='serviceInfo'
                        label={LABELS.serviceInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.serviceInfo}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='logisticProductService'
                        label={LABELS.logisticProductService}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.logisticProductService}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='cooperationFormat'
                        label={LABELS.cooperationFormat}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.cooperationFormat}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='competitiveAdvantage'
                        label={LABELS.competitiveAdvantage}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.competitiveAdvantage}
                        maxLength={maxLength}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductServiceInfo;