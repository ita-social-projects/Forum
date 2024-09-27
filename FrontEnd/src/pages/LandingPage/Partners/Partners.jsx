import './Partners.css';

const MainPartners = () => {
  return (
    <div className="partners-section">
      <div className="partners-section__header">
        <div className="partners-section__header-text">партнери</div>
        <div className="partners-section__navi-icons">
          <div className="partners-section__navi-icon">
            <div className="partners-section__icon">
              <img src="/svg/icon-left.svg" alt="Left navigation" />
            </div>
          </div>
          <div className="partners-section__navi-icon">
            <div className="partners-section__icon">
              <img src="/svg/icon-right.svg" alt="Right navigation" />
            </div>
          </div>
        </div>
      </div>
      <div className="partners-section__images">
        <img
          className="partners-section__image1"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/1.jpeg`}
          alt=""
        />
        <img
          className="partners-section__image2"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/2.png`}
          alt=""
        />
        <img
          className="partners-section__image3"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/3.jpeg`}
          alt=""
        />
        <img
          className="partners-section__image4"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/4.jpeg`}
          alt=""
        />
        <img
          className="partners-section__image5"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/5.png`}
          alt=""
        />
        <img
          className="partners-section__image6"
          src={`${process.env.REACT_APP_PUBLIC_URL}/partners-images/6.jpeg`}
          alt=""
        />
      </div>
    </div>
  );
};

export default MainPartners;
