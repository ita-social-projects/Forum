import css from './DeleteProfilePage.module.css';
import DeleteProfileModal from './DeleteProfileModal';
import MyModal from '../../UI/MyModal/MyModal';
import { useState, useEffect } from 'react';

const DeleteProfilePage = (props) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        props.CurrentFormNameHandler('Delete');
    }, []);

    const CancelHandler = () => {
        setModal(false);
    };
    return (
        <div>
            <div className={css['text__for__delete']}>Видалити акаунт</div>
            <button className={css['button__delete']}  onClick={() => setModal(true)}>Видалити</button>
            <MyModal visible={modal} setVisisble={setModal}>
                <DeleteProfileModal onCancel={CancelHandler} user={props.user}/>
            </MyModal>
        </div>
    );
};

export default DeleteProfilePage;