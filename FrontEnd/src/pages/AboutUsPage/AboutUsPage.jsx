import css from './AboutUs.module.css';
import React from 'react';
import AboutTextContent from './AboutTextContent';

const AboutUs = () => {
  const TextStrong = (text, keyword) =>
    text.split(keyword).map((part, i, arr) => (
      <React.Fragment key={i}>
        {part}
        {i < arr.length - 1 && <strong>{keyword}</strong>}
      </React.Fragment>
    ));

  return (
    <div className={css['about-us-section']}>
      <div className={css['about-us-section-main']}>
        <div className={css['about-us-section-content__header']}>
          <h2>{AboutTextContent.header}</h2>
        </div>
        <div id={'about-us'} className={css['about-us-section-content']}>
            <div className={css['about-us-section-content__text']}>
              {AboutTextContent.contents.map(({ id, text }, i) => (
                <p
                  className={css['about-us-section-content__smart-text']}
                  key={id}
                >
                  {i === 0 ? TextStrong(text, 'CraftMerge') : text}
                </p>
              ))}
            </div>
            <div className={css['about-us-section-content__image-container']}>
              <img
                className={css['about-us-section-content__image']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/about.jpeg`}
                alt="about img"
                loading="lazy"
                title="About CarftMerge"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
