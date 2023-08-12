import './About.css';
import AboutSectionCards from "./cards/AboutCards";
import AboutSectionText from "./about-text/AboutText";


const MainAboutSection = () => {
    return (
        <div className="about-us-section">
          <AboutSectionText/>
          <AboutSectionCards/>
          <div className="about-us-section-content">
            <div className="about-us-rectangle">
            <div className="about-us-section-content__field"/>
            <div className="about-us-section-content__text">
              <div className="about-us-section-content__header-text">ХТО МИ</div>
              <div className="about-us-section-content__smart-text">Це перший форум Західної України, цілями якого є популяризація українського виробника та представлення стартапів для розвитку галузі «Smart Craft&Food»</div>
              <div className="about-us-section-content__smart-text">Це перший форум Західної України, цілями якого є популяризація українського виробника та представлення стартапів для розвитку галузі «Smart Craft&Food»</div>
            </div>
            <img className="about-us-section-content__image" src={`${process.env.PUBLIC_URL}/img/about.jpeg`} alt=""/>
          </div></div>
        </div>
    )
}

export default MainAboutSection;
