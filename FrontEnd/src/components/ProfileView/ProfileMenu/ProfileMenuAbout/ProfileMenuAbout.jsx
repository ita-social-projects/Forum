import classes from "./ProfileMenuAbout.module.css";
import { profileInfo } from "../ProfileText.jsx";

const ProfileMenuAbout = () => {
  return (
      <div id="about-company" className={classes["profile-menu-main__about"]}>
          <div className={classes["profile-menu-main__about-title"]}>
              <div className={classes["profile-menu-main__about-title-block"]}>
                  <div className={classes["profile-menu-main__about-title-text"]}>ПРО КОМПАНІЮ</div>
              </div>
              <div className={classes["profile-menu-divider"]}/>
          </div>
          <div className={classes["profile-menu-main__about-content"]}>
              <div className={classes["profile-menu-main__about-first-text"]}>
                  {profileInfo.sections[0].about1}
                  <span className={classes["profile-menu-more-text"]}>
                        {profileInfo.more}
                  </span>
              </div>
              <div className={classes["profile-menu-main__about-second-text-block"]}>
                  <div className={classes["profile-menu-main__about-second-title"]}>
                      Конкурентна перевага
                  </div>
                  <div className={classes["profile-menu-main__about-second-text"]}>
                      {profileInfo.sections[0].about2}
                      <span className={classes["profile-menu-more-text"]}>
                            {profileInfo.more}
                      </span>
                  </div>
              </div>
              <div className={classes["profile-menu-main__about-second-text-block"]}>
                  <div className={classes["profile-menu-main__about-second-title"]}>
                      Візія, слоган
                  </div>
                  <div className={classes["profile-menu-main__about-third-text"]}>
                      {profileInfo.sections[0].about3}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProfileMenuAbout;
