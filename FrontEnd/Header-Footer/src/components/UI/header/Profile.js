import css from "./Profile.module.css"
import avatar_image from "./Avatar.png"

function Profile(props) {
    return (
        <div className={css["header-profile-section"]}>
            <img className={css["header-profile-avatar"]} src={avatar_image} alt=""/>
            <div className={css["header-profile-tab"]}>
                <a href="profile">Профіль</a>
            </div>
        </div>
    );
};

export default Profile;
