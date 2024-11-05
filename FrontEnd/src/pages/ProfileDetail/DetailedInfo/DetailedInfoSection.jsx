import { PropTypes } from 'prop-types';

import CompanyDescription from './CompanyDescription';
import DataContacts from './DataContacts';
import EmptyData from '../ProfileDetailComponents/EmptyData';

import classes from './DetailedInfoSection.module.css';


function DetailedInfoSection({ isAuthorized, data, containsNotRequiredData }) {
  return (
    <div className={classes['detail-info-page']}>
      <h3 className={classes['profile-detail__tags']}>Про Компанію</h3>
      <DataContacts isAuthorized={isAuthorized} data={data} />
      {containsNotRequiredData ? <CompanyDescription isAuthorized={isAuthorized} data={data} /> : <EmptyData />}
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
