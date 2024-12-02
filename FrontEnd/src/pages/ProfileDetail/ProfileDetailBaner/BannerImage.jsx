import { PropTypes } from 'prop-types';
import classes from './BannerImage.module.css';
import PendingStatus from '../../../components/MiniComponents/PendingModerationIcon/PendingStatus';

function BannerImage({ data }) {
    const backgroundImage = data?.banner?.path
        ? `url(${data.banner.path}) lightgray center / cover no-repeat`
        : `url(${process.env.REACT_APP_PUBLIC_URL}/svg/empty-decore-50x46.svg) #e0e0e0 left top / 50px 46px repeat `;

    return (
        <div
            className={classes['banner-image__block']}
            style={{ background: backgroundImage }}
        >
            <div className={classes['banner-image-tooltip']}>
                <PendingStatus profile={data} elementType="banner" />
            </div>
        </div>
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
