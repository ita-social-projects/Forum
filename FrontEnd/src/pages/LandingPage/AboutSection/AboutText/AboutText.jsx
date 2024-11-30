import React from 'react';
import { Row, Col } from 'antd';
import './AboutText.css';
import AboutText from './text.js';

const AboutSectionText = () => {
  return (
    <div className="about-us-section-background">
      <div className="about-us-text-section">
        <h2 className="about-us-text-section__header-text">{AboutText.title}</h2>
        <Row justify="start" gutter={[32, 32]}>
          {AboutText.content.map((item) => (
            <Col
              key={item.id}
              xs={12}
              md={12}
              xl={8}
              xxl={6}
            >
              <div className="about-us-text-section__card">
                <img
                  src={`${process.env.REACT_APP_PUBLIC_URL}/svg/${item.icon}`}
                  alt={item.text}
                  className="about-us-text-section__icon"
                />
                <p className="about-us-text-section__card-text" >{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AboutSectionText;