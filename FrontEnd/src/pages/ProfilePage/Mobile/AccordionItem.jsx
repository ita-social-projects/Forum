import { useState } from 'react';
import css from './AccordionItem.module.css';

const AccordionItem = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={css['accordion-item']} key={props.index} >
            <button className={css['accordion-button']} onClick={() => toggle()}>
                <p className={props.title ==='Видалити профіль' ? css['danger'] : ''}>{props.title}</p><img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/arrow-${isOpen ? 'up' : 'down'}.svg`}></img>
            </button>
            <div className={css['divider']}></div>
            <div className={`${css['accordion-content']} ${isOpen ? '' : css['close']}`}>
                {props.content}
            </div>
        </div>
    );
};

export default AccordionItem;