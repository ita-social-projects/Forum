import './AboutCards.css';

const AboutSectionCards = () => {
    return (
      <div className="about-us-cards-section">
        <div className="about-us-cards-section__header-text">ЧОМУ ВАРТО</div>
        <div className="about-us-cards-section__cards">
          <div className="about-us-cards-section__first-card">
            <div className="about-us-cards-section__cards-content">
              <div className="about-us-cards-section__cards-logo">
                <img className="about-us-cards-section__cards-logo__intersect" src="/svg/intersect.svg" alt=""/>
                <img className="about-us-cards-section__cards-logo__expert" src="/svg/expert.svg" alt=""/>
              </div>
              <div className="about-us-cards-section__cards-content__text-header">ЕКСПЕРТНІСТЬ</div>
              <div className="about-us-cards-section__cards-content__text">Спілкування з провідними експертами і практиками ексклюзивна.</div>
            </div>
          </div>
          <div className="about-us-cards-section__next-card">
            <div className="about-us-cards-section__cards-content">
              <div className="about-us-cards-section__cards-logo">
                <img className="about-us-cards-section__cards-logo__intersect" src="/svg/intersect.svg" alt=""/>
                <img className="about-us-cards-section__cards-logo__expert" src="/svg/info.svg" alt=""/>
              </div>
              <div className="about-us-cards-section__cards-content__text-header">ПРАКТИЧНІСТЬ</div>
              <div className="about-us-cards-section__cards-content__text">Практична інформація від представників галузей.</div>
            </div>
          </div>
          <div className="about-us-cards-section__next-card">
            <div className="about-us-cards-section__cards-content">
              <div className="about-us-cards-section__cards-logo">
                <img className="about-us-cards-section__cards-logo__intersect" src="/svg/intersect.svg" alt=""/>
                <img className="about-us-cards-section__cards-logo__expert" src="/svg/contacts.svg" alt=""/>
              </div>
              <div className="about-us-cards-section__cards-content__text-header">НОВІ КОНТАКТИ</div>
              <div className="about-us-cards-section__cards-content__text">Нові ділові контакти та переговори презентація Вашого бренду, компанії, рішень і послуг.</div>
            </div>
          </div>
          <div className="about-us-cards-section__next-card">
            <div className="about-us-cards-section__cards-content">
              <div className="about-us-cards-section__cards-logo">
                <img className="about-us-cards-section__cards-logo__intersect" src="/svg/intersect.svg" alt=""/>
                <img className="about-us-cards-section__cards-logo__expert" src="/svg/exchange.svg" alt=""/>
              </div>
              <div className="about-us-cards-section__cards-content__text-header">ОБМІН</div>
              <div className="about-us-cards-section__cards-content__text">Обмін практичними напрацюваннями та досвідом.</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default AboutSectionCards;
