import css from './DeleteModal.module.css';

function DeleteModal({active, setActive}) {

    const onDeleteClick = () => {
        console.log('Delete');
    };

    return !active ? null : (
        <div
            className={`${css['modal-cover']} ${active && css['active']}`}
            onClick={() => setActive(false)}
        >
            <div className={css['modal-content']}>
                <p className={css['cookie-text']}>
                    Впевнені, що хочете видалити цей запис?
                </p>
                <button className={css['green-button']}>
                    Скасувати
                </button>
                <button className={css['red-button']} onClick={onDeleteClick}>
                    Видалити
                </button>
            </div>
        </div>
    );
}

export default DeleteModal;
