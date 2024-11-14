import css from './ProfileFormButton.module.css';

const ProfileFormButton = () => {
  return (
    <div className={css['submit-button__conteiner']}>
      <button
        className={css['submit-button']}
        type="submit"
      >
        Зберегти
      </button>
    </div>
  );
};

export default ProfileFormButton;
