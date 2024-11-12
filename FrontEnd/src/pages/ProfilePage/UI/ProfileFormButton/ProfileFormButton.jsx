import css from './ProfileFormButton.module.css';

const ProfileFormButton = (props) => {
  return (
    <div className={css['submit-button__conteiner']}>
      <button
        className={css['submit-button']}
        type="submit"
        disabled={props.formIsDirty === false}
      >
        Зберегти
      </button>
    </div>
  );
};

export default ProfileFormButton;
