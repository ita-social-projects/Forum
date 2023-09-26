import './LoginBanner.css';
import Ellipses from "../ellipses/Ellipses";
import { Link } from 'react-router-dom';


const MainLoginBanner = () => {
    return (
        <div className="login-banner-group">
            <div className="login-banner-group__rectangle"/>
            <div className="login-banner-group__content">
                <div className="login-banner-group__content__rectangle"/>
                <img className="login-banner-group__image" src={`${process.env.PUBLIC_URL}/img/lb-img.jpeg`} alt=""/>
                <div className="login-banner-group__content__login-rectangle"/>
                <div className="login-banner-group__content__ellipses">
                    <Ellipses type="white" count={3} />
                    <Ellipses type="white" count={3} />
                    <Ellipses type="white" count={3} />
                    <Ellipses type="white" count={3} />
                    <Ellipses type="white" count={3} />
                    <Ellipses type="white" count={3} />
                </div>
                <div className="login-banner-group__login-section-basic">
                  <div className="login-banner-group__login-section">
                      <div className="login-banner-group__text-section"/>
                      <div className="login-banner-group__login-buttons">
                          <div className="login-banner-group__login-button">
                              <Link className="login-banner-group__login-button-text" to="/login">Увійти</Link>
                          </div>
                          <div className="login-banner-group__register-button">
                              <Link className="login-banner-group__register-button-text" to="/sign-up">Зареєстуватися</Link>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className="login-banner-group__banner-shadow-text">Майданчик для тих, хто втілює свої ідеї в життя.</div>
            <div className="login-banner-group__banner-text">Майданчик для тих, хто втілює свої ідеї в життя.</div>
        </div>
    )
}

export default MainLoginBanner;
