import './Partners.css';

const MainPartners = () => {
    return (
        <div className="partners-section">
          <div className="partners-section__header">
              <div className="partners-section__header-text">партнери</div>
              <div className="partners-section__navi-icons">
                  <div className="partners-section__navi-icon">
                      <div className="partners-section__icon">
                          <img src="/svg/icon-left.svg" alt=""/>
                      </div>
                  </div>
                  <div className="partners-section__navi-icon">
                      <div className="partners-section__icon">
                          <img src="/svg/icon-right.svg" alt=""/>
                      </div>
                  </div>
              </div>
          </div>
          <div className="partners-section__images">
            <img className="partners-section__image1" src="/partners-images/1.jpeg" alt=""/>
            <img className="partners-section__image2" src="/partners-images/2.png" alt=""/>
            <img className="partners-section__image3" src="/partners-images/3.jpeg" alt=""/>
            <img className="partners-section__image4" src="/partners-images/4.jpeg" alt=""/>
            <img className="partners-section__image5" src="/partners-images/5.png" alt=""/>
            <img className="partners-section__image6" src="/partners-images/6.jpeg" alt=""/>
          </div>
        </div>
    )
}

export default MainPartners;