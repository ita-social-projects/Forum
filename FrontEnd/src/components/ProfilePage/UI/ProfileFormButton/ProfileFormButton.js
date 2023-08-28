import css from './ProfileFormButton.module.css';

const ProfileFormButton = (props) => {
    return (
        <div className={css['sign-up-footer__buttons']}>
            <button
                form={props.formName}
                className={css['sign-up__button']}
                type='submit'
            >Зберегти зміни</button>
        </div>
    )
};

export default ProfileFormButton;