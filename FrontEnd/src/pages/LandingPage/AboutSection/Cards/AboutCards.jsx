import './AboutCards.css';
import AboutUsText from './text.js';

const AboutSectionCards = () => {
  return (
    <div className="about-us-cards-section">
      <h2 className="about-us-cards-section__header-text">
        {AboutUsText.title}
      </h2>
      <div className="about-us-cards-section__cards">
        {AboutUsText.content.map((card, index) => (
          <div
            key={index}
            className={`about-us-cards-section__card 
          ${
            index === 0
              ? 'about-us-cards-section__first-card'
              : 'about-us-cards-section__next-card'
          }`}
          >
            <div className="about-us-cards-section__cards-content">
              <div className="about-us-cards-section__cards-logo">
                <img
                  className="about-us-cards-section__cards-logo__intersect"
                  src={`${process.env.REACT_APP_PUBLIC_URL}/svg/intersect.svg`}
                  alt="About us cards"
                />
                <img
                  className="about-us-cards-section__cards-logo__expert"
                  src={`${process.env.REACT_APP_PUBLIC_URL}/svg/${card.logo}`}
                  alt="Logo"
                />
              </div>
              <h3 className="about-us-cards-section__cards-content__text-header">
                {card.title}
              </h3>
              <p className="about-us-cards-section__cards-content__text">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSectionCards;
