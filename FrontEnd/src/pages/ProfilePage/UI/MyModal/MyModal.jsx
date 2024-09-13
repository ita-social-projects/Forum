import css from './MyModal.module.css';

const MyModal = ({children, visible}) => {
    const rootClasses = [css['myModal']];
    if (visible) {
        rootClasses.push(css['active']);
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={css['myModal__content']} onClick={(event) => event.stopPropagation()}>{children}</div>
        </div>
    );
};

export default MyModal;
