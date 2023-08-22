import css from "./Profile.module.css";
import avatar_image from "./Avatar.png";
import { Link } from 'react-router-dom';

function Profile(props) {
    return (
        <div className={css["header-profile-section"]}>
            <img className={css["header-profile__avatar"]} src={avatar_image} alt=""/>
            <div className={css["header-profile-tab"]}>
                {/* <a className={css["header-profile-link__text"]} href="profile">Профіль</a> */}
                <Link to='/profile' className={css["header-profile-link__text"]}>Профіль</Link>
            </div>
        </div>
    );
};

export default Profile;
