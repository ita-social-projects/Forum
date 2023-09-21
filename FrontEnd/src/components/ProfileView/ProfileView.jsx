import classes from "./ProfileView.module.css";
import { useLocation } from 'react-router-dom'
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import ProfileMenu from "./ProfileMenu/ProfileMenu";


const ProfileView = () => {
  const location = useLocation()
  const { data } = location.state
  const { category, name, address, logoSrc, photoSrc } = data;

  const isProfileFilled = true;
  return (
    <div>
        {photoSrc ? (
            <img
              className={classes["profile-view-image"]}
              src={photoSrc}
              alt="filled profile"
            />
        ) : (
            <div className={classes["image-placeholder"]}>
                <div className={classes["image-placeholder__rectangle"]}/>
                <div className={classes["profile-view-empty-image"]}>
                    <img src={`${process.env.PUBLIC_URL}/svg/profile-view-image-empty.svg`} alt="empty profile"/>
                </div>
            </div>
        )}
        <div className={classes["profile-view-title__empty"]}>
            <div className={classes["profile-view-title-block__empty"]}>
                <div className={classes["profile-view-title-content__empty"]}>
                    <div className={classes["profile-view__logo"]}>
                        <div className={classes["profile-view__logo-ellipse"]}>
                        <img
                            className={classes["profile-view__logo-image"]}
                            src={logoSrc}
                            alt="company logo"/>
                        </div>
                    </div>
                    <div className={classes["profile-view-company-data-block"]}>
                        <div className={classes["profile-view-company-data-block__services"]}>
                            <div className={classes["profile-view-company-data-block__services-text"]}>Виробник</div>
                        </div>
                        <div className={classes["profile-view-company-data-block__company"]}>
                            <div className={classes["profile-view-company-data-block__company-name"]}>
                                <div className={classes["profile-view-company-data-block__company-name-text"]}>
                                    {name}
                                </div>
                            </div>
                            <div className={classes["profile-view-company-data-block__company-badges"]}>
                                <div className={classes["profile-view-company-data-block__company-badges-count"]}>
                                    <div className={classes["profile-view-company-data-block__company-badge"]}>
                                        <div className={classes["profile-view-company-data-block__badge-text"]}>
                                            {category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes["profile-view-company-data-block__address"]}>
                            <div className={classes["profile-view-company-data-block__address-text"]}>
                                {address}
                            </div>
                        </div>
                    </div>
                    <div className={classes["profile-view__like-button"]}>
                          <div className={classes["profile-view__like-button-text"]}>Додати в збережені</div>
                          <div className={classes["profile-view__like-button-icon"]}>
                              <img src={`${process.env.PUBLIC_URL}/svg/star-icon.svg`} alt="like profile"/>
                          </div>
                    </div>
                </div>
            </div>
        {isProfileFilled ? (
            <div className={classes["profile-view-title__empty"]}>
                <div className={classes["profile-view-title-block__empty"]}>
                    <ProfileNavBar />
                </div>
                <ProfileMenu />
            </div>
        ) : (
            <div className={classes["profile-view-info__empty"]}>
                <div className={classes["profile-view-info-content__empty"]}>
                    <div className={classes["profile-view-info-text__empty"]}>Інформація не заповнена</div>
                </div>
            </div>
        )}
        </div>
    </div>
  );
};

export default ProfileView;
