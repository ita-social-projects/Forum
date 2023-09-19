import classes from "./ProfileMenuServices.module.css";
import { profileInfo } from "../ProfileText.jsx";

const ProfileMenuServices = () => {
  return (
      <div id="goods-services" className={classes["profile-menu-services-block"]}>
          <div className={classes["profile-menu-services"]}>
              <div className={classes["profile-menu-services__title"]}>
                  <div className={classes["profile-menu-services__title-text"]}>
                      Товари / послуги
                  </div>
              </div>
              <div className={classes["profile-services-divider"]}/>
          </div>
          <div className={classes["profile-menu-services__content-block"]}>
              <div className={classes["profile-menu-services__content"]}>
                  <div className={classes["profile-menu-services__content-title"]}>Товари</div>
                  <div className={classes["profile-menu-services__content-text"]}>
                      {profileInfo.sections[2].services1}
                  </div>
              </div>
              <div className={classes["profile-menu-services__content"]}>
                  <div className={classes["profile-menu-services__content-title"]}>Послуги</div>
                  <div className={classes["profile-menu-services__content-text"]}>
                      {profileInfo.sections[1].startup3}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProfileMenuServices;
