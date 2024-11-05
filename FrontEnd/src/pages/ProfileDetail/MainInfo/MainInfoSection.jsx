import { PropTypes } from 'prop-types';
import TitleInfo from '../TitelInfo/TitleInfo';
import ProfileDetailNavBar from './ProfileDetailNavBar';
import classes from './MainInfoSection.module.css';

function MainInfoSection({ isAuthorized, data, containsNotRequiredData }) {
  return (
    <div className={classes['basic-info-content']}>
      <TitleInfo isAuthorized={isAuthorized} data={data} />
      {containsNotRequiredData ? <ProfileDetailNavBar data={data}/> : null}
    </div>
  );
}

export default MainInfoSection;

MainInfoSection.propTypes = {
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
      is_registered: PropTypes.bool.isRequired,
      is_startup: PropTypes.bool.isRequired,
    }).isRequired,
    containsNotRequiredData: PropTypes.bool.isRequired,
  };
