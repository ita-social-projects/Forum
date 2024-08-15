import './LoginBanner.css';
import { Link } from 'react-router-dom';

const MainLoginBanner = () => {
  return (
    <div className="login-banner-group">
      <div className="login-banner-group__rectangle" />
      <div className="login-banner-group__content">
        <div className="login-banner-group__content__rectangle" />
        <img
          className="login-banner-group__image"
          src={`${process.env.REACT_APP_PUBLIC_URL}/img/lb-img.jpeg`}
          alt=""
        />
        <div className="login-banner-group__content__login-rectangle" />
        <img className="login-banner-group__content__dots"
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_3x5W.png`}
        alt="dots_3x5W.png" />
        <div className="login-banner-group__login-section-basic">
          <div className="login-banner-group__login-section">
            <div className="login-banner-group__text-section" />
            <div className="login-banner-group__login-buttons">
              <div className="login-banner-group__login-button">
                <Link
                  className="login-banner-group__login-button-text"
                  to="/login"
                >
                  Увійти
                </Link>
              </div>
              <div className="login-banner-group__register-button">
                <Link
                  className="login-banner-group__register-button-text"
                  to="/sign-up"
                >
                  Зареєстуватися
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="login-banner-group__banner-shadow-text">
        Майданчик для тих, хто втілює свої ідеї в життя.
      </div>
      <div className="login-banner-group__banner-text">
        Майданчик для тих, хто втілює свої ідеї в життя.
      </div>
    </div>
  );
};

export default MainLoginBanner;
