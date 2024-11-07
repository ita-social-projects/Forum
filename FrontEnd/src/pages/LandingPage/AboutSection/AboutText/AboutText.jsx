import React from 'react';
import { Row, Col } from 'antd';
import './AboutText.css';
import AboutText from './text.js';

const AboutSectionText = () => {
  return (
    <div className="about-us-text-section">
      <h2 className="about-us-text-section__header-text">{AboutText.title}</h2>
      <Row justify="start" gutter={[32, 24]}>
        {AboutText.content.map((item) => (
          <Col
            key={item.id}
            xs={12}   // Одна колонка на мобільних (<=576px)
            md={6}   // Дві колонки на планшетах (>=768px)
            xl={6}    // Чотири колонки на десктопах (>=1200px)
          >
            <div className="about-us-text-section__card">
              <img
                src={`${process.env.REACT_APP_PUBLIC_URL}/svg/${item.icon}`}
                alt={item.text}
                className="about-us-text-section__icon"
              />
              <p>{item.text}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AboutSectionText;
