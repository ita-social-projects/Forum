import classes from './WarnUnsavedDataModal.module.css';

const WarnUnsavedDataModal = ({ onCancel, onConfirm }) => {

    return (
        <div className={classes['modal']}>
            <div className={classes['modal-header']}>
                <p className={classes['modal-header--text']}>
                    Збереження введених даних
                </p>
                <button onClick={onCancel} className={classes['modal-header--close-icon']}>
                    <img src={`${process.env.REACT_APP_PUBLIC_URL}/svg/cross-btn.svg`} alt="Cancel button" />
                </button>
            </div>
            <div className={classes['modal-content']}>
                <p className={classes['modal-content--text']}>
                    Введені дані не є збережені. При переході на іншу сторінку вони будуть втрачені. Перейти на іншу сторінку?
                </p>
            </div>
            <div className={classes['modal-footer']}>
                <div className={classes['modal-footer--buttons-wrapper']}>
                    <button onClick={onConfirm} className={`${classes['modal-footer--button']} ${classes['modal-footer--button-continue']}`}>
                        Продовжити
                    </button>
                    <button onClick={onCancel} className={`${classes['modal-footer--button']} ${classes['modal-footer--button-cancel']}`}>
                        Скасувати
                    </button>
                </div>
            </div>

        </div>
    );
};

export default WarnUnsavedDataModal;