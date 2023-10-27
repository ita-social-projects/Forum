import classes from './DetailedInfoSection.module.css';
import CompanyDescription from './CompanyDescription';
import DataContacts from './DataContacts';

function DetailedInfoSection ({ isAuthorized, data }) {
    return (
        <div className={classes['detail-info-page']}>
            <CompanyDescription isAuthorized={isAuthorized} data={data} />
            <DataContacts isAuthorized={isAuthorized} data={data} />
        </div>
    );
}

export default DetailedInfoSection;
