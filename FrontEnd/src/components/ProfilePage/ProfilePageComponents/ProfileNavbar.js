import css from './ProfileNavbar.module.css';
import { Link, useNavigate } from "react-router-dom";

const ProfileNavbar = () => {
    const navigate = useNavigate();

    const GoBackHandler = () => {
        navigate(-1);
    };

    return (
        <div className={css['content']}>
             <button className={css["goback__button"]} type="button" onClick={GoBackHandler}><i className={css["left"]}></i>Назад</button>
             <Link className={css["main-page__button"]} to="/">Головна</Link>
             <i className={css["right"]}></i>
             {/* <Link className={css["profile__button"]} to="/profile">Профіль</Link> */}
             <div className={css["profile__button"]}>Профіль</div>
        </div>
    );
};

export default ProfileNavbar;