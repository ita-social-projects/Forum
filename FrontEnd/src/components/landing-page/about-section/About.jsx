import './About.css';
import React from 'react';
import AboutSectionCards from './cards/AboutCards';
import AboutSectionText from './about-text/AboutText';
import AboutTextContent from './AboutMainText.js';

const MainAboutSection = () => {
  return (
    <div className="about-us-section">
      <AboutSectionText />
      <AboutSectionCards />
      <div className="about-us-section-content">
        <div className="about-us-rectangle">
          <div className="about-us-section-content__text">
            <h2 className="about-us-section-content__header-text">{AboutTextContent.header}</h2>
            {AboutTextContent.contents.map((content) => (
              <p className="about-us-section-content__smart-text" key={content.id}>
                {content.text.split('CraftMerge').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <strong key={i}>CraftMerge</strong>}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
          <img
            className="about-us-section-content__image"
            src={`${process.env.REACT_APP_PUBLIC_URL}/img/about.jpeg`}
            alt="about_img"
          />
        </div>
      </div>
    </div>
  );
};

export default MainAboutSection;
