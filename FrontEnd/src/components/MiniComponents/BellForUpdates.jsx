import PropTypes from 'prop-types';
import styles from './BellForUpdates.module.css';

export default function BellForUpdates({ savedIsUpdated }){
    return (
        <img
            src={`${process.env.PUBLIC_URL}/svg/bell-icon.svg`}
            className={`${styles['bell']} ${!savedIsUpdated ? styles['hidden'] : ''}`}
            alt="Bell Icon"
        />

    );
}

BellForUpdates.propTypes={
    savedIsUpdated: PropTypes.bool.isRequired,
};