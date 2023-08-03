import './Banner.css';
import Ellipses from "../ellipses/Ellipses";


const MainBanner = () => {
    return (
        <div className="main-banner-group">
            <div className="main-banner-group__main-rectangle"/>
            <div className="main-banner-group__white-rectangle">
                <div className="main-banner-group__green-ellipses">
                    <Ellipses type="green" count={7} />
                    <Ellipses type="green" count={7} />
                    <Ellipses type="green" count={7} />
                    <Ellipses type="green" count={7} />
                    <Ellipses type="green" count={7} />
                    <Ellipses type="green" count={7} />
                </div>
            </div>
            <div className="main-banner-group__frame-rectangle9"/>
            <div className="main-banner-group__frame-rectangle10"/>
            <div className="main-banner-group__frame-rectangle11"/>
            <div className="main-banner-group__frame-rectangle12"/>
            <div className="main-banner-group__frame-rectangle13"/>
            <div className="main-banner-group__frame-description">
                <div className="main-banner-group__banner-text">Це унікальний майданчик <br/>для обміну інформацією і досвідом з тими, хто втілює свої ідеї в життя.</div>
                <div className="main-banner-group__frame-login">
                    <div className="main-banner-group__login-button">
                        <div className="main-banner-group__login-button-text">Увійти</div>
                    </div>
                    <div className="main-banner-group__register-button">
                        <div className="main-banner-group__register-button-text">Зареєстуватися</div>
                    </div>
                </div>
            </div>
            <div className="main-banner-group__white-ellipses">
                <Ellipses type="white" count={7} />
                <Ellipses type="white" count={7} />
                <Ellipses type="white" count={7} />
                <Ellipses type="white" count={7} />
                <Ellipses type="white" count={7} />
                <Ellipses type="white" count={7} />
            </div>
            <img className="main-banner-group__banner-image1" src={`${process.env.PUBLIC_URL}/img/banner-img1.jpeg`} alt=""/>
            <img className="main-banner-group__banner-image2" src={`${process.env.PUBLIC_URL}/img/banner-img2.jpeg`} alt=""/>
            <img className="main-banner-group__banner-image3" src={`${process.env.PUBLIC_URL}/img/banner-img3.jpeg`} alt=""/>
          <div className="main-banner-wine">
            <div className="main-banner-group__frame">
              <div className="main-banner-wine__winemaking">
                <div className="winemaking">
                    <img src={`${process.env.PUBLIC_URL}/svg/winemaking.svg`} alt=""/>
                </div>
              </div>
              <div className="main-banner-group__content">
                <div className="main-banner-group__banner-item-text">Виноробство</div>
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
                <img src={`${process.env.PUBLIC_URL}/svg/cheese.svg`} alt=""/>
              </div>
          </div>
          <div className="main-banner-delivery">
            <div className="main-banner-group__frame">
              <div className="main-banner-delivery__delivery">
                <div className="delivery">
                  <img src={`${process.env.PUBLIC_URL}/svg/delivery.svg`} alt=""/>
                </div>
              </div>
              <div className="main-banner-group__content">
                <div className="main-banner-group__banner-item-text">Доставка</div>
                <div className="main-banner-group__banner-item-counter">14+</div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MainBanner;