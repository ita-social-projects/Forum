import { Badge } from 'antd';
import PropTypes from 'prop-types';

export default function CategoryBadges({ categories }) {
  const style = {
    backgroundColor: '#1F9A7C',
    fontWeight: 600,
    fontFamily: 'Inter',
    fontSize: 10,
    margin: 5,
  };
  return (
    <div>
      {categories
        ? categories.map((category) => (
            <Badge
              title=""
              key={category.id}
              size="medium"
              count={category.name.toUpperCase()}
              style={style}
            />
          ))
        : null}
    </div>
  );
}

CategoryBadges.propTypes = {
  categories: PropTypes.array,
};
