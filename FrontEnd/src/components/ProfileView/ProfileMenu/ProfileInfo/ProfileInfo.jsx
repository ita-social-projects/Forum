import classes from "./ProfileInfo.module.css";

const dataItems = [
    {
        title: "Рік заснування",
        text: "2016",
    },
    {
        title: "Розмір компанії",
        text: "250 працівників",
    },
    {
        title: "Аудит",
        text: "Назва аудиту",
    },
];

const ProfileInfo = ({ dataItems }) => {

  return (
      <div className={classes["profile-info-block"]}>
          <div className={classes["profile-info-block__main"]}>
              <div className={classes["profile-info-block__main-content"]}>
                  <div className={classes["profile-info-block__main-content-data"]}>
                      <div className={classes["profile-info-block__main-content-bold-title"]}>ЄДРПОУ</div>
                      <div className={classes["profile-info-block__main-content-text"]}>11223344</div>
                  </div>
                  <div>
                      {dataItems.map((item, index) => (
                          <div key={index} className={classes["profile-info-block__main-content-data"]}>
                              <div className={classes["profile-info-block__main-content-title"]}>
                                  {item.title}
                              </div>
                              <div className={classes["profile-info-block__main-content-text"]}>
                                  {item.text}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
              <div className={classes["profile-info-block__main-content"]}>
                  <div className={classes["profile-info-block__main-content-data2"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Сайт</div>
                      <div className={classes["profile-info-block__main-content-url"]}>stakhovskywines.com</div>
                  </div>
                  <div className={classes["profile-info-block__main-content-data"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Телефон</div>
                      <div className={classes["profile-info-block__main-content-text"]}>201232323236</div>
                      <div className={classes["profile-info__button"]}>
                          <div className={classes["profile-info__button-text"]}>Показати телефон</div>
                      </div>
                  </div>
                  <div className={classes["profile-info-block__main-content-data"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Електронна пошта</div>
                      <div className={classes["profile-info-block__main-content-text"]}>2232323232323</div>
                      <div className={classes["profile-info__button"]}>
                          <div className={classes["profile-info__button-text"]}>Показати ел. пошту</div>
                      </div>
                  </div>
                  <div className={classes["profile-info-block__main-content-data2"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Адрес(и)</div>
                      <div className={classes["profile-info-block__main-content-text"]}>
                          Офіс:
                          90260, Україна, Закарпатська обл.,
                          Берегівський р-н,с. Мужієво,
                      </div>
                  </div>
                  <div className={classes["profile-info-block__main-content-data2"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Соціальні мережі</div>
                      <div className={classes["profile-info-block__main-content-icons"]}>
                          <img src={`${process.env.PUBLIC_URL}/svg/facebook.svg`} alt="facebook"/>
                          <img src={`${process.env.PUBLIC_URL}/svg/instagram.svg`} alt="instagram"/>
                      </div>
                  </div>
                  <div className={classes["profile-info-block__main-content-data"]}>
                      <div className={classes["profile-info-block__main-content-title"]}>Співпрацюємо з </div>
                      <div className={classes["profile-info-block__main-content-text"]}>Сільпо, Rozetka, Бюро Вин</div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default ProfileInfo;
