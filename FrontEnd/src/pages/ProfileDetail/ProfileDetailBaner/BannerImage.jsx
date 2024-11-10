import { PropTypes } from 'prop-types';
import classes from './BannerImage.module.css';

function BannerImage({ data }) {
    const backgroundImage = data?.banner?.path
        ? `url(${data.banner.path}) lightgray center / cover no-repeat`
        : `url(${process.env.REACT_APP_PUBLIC_URL}/svg/empty-baner-31x29.svg) #e0e0e0 left top / 100px 68px repeat `;

    return (
        <div
            className={classes['banner-image__block']}
            style={{ background: backgroundImage }}
        />
    );
}

BannerImage.propTypes = {
    data: PropTypes.shape({
        banner: PropTypes.shape({
            path: PropTypes.string,
        }),
    }),
};

export default BannerImage;
