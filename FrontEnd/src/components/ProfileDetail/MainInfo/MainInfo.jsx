import { PropTypes } from 'prop-types';
import Title from './Title';
import ProfileDetailNavBar from './ProfileDetailNavBar';
import classes from './MainInfo.module.css';

function MainInfo ({ isAuthorized, data }) {

    return (
        <div className={classes['basic-info-content']}>
            <Title isAuthorized={isAuthorized} data={data}/>
            <ProfileDetailNavBar />
        </div>

);
}

export default MainInfo;

MainInfo.propTypes = {
    isAuthorized: PropTypes.bool,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string,
      region_display: PropTypes.string,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
      activities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
      common_info: PropTypes.string,
      is_saved: PropTypes.bool.isRequired,
    }).isRequired,
  };
