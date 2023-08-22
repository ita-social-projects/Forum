import css from './DeleteProfileModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DeleteProfileModal = (props) => {
    const [typePassword, setTypePassword] = useState("password");
    const [isCorrectEmail, setIsCorrectEmail] = useState(false);
    const [isCorrectPassword, setIsCorrectPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();

    const SubmitHandler = (event) => {
        event.preventDefault();
        props.onCancel();
        // TODO logic of deleting
        navigate('/');
    };

    const EmailChangeHandler = (e) => {
        if (e.target.value === props.user.email) {
            setIsCorrectEmail(true);
        } else {
            setIsCorrectEmail(false);
        }
    };

    const PasswordChangeHandler = (e) => {
        if (e.target.value === props.user.password) {
            setIsCorrectPassword(true);
        } else {
            setIsCorrectPassword(false);
        }
    };

    useEffect (() => {
        if (isCorrectEmail && isCorrectPassword) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [isCorrectEmail, isCorrectPassword]);

    const passwordVisisbilityHandler = () => {
        if (typePassword === "password") {
          setTypePassword("text");
        } else setTypePassword("password");
      };

    return (
        <div>
            <div className={css['delete-header']}>Ви впевнені, що хочете видалити профіль?
            <img  
            src={`${process.env.PUBLIC_URL}/profilepage/Vectorcancel.png`}
            className={css['delete__cancelButton']} 
            alt="" 
            onClick={props.onCancel}/>
            </div>
            <div className={css['delete__description']}>
                <p>Текст, який описує, що профіль буде видалено.</p>
                <p>Також можуть бути перераховані способи відновити профіль.</p>
            </div>
            <form onSubmit={SubmitHandler}>
                <div className={css['form__body']}>
                    <div className={css['fields__label']}><label >Електронна пошта</label></div>
                    <div className={css['fields__field']}>
                        <input
                            type='text'
                            className={css['fields__field--input']}
                            name='email'
                            placeholder='Електронна пошта'
                            onChange={EmailChangeHandler}
                        />
                    </div>
                    <div className={css['fields__label']}><label >Пароль</label></div>
                    <div className={css['fields__field']}>
                        <input
                            id='companyPassword'
                            type={typePassword}
                            className={css['fields__field--input']}
                            name='password'
                            placeholder='Пароль'
                            onChange={PasswordChangeHandler}
                        />
                        <span onClick={passwordVisisbilityHandler}>
                            <img 
                            src={typePassword==='password' 
                            ?
                            `${process.env.PUBLIC_URL}/profilepage/hidden_eye_icon.png`
                            :
                            `${process.env.PUBLIC_URL}/profilepage/eye_icon.png`
                            } 
                            alt='' 
                            className={css['password__eye']}
                            />
                        </span>
                    </div>
                </div>
                <div className={css['buttons__section']}>
                    <button type="button" className={css['button__cancel']} onClick={props.onCancel}>Скасувати</button>
                    <button type="submit" className={isDisabled ? css['button__delete__disabled'] : css['button__delete']} disabled={isDisabled}>Видалити</button>
                </div>
            </form>
        </div>
    );
};

export default DeleteProfileModal;

// src={`${process.env.PUBLIC_URL}/profilepage/Vector.png`}