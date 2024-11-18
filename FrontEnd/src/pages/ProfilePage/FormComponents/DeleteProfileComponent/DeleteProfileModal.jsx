import axios from 'axios';
import css from './DeleteProfileModal.module.css';
import { useAuth } from '../../../../hooks';
import { useState } from 'react';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';

const DeleteProfileModal = (props) => {
  const { logout, user } = useAuth();
  const [typePassword, setTypePassword] = useState('password');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    if (user.email === inputEmail) {
      setIsCorrectEmail(true);
      axios
        .delete(
          `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`,
          {
            data: { password: inputPassword },
          }
        )
        .then(() => {
          props.onCancel();
          logout();
        })
        .catch((error) => {
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
      <div className={css['delete-header']}>
        <h4>Ви впевнені, що хочете видалити профіль?</h4>
      </div>
      <div className={css['delete__description']}>
        <p>Це призведе до остаточного видалення всіх ваших даних про компанію чи стартап й також включно з списком сподобаних профілів.</p>
        <p>Для видалення вашого профілю введіть вашу електронну пошту та пароль.</p>
        <strong>Ця дія не може бути відміненою!</strong>
      </div>
      <form onSubmit={submitHandler}>
        <div className={css['form__body']}>
          <div>
            <div className={css['fields__label--text']}>
              <label htmlFor="email_for_delete">Електронна пошта</label>
            </div>
            <div className={css['fields__field']}>
              <input
                id="email_for_delete"
                type="text"
                className={css['fields__field--input']}
                name="email"
                onChange={emailChangeHandler}
                onKeyDown={preventEnterSubmit}
                autoComplete="off"
              />
            </div>
            {!isCorrectEmail && (
              <div className={css['error-message']}>Некоректна пошта</div>
            )}
          </div>
          <div>
            <div className={css['fields__label--text']}>
              <label htmlFor="companyPassword">Пароль</label>
            </div>
            <div className={css['fields__field']}>
              <input
                id="companyPassword"
                type={typePassword}
                className={css['fields__field--input']}
                name="password"
                onChange={passwordChangeHandler}
                onKeyDown={preventEnterSubmit}
                autoComplete="off"
              />
              <span onClick={passwordVisisbilityHandler}>
                <img
                  src={
                    typePassword === 'password'
                      ? `${process.env.REACT_APP_PUBLIC_URL}/profilepage/hidden_eye_icon.png`
                      : `${process.env.REACT_APP_PUBLIC_URL}/profilepage/eye_icon.png`
                  }
                  alt=""
                  className={css['password__eye']}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={css['buttons__section']}>
          <button type="submit" className={css['button__delete']}>
            Видалити профіль
          </button>
          <button
            type="button"
            className={css['button__cancel']}
            onClick={props.onCancel}
          >
            Скасувати
          </button>
        </div>
      </form>
    </div >
  );
};

export default DeleteProfileModal;
