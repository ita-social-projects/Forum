import { PropTypes } from 'prop-types';
import classes from './DetailedInfoSection.module.css';
import CompanyDescription from './CompanyDescription';
import DataContacts from './DataContacts';
import EmptyData from '../EmptyData';

function DetailedInfoSection ({ isAuthorized, data, containsNotRequiredData  }) {
    return (
        <div className={classes['detail-info-page']}>
            {containsNotRequiredData ? <CompanyDescription isAuthorized={isAuthorized} data={data} /> : <EmptyData /> }
            <DataContacts isAuthorized={isAuthorized} data={data} />
        </div>
    );
}

export default DetailedInfoSection;

DetailedInfoSection.propTypes = {
    isAuthorized: PropTypes.bool,
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      common_info: PropTypes.string,
      startup_idea: PropTypes.string,
      product_info: PropTypes.string,
      service_info: PropTypes.string,
      address: PropTypes.string,
    }),
    containsNotRequiredData: PropTypes.bool.isRequired,
  };
