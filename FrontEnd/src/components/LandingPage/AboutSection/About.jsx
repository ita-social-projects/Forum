import './About.css';
import React from 'react';
import AboutSectionCards from './Cards/AboutCards';
import AboutSectionText from './AboutText/AboutText';
import AboutTextContent from './AboutMainText.js';

const MainAboutSection = () => {
  const TextStrong = (text, keyword) =>
    text.split(keyword).map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <strong>{keyword}</strong>}
      </React.Fragment>
    ));

  return (
    <div className="about-us-section">
      <AboutSectionText />
      <AboutSectionCards />
      <div className="about-us-section-content">
        <div className="about-us-rectangle">
          <div className="about-us-section-content__text">
            <h2 className="about-us-section-content__header-text">{AboutTextContent.header}</h2>
            {AboutTextContent.contents.map(({ id, text }) => (
              <p className="about-us-section-content__smart-text" key={id}>
                {TextStrong(text, 'CraftMerge')}
              </p>
            ))}
          </div>
          <img
            className="about-us-section-content__image"
            src={`${process.env.REACT_APP_PUBLIC_URL}/img/about.jpeg`}
            alt="about img"
            loading="lazy"
            title="about img"
          />
        </div>
      </div>
    </div>
  );
};

export default MainAboutSection;

