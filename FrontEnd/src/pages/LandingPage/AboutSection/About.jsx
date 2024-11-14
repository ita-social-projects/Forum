import './About.css';
import React from 'react';
import AboutSectionCards from './Cards/AboutCards';
import AboutSectionText from './AboutText/AboutText.jsx';


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
    </div>
  );
};

export default MainAboutSection;