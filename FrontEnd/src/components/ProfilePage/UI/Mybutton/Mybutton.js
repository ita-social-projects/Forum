import css from './Mybutton.module.css';

const Mybutton = (props) => {
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

export default Mybutton;