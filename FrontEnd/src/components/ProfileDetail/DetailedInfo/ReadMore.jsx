import { useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './ReadMore.module.css';

const ReadMore = ({ children }) => {
  const text = children;
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  const maxTextLength = 150;

  const displayText = text && (readMore || text.length <= maxTextLength ? text : `${text.slice(0, maxTextLength)}...`);

  return (
    text ? (
    <p className={classes['read-more']}>
        {displayText}
        {text.length > maxTextLength && (
          <span onClick={toggleReadMore} className={classes['read-or-hide']}>
            {!readMore ? 'читати далі' : 'приховати'}
          </span>
      )}
    </p>) : null
  );
};

export default ReadMore;

ReadMore.propTypes = {
  children: PropTypes.string,
};
