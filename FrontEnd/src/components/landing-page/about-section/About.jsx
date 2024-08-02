import './About.css';
import AboutSectionCards from './cards/AboutCards';
import AboutSectionText from './about-text/AboutText';

const MainAboutSection = () => {
  return (
    <div className="about-us-section">
      <AboutSectionText />
      <AboutSectionCards />
      <div className="about-us-section-content">
        <div className="about-us-rectangle">
          <div className="about-us-section-content__text" id="about-us">
            <h2 className="about-us-section-content__header-text">ХТО МИ</h2>
            <p className="about-us-section-content__smart-text">
              <strong>CraftMerge</strong>  - перший форум Західної України, який створений у
              співпраці з Національним університетом «Львівська політехніка». Наша
              місія - не лише об`єднання українських виробників та стартапів, а й
              відкриття нових перспектив у виробничій галузі.
            </p>
            <p className="about-us-section-content__smart-text">
              <strong>CraftMerge</strong>  - це не лише платформа для обміну досвідом та ідеями, але
              й комунікаційний майданчик для обговорення актуальних тенденцій та
              передових технологій.
            </p>
            <p className="about-us-section-content__smart-text">
              Учасники форуму отримають можливість не лише обмінятися досвідом
              та ідеями, але й ознайомитися з найсучаснішими рішеннями
              виробництва крафтової продукції. Ми створили <strong>CraftMerge</strong> , щоб
              допомогти українським виробникам збільшити свою популярність та
              впізнаваність, розширити аудиторію споживачів та залучити нових
              клієнтів. Приєднуйтеся до нашого форуму та розвивайте свій бізнес
              разом з нами!
            </p>
          </div>
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

