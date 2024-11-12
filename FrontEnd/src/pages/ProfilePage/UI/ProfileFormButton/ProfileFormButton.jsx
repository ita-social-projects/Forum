import css from './ProfileFormButton.module.css';

const ProfileFormButton = (props) => {
  return (
    <div className={css['sign-up-footer__buttons']}>
      <button
        className={css['sign-up__button']}
        type="submit"
        disabled={props.formIsDirty === false}
      >
        Зберегти зміни
      </button>
    </div>
  );
};

export default ProfileFormButton;
