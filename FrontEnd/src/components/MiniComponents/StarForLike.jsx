import { StarOutlined, StarFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './StarForLike.module.css';

export default function StarForLike({
  isSaved,
  isAuthorized,
  ownProfile,
  handleClick,
}) {
  const filledStar = (
    <StarFilled
      className={styles['star']}
      onClick={handleClick}
      data-testid="star"
    />
  );
  const outlinedStar = (
    <StarOutlined
      className={styles['star']}
      onClick={handleClick}
      data-testid="emptystar"
    />
  );
  return isAuthorized && !ownProfile
    ? isSaved
      ? filledStar
      : outlinedStar
    : null;
}

StarForLike.propTypes = {
  isSaved: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  ownProfile: PropTypes.bool,
  handleClick: PropTypes.func,
};
