import classes from "./ProfileMenuCooperation.module.css";
import { profileInfo } from "../ProfileText.jsx";

const ProfileMenuCooperation = () => {
  return (
      <div id="cooperation" className={classes["profile-menu-cooperation-block"]}>
          <div className={classes["profile-menu-cooperation"]}>
              <div className={classes["profile-menu-cooperation__title"]}>
                  <div className={classes["profile-menu-cooperation__title-text"]}>
                      Формат співпраці
                  </div>
              </div>
              <div className={classes["profile-cooperation-divider"]}/>
          </div>
          <div className={classes["profile-menu-cooperation__content"]}>
              <div className={classes["profile-menu-cooperation__content-text"]}>
                      {profileInfo.sections[2].services1}
              </div>
          </div>
      </div>
  );
};

export default ProfileMenuCooperation;
