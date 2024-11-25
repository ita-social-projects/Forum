import { useContext } from 'react';
import { DirtyFormContext } from '../../../../context/DirtyFormContext';

import css from './ProfileFormButton.module.css';

const ProfileFormButton = () => {
  const { formIsDirty } = useContext(DirtyFormContext);
  return (
    <div className={css['submit-button__conteiner']}>
      <button
        className={css['submit-button']}
        type="submit"
        disabled={!formIsDirty}
      >
        Зберегти
      </button>
    </div>
  );
};

export default ProfileFormButton;
