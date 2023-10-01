import avatar_image from "./Avatar.png";
import css from "./Profile.module.css";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import DropdownMenu from "./DropdownMenu";

function Profile() {
  return (
    <div className={css["header-profile-section"]}>
      <img
        className={css["header-profile__avatar"]}
        src={avatar_image}
        alt=""
      />
      <DropdownMenu toggleText="Профіль">
        <Link to="/profile/user-info">Профіль</Link>
        <Logout />
      </DropdownMenu>
    </div>
  );
}

export default Profile;
