import './About.css';
import React from 'react';
import AboutSectionCards from './Cards/AboutCards';
import AboutSectionText from './AboutText/AboutText.jsx';

const MainAboutSection = () => {
  return (
    <div className="about-us-section">
      <AboutSectionText />
      <AboutSectionCards />
    </div>
  );
};

export default MainAboutSection;
