import { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import classes from './ProductsServices.module.css';
import ReadMore from './ReadMore';

function ProductsServices ({ data }) {
    const profile = useMemo(() => {
        return {
            products: data.product_info,
            services: data.service_info
        };
      }, [data]);

    return (
        (profile.products || profile.services) ? (
            <div id="products-services" className={classes['products-services']}>
                <div className={classes['products-services__title']}>
                    <div className={classes['products-services__title--block']}>
                        <p className={classes['products-services__title--text']}>Товари / послуги</p>
                    </div>
                    <div className={classes['products-services__title--divider']}></div>
                </div>
                <div className={classes['products-services__content']}>
                    {profile.products &&
                    <div className={classes['products-services__content--block']}>
                        <p className={classes['products-services__content--title']}>Товари</p>
                        <p className={classes['products-services__content--description']}>
                            <ReadMore>
                                {profile.products}
                            </ReadMore>
                        </p>
                    </div>}
                    {profile.services &&
                    <div className={classes['products-services__content--block']}>
                        <p className={classes['products-services__content--title']}>Послуги</p>
                        <p className={classes['products-services__content--description']}>
                            <ReadMore>
                                {profile.services}
                            </ReadMore>
                        </p>
                    </div>}
                </div>
            </div>
        ) : null
    );
}

export default ProductsServices;

ProductsServices.PropTypes = {
    data: PropTypes.shape({
        product_info: PropTypes.string,
        service_info: PropTypes.string,
    })
};
