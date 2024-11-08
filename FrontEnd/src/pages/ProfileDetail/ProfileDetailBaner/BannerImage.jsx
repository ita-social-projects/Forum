import { PropTypes } from 'prop-types';
import classes from './BannerImage.module.css';

function BannerImage({ data }) {
    return (
        <div
            className={classes['banner-image__block']}
            style={{
                background: data.banner?.path
                    ? `url(${data.banner.path}) lightgray center / cover no-repeat`
                    : `url(${process.env.REACT_APP_PUBLIC_URL}/svg/image-for-empty-banner.svg`,
            }}
        />
    );
}

export default BannerImage;

BannerImage.propTypes = {
    data: PropTypes.shape({
        banner: PropTypes.shape({
            path: PropTypes.string,
        }),
    }),
};
