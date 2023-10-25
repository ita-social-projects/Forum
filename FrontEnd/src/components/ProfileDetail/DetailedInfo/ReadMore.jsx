import { useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './ReadMore.module.css';

const ReadMore = ({ children }) => {
  const text = children;
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };
  const displayText = text && (readMore ? text : `${text.slice(0, 150)}...`);

  return (
    text ? (
    <p className={classes['read-more']}>
        {displayText}
      <span onClick={toggleReadMore} className={classes['read-or-hide']}>
        {!readMore ? 'читати далі' : 'приховати'}
      </span>
    </p>) : null
  );
};

export default ReadMore;

ReadMore.propTypes = {
  children: PropTypes.string,
};
