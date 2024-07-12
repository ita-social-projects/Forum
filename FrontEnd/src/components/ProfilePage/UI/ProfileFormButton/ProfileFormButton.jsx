import css from './ProfileFormButton.module.css';

const ProfileFormButton = (props) => {
  console.log('PROPS', props.formState);
  return (
    <div className={css['sign-up-footer__buttons']}>
      <button
        form={props.formName}
        className={css['sign-up__button']}
        type="submit"
        disabled={props.formState === false}
      >
        Зберегти зміни
      </button>
    </div>
  );
};

export default ProfileFormButton;
