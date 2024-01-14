import React from 'react';
import PropTypes from 'prop-types';
import styles from './RulesModal.css';
import rulesText from './Rules_text';

const RulesModal = ({ closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className="rules-modal">
        <h2 className="rules-modal__title">{rulesText.title}</h2>
        {rulesText.content.map((item, index) => {
          if (item.type === 'paragraph') {
            return <p key={index}>{item.text}</p>;
          } else if (item.type === 'heading') {
            return React.createElement(`h${item.level}`, { key: index }, item.text);
          }
          return null;
        })}
        <button className="rules-modal__button" onClick={closeModal}>Закрити</button>
      </div>
    </div>
  );
};

RulesModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default RulesModal;

