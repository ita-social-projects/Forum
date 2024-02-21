import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const RenderingTextContainer = ({ item, styles }) => {
  if (item.type === 'paragraph') {
    return <p className={styles['text_content']} key={item.id || uuidv4()}>{item.text}</p>;
  } else if (item.type === 'heading') {
    const HeadingTag = `h${item.level}`;
    return <HeadingTag className={styles['text_content__heading']} key={item.id || uuidv4()}>{item.text}</HeadingTag>;
  } else if (item.type === 'paragraph__margin_bottom') {
    return <p className={styles['text_content__margin_bottom']} key={item.id || uuidv4()}>{item.text}</p>;
  } else if (item.type === 'list-item') {
    return (
      <ul key={item.id || uuidv4()} className={styles['custom-list']}>
        <li className={styles['custom-list__item']}>{item.text}</li>
      </ul>
    );
  }
  return null;
};
RenderingTextContainer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    level: PropTypes.number,
  }).isRequired,
  styles: PropTypes.object.isRequired,
};

export default RenderingTextContainer;
