import avatar_image from "./Avatar.png";
import css from "./Profile.module.css";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Profile(props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onBodyClick = (e) => {
      if (!ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.body.addEventListener("mousedown", onBodyClick);

    return () => {
      document.body.removeEventListener("mousedown", onBodyClick);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css["header-profile-section"]} ref={ref}>
      <img
        className={css["header-profile__avatar"]}
        src={avatar_image}
        alt=""
      />
      <div className={css["header-profile-tab"]}>
        <span className={css["header-profile-tab__text"]} onClick={handleOpen}>
          Профіль
        </span>
        {isOpen && (
          <div className={css["header-profile-dropdown-menu"]}>
            <Link onClick={handleOpen}
              to="/profile/user-info"
              className={css["header-profile-dropdown-menu__text"]}
            >
              Профіль
            </Link>
            <Logout className={css["header-profile-dropdown-menu__text"]}>
              Вихід{" "}
            </Logout>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
