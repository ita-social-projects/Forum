import { StarOutlined, StarFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';

import styles from './StarForLike.module.css';

export default function StarForLike({
  isSaved,
  isAuthorized,
  ownProfile,
  handleClick,
  styleFilled,
  styleOutlined,
}) {
  const filledStar = (
    <StarFilled
      className={styles['star-filled']}
      onClick={handleClick}
      data-testid="star"
      style={styleFilled}
    />
  );
  const outlinedStar = (
    <StarOutlined
      className={styles['star-outlined']}
      onClick={handleClick}
      data-testid="emptystar"
      style={styleOutlined}
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
  styleFilled: PropTypes.object,
  styleOutlined: PropTypes.object,
};
