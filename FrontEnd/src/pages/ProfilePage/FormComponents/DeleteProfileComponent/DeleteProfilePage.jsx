import css from './DeleteProfilePage.module.css';
import DeleteProfileModal from './DeleteProfileModal';
import MyModal from '../../UI/MyModal/MyModal';
import { useState } from 'react';

const DeleteProfilePage = () => {
  const [modal, setModal] = useState(false);

  const cancelHandler = () => {
    setModal(false);
  };
  return (
    <div className={css['button__delete-main']}>
      <button className={css['button__delete']} onClick={() => setModal(true)}>
        Видалити профіль
      </button>
      <MyModal visible={modal}>
        <DeleteProfileModal onCancel={cancelHandler} />
      </MyModal>
    </div>
  );
};

export default DeleteProfilePage;
