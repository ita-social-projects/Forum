import { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import classes from './ProductsServices.module.css';
import ReadMore from './ReadMore';

function ProductsServices ({ data }) {
    const { setDataInComponents } = useContext(DataContext);
    const profile = useMemo(() => {
        return {
            products: data.product_info,
            services: data.service_info
        };
      }, [data]);

    useEffect(() => {
    if (profile.products || profile.services) {
        setDataInComponents(prevData => [
            ...prevData,
            'products-services']);
        }
    }, [setDataInComponents, profile.products, profile.services]);

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
                        <div className={classes['products-services__content--description']}>
                            <ReadMore>
                                {profile.products}
                            </ReadMore>
                        </div>
                    </div>}
                    {profile.services &&
                    <div className={classes['products-services__content--block']}>
                        <p className={classes['products-services__content--title']}>Послуги</p>
                        <div className={classes['products-services__content--description']}>
                            <ReadMore>
                                {profile.services}
                            </ReadMore>
                        </div>
                    </div>}
                </div>
            </div>
        ) : null
    );
}

export default ProductsServices;

ProductsServices.propTypes = {
    data: PropTypes.shape({
        product_info: PropTypes.string,
        service_info: PropTypes.string,
    })
};
