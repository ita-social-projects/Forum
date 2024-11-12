import { PropTypes } from 'prop-types';
import css from './Description.module.css';

const Description = (props) => {
  return (
    <div className={css['description__section']}>
      <img
        className={css['description__avatar']}
        src={
          props.companyLogo ||
          `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`
        }
        alt="Company logo"
      />
      <div className={css['description__content']}>
        <div className={css['company__attributes']}>
          <div className={css['companyName']}>{props.companyName}</div>
        </div>
        <div className={css['description__text']}>
        </div>
      </div>
    </div>
  );
};

export default Description;

Description.propTypes = {
  companyName: PropTypes.string,
  companyLogo: PropTypes.string,
};
