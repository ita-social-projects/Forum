import { useState, useContext } from 'react';
import css from './AccordionItem.module.css';
import { DirtyFormContext } from '../../../context/DirtyFormContext';

const AccordionItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { formIsDirty } = useContext(DirtyFormContext);

    const toggle = () => {
        if (!props.disabled) {
            formIsDirty ? props.warningHandler() : setIsOpen(!isOpen);
        }
    };

    return (
        <div className={css['accordion-item']}>
            <button className={`${css['accordion-button']} ${props.disabled ? css['disabled'] : ''}`}
                    onClick={toggle}>
                <p className={props.title === 'Видалити профіль' ? css['danger'] : ''}>
                    {props.title}
                </p>
               {!props.disabled && <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/arrow-${isOpen ? 'up' : 'down'}.svg`}></img>}
            </button>
            <div className={css['divider']}></div>
            <div className={`${css['accordion-content']} ${isOpen ? '' : css['close']}`}>
                {props.content}
            </div>
        </div>
    );
};

export default AccordionItem;