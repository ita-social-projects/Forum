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

const TEXT_AREA_MAX_LENGTH = 1000;

const ProductServiceInfo = (props) => {
    const [user, setUser] = useState(props.user);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
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
            <form id="ProductServiceInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className={css['fields']}>
                    <TextField
                        name="productInfo"
                        label={LABELS.productInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.productInfo}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name="serviceInfo"
                        label={LABELS.serviceInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.serviceInfo}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name="logisticProductService"
                        label={LABELS.logisticProductService}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.logisticProductService}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name="cooperationFormat"
                        label={LABELS.cooperationFormat}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.cooperationFormat}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name="competitiveAdvantage"
                        label={LABELS.competitiveAdvantage}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.competitiveAdvantage}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductServiceInfo;
