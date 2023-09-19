import classes from "./ProfileMenuStartup.module.css";
import { profileInfo } from "../ProfileText.jsx";

const ProfileMenuStartupName = () => {
  return (
      <div id="startup" className={classes["profile-menu-startup-block"]}>
          <div className={classes["profile-menu-startup-main"]}>
              <div className={classes["profile-menu-startup-main__title"]}>
                  <div className={classes["profile-menu-startup-main__title"]}>
                      <div className={classes["profile-menu-startup-main__title-block"]}>
                          <div className={classes["profile-menu-startup-main__title-text"]}>
                              Стартап “Назва стартапу”
                          </div>
                      </div>
                      <div className={classes["profile-startup-divider"]}/>
                  </div>
              </div>
              <div className={classes["profile-menu-startup-main__content"]}>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Ідея стартапу</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup1}
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Розмір інвестиції</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup2}
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Ціль співпраці</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup3}
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Кінцевий результат</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup4}
                          <span className={classes["profile-menu-more-text"]}>
                              {profileInfo.more}
                          </span>
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Конкурентна перевага ідеї</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup4}
                          <span className={classes["profile-menu-more-text"]}>
                              {profileInfo.more}
                          </span>
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Ризики</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup4}
                          <span className={classes["profile-menu-more-text"]}>
                              {profileInfo.more}
                          </span>
                      </div>
                  </div>
                  <div className={classes["profile-menu-main__content-block"]}>
                      <div className={classes["profile-menu-main__content-block-title"]}>Пошук партнерів</div>
                      <div className={classes["profile-menu-main__content-block-text"]}>
                          {profileInfo.sections[1].startup5}
                          <span className={classes["profile-menu-more-text"]}>
                              {profileInfo.more}
                          </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProfileMenuStartupName;
