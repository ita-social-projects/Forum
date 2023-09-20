import css from './DeleteProfilePage.module.css';
import DeleteProfileModal from './DeleteProfileModal';
import MyModal from '../../UI/MyModal/MyModal';
import { useState, useEffect } from 'react';

const DeleteProfilePage = (props) => {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);
    
    const cancelHandler = () => {
        setModal(false);
    };
    return (
        <div>
            <div className={css['text__for__delete']}>Видалити акаунт</div>
            <button className={css['button__delete']}  onClick={() => setModal(true)} style={{marginBottom: 400}}>Видалити</button>
            <MyModal visible={modal} setVisisble={setModal}>
                <DeleteProfileModal onCancel={cancelHandler} user={props.user}/>
            </MyModal>
        </div>
    );
};

export default DeleteProfilePage;
