import classes from "./ProfileMenuLogistics.module.css";
import { profileInfo } from "../ProfileText.jsx";

const ProfileMenuLogistics = () => {
  return (
      <div id="logistics" className={classes["profile-menu-logistics-block"]}>
          <div className={classes["profile-menu-logistics"]}>
              <div className={classes["profile-menu-logistics__title"]}>
                  <div className={classes["profile-menu-logistics__title-text"]}>
                      Логістика товарів / послуг
                  </div>
              </div>
              <div className={classes["profile-logistics-divider"]}/>
          </div>
          <div className={classes["profile-menu-logistics__content"]}>
              <div className={classes["profile-menu-logistics__content-text"]}>
                      {profileInfo.sections[2].services1}
              </div>
          </div>
      </div>
  );
};

export default ProfileMenuLogistics;
