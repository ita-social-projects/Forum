import './Banner.css';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const MainBanner = (props) => {
  return (
    <div className="main-banner-group">
      <div className="main-banner-group__main-rectangle" />
      <div className="main-banner-group__white-rectangle">
        <img className="main-banner-group__green-dots"
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6.png`}
          alt="dots_7x6.png" />
      </div>
      <div className="main-banner-group__frame-rectangle9" />
      <div className="main-banner-group__frame-rectangle10" />
      <div className="main-banner-group__frame-rectangle11" />
      <div className="main-banner-group__frame-rectangle12" />
      <div className="main-banner-group__frame-rectangle13" />
      <div className="main-banner-group__frame-description">
        <h2 className="main-banner-group__banner-text">
          CRAFTMERGE - обʼєднуємо<br />
          крафтових виробників та <br />
          інноваторів
        </h2>
        {!props.isAuthorized ? (
          <div className="main-banner-group__frame-login">
            <div className="main-banner-group__login-button">
              <Link
                className="main-banner-group__login-button-text"
                to="/login"
              >
                Увійти
              </Link>
            </div>
            <div className="main-banner-group__register-button">
              <Link
                className="main-banner-group__register-button-text"
                to="/sign-up"
              >
                Зареєстуватися
              </Link>
            </div>
          </div>
        ) : null}
      </div>
        <img className="main-banner-group__white-dots"
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_7x6W.png`}
          alt="dots_7x6W.png" />
      <img
        className="main-banner-group__banner-image1"
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/banner-img1.jpeg`}
        alt="banner-img"
      />
      <img
        className="main-banner-group__banner-image2"
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/banner-img2.jpeg`}
        alt="banner-img"
      />
      <img
        className="main-banner-group__banner-image3"
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/banner-img3.jpeg`}
        alt="banner-img"
      />
      <div className="main-banner-wine">
        <div className="main-banner-group__frame">
          <div className="main-banner-wine__winemaking">
            <div className="winemaking">
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/svg/winemaking.svg`}
                alt="winemaking"
                width="16"
                height="18"
              />
            </div>
          </div>
          <div className="main-banner-group__content">
            <div className="main-banner-group__banner-item-text">
              Виноробство
            </div>
            <div className="main-banner-group__banner-item-counter">146+</div>
          </div>
        </div>
      </div>
      <div className="main-banner-cheese">
        <div className="banner-cheese">
          <div className="main-banner-group__banner-item-text">Сироварня</div>
          <div className="main-banner-group__banner-item-counter">56+</div>
        </div>
      </div>
      <div className="main-banner-cheese__cheese">
        <div className="cheese">
          <img
            src={`${process.env.REACT_APP_PUBLIC_URL}/svg/cheese.svg`}
            alt="cheese"
            width="20"
            height="20"
          />
        </div>
      </div>
      <div className="main-banner-delivery">
        <div className="main-banner-group__frame">
          <div className="main-banner-delivery__delivery">
            <div className="delivery">
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/svg/delivery.svg`}
                alt="delivery"
                width="20"
                height="20"
              />
            </div>
          </div>
          <div className="main-banner-group__content">
            <div className="main-banner-group__banner-item-text">Доставка</div>
            <div className="main-banner-group__banner-item-counter">14+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

MainBanner.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};
