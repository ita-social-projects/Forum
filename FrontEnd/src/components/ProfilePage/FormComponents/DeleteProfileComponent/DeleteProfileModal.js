import axios from 'axios';
import css from './DeleteProfileModal.module.css';
import { useAuth } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';


const DeleteProfileModal = (props) => {
    const { auth, user } = useAuth();
    const [typePassword, setTypePassword] = useState('password');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [isCorrectEmail, setIsCorrectEmail] = useState(true);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if (user.email === inputEmail) {
            setIsCorrectEmail(true);
            axios.delete(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                data: {password: inputPassword}
            })
                .then(response => {
                    console.log(response.data);
                    props.onCancel();

                    axios.post(
                        `${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`
                    );
                    auth.logout();
                    navigate('/');
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setIsCorrectEmail(false);
        }
    };

    const passwordChangeHandler = (e) => {
        setInputPassword(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setInputEmail(e.target.value);
    };

    const passwordVisisbilityHandler = () => {
        if (typePassword === 'password') {
            setTypePassword('text');
        } else setTypePassword('password');
    };

    return (
        <div>
            <div className={css['delete-header']}>Ви впевнені, що хочете видалити профіль?
            <img
            src={`${process.env.REACT_APP_PUBLIC_URL}/profilepage/Vectorcancel.png`}
            className={css['delete__cancelButton']}
            alt=""
            onClick={props.onCancel}/>
            </div>
            <div >
                <div className={css['delete__description']}>Цей профіль буде видалено.
                    Для того, щоб підтвердити видалення, будь-ласка, введіть вашу почту та пароль</div>
            </div>
            <form onSubmit={submitHandler}>
                <div className={css['form__body']}>
                    <div className={css['fields__label--text']}><label>Електронна пошта</label></div>
                    <div className={css['fields__field']}>
                        <input
                            type="text"
                            className={css['fields__field--input']}
                            name="email"
                            placeholder="Електронна пошта"
                            onChange={emailChangeHandler}
                            onKeyDown={preventEnterSubmit}
                        />
                    </div>
                    {(!isCorrectEmail) &&
                        <div className={css['error-message']}>
                            Некоректна пошта
                        </div>
                    }
                    <div className={css['fields__label--text']}><label >Пароль</label></div>
                    <div className={css['fields__field']}>
                        <input
                            id="companyPassword"
                            type={typePassword}
                            className={css['fields__field--input']}
                            name="password"
                            placeholder="Пароль"
                            onChange={passwordChangeHandler}
                            onKeyDown={preventEnterSubmit}
                        />
                        <span onClick={passwordVisisbilityHandler}>
                            <img
                            src={typePassword==='password'
                            ?
                            `${process.env.REACT_APP_PUBLIC_URL}/profilepage/hidden_eye_icon.png`
                            :
                            `${process.env.REACT_APP_PUBLIC_URL}/profilepage/eye_icon.png`
                            }
                            alt=""
                            className={css['password__eye']}
                            />
                        </span>
                    </div>
                </div>
                <div className={css['buttons__section']}>
                    <button type="button" className={css['button__cancel']} onClick={props.onCancel}>Скасувати</button>
                    <button type="submit" className={css['button__delete']}>Видалити</button>
                </div>
            </form>
        </div>
    );
};

export default DeleteProfileModal;
