import classes from "./ProfileMenu.module.css";
import ProfileMenuAbout from "./ProfileMenuAbout/ProfileMenuAbout";
import ProfileMenuStartupName from "./ProfileMenuStartup/ProfileMenuStartup";
import ProfileMenuServices from "./ProfileMenuServices/ProfileMenuServices";
import ProfileMenuLogistics from "./ProfileMenuLogistics/ProfileMenuLogistics";
import ProfileMenuCooperation from "./ProfileMenuCooperation/ProfileMenuCooperation";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const ProfileMenu = () => {
  return (
      <div className={classes["profile-menu-main-block"]}>
          <div className={classes["profile-menu-main"]}>
              <ProfileMenuAbout />
              <ProfileMenuStartupName />
              <ProfileMenuServices />
              <ProfileMenuLogistics />
              <ProfileMenuCooperation />
          </div>
          <ProfileInfo />
      </div>
  );
};

export default ProfileMenu;
