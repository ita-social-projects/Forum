import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import classes from './BannerImage.module.css';
import baner from './baner.svg';

function BannerImage({ data }) {

    const backgroundImage = {
        background: `url(${data.banner?.path}) lightgray 50% / cover no-repeat`,
    };

    return (
        <div className={classes['banner-image__block']} style={backgroundImage}>
            <div className={classNames({ [classes['default-banner']]: !data.banner?.path })}>
                {!data.banner?.path &&
                    <img src={baner} alt="Default baner"/>
                }
            </div>
        </div>
    );
}

export default BannerImage;

BannerImage.propTypes = {
    data: PropTypes.shape({
        banner: PropTypes.shape({
            path: PropTypes.string,
        })
    }),
};
