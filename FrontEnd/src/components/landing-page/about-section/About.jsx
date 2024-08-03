import './About.css';
import AboutSectionCards from './cards/AboutCards';
import AboutSectionText from './about-text/AboutText';
import AboutTextContent from './AboutMainText';

const MainAboutSection = () => {
  return (
    <div className="about-us-section">
      <AboutSectionText />
      <AboutSectionCards />
      <div className="about-us-section-content">
        <div className="about-us-rectangle">
          {AboutTextContent.map((section) => (
            <div className="about-us-section-content__text" id="about-us" key={section.id}>
              <h2 className="about-us-section-content__header-text">{section.header}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p className="about-us-section-content__smart-text" key={index} style={{ whiteSpace: 'pre-line' }}>
                  {paragraph.split('CraftMerge').map((part, i, arr) => (
                    <>
                      {part}
                      {i < arr.length - 1 && <strong>CraftMerge</strong>}
                    </>
                  ))}
                </p>
              ))}
            </div>
          ))}
          <img
            className="about-us-section-content__image"
            src={`${process.env.REACT_APP_PUBLIC_URL}/img/about.jpeg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MainAboutSection;

