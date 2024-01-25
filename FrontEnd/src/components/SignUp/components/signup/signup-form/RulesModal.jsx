import PropTypes from 'prop-types';
import styles from './RulesModal.module.css';
import rulesText from './Rules_text';
import { v4 as uuidv4 } from 'uuid';

const RulesModal = ({ closeModal }) => {
  return (
    <div className={styles['rules-modal']}>
      <h2 className={styles['rules-modal__title']}>{rulesText.title}</h2>
      {rulesText.content.map((item) => {
        if (item.type === 'paragraph') {
          return <p key={item.id || uuidv4}>{item.text}</p>;
        } else if (item.type === 'heading') {
          const HeadingTag = `h${item.level}`;
          return <HeadingTag key={item.id || uuidv4}>{item.text}</HeadingTag>;
        }
        return null;
      })}
      <button className={styles['rules-modal__button']} onClick={closeModal}>Закрити</button>
    </div>
  );
};

RulesModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default RulesModal;
