import classes from "./ProfileView.module.css";

const ProfileView = () => {
  const isProfileImage = false;
  const isProfileFilled = false;
  return (
    <div>
        {isProfileImage ? (
            <img
              className={classes["profile-view-image"]}
              src={`${process.env.PUBLIC_URL}/companies-images/profile-view-image.jpeg`}
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
        {isProfileFilled ? (
            <div>Profile view in progress...</div>
        ) : (
            <div className={classes["profile-view-title__empty"]}>
                <div className={classes["profile-view-title-block__empty"]}>
                    <div className={classes["profile-view-title-content__empty"]}>
                        <div className={classes["profile-view__logo"]}>
                            <div className={classes["profile-view__logo-ellipse"]}>
                            <img
                                className={classes["profile-view__logo-image"]}
                                src={`${process.env.PUBLIC_URL}/companies-logos/1.png`}
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
                                        Назва Компанії
                                    </div>
                                </div>
                                <div className={classes["profile-view-company-data-block__company-badges"]}>
                                    <div className={classes["profile-view-company-data-block__company-badges-count"]}>
                                        <div className={classes["profile-view-company-data-block__company-badge"]}>
                                            <div className={classes["profile-view-company-data-block__badge-text"]}>
                                                Виноробство
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes["profile-view-company-data-block__address"]}>
                                <div className={classes["profile-view-company-data-block__address-text"]}>
                                    Київська область, Захід Україна
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

                <div className={classes["profile-view-info__empty"]}>
                    <div className={classes["profile-view-info-content__empty"]}>
                      <div className={classes["profile-view-info-text__empty"]}>Інформація не заповнена</div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ProfileView;