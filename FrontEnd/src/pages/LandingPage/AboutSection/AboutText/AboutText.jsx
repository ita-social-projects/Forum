import './AboutText.css';
import AboutText from './text.js';

const AboutSectionText = () => {
  return (
    <div className="about-us-text-section">
      <h2 className="about-us-text-section__header-text">{AboutText.title}</h2>
      <div className="about-us-text-section__grid">
        {AboutText.content.map((item) => (
          <div key={item.id} className="about-us-text-section__card">
            <img
              src={`${process.env.REACT_APP_PUBLIC_URL}/icons/${item.icon}`}
              alt={item.text}
              className="about-us-text-section__icon"
            />
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSectionText;
