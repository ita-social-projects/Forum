import './AboutText.css';
import AboutText from './text.js';

const AboutSectionText = () => {
  const renderParagraphs = (paragraphNumber) => {
    return AboutText.content
      .filter(item => item.paragraph === paragraphNumber)
      .map((item, index) => (
        <li key={index}>{item.text}</li>
      ));
  };

  return (
    <div className="about-us-text-section">
      <div className="about-us-text-section__text-field">
        <div className="about-us-text-section__header-text">{AboutText.title}</div>
        <div className="about-us-text-section__paragraphs">
          <ul className="about-us-text-section__paragraph-one">
            {renderParagraphs(1)}
          </ul>
          <ul className="about-us-text-section__paragraph-two">
            {renderParagraphs(2)}
          </ul>
        </div>
      </div>
      <img className="about-us-text-section__dots"
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/dots_12x10.png`}
        alt="dots_12x10.png" />
    </div>
  );
};

export default AboutSectionText;

