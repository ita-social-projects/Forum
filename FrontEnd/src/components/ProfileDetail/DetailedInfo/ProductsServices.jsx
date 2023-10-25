// import { useMemo } from 'react';
// import { PropTypes } from 'prop-types';
import classes from './ProductsServices.module.css';
import ReadMore from './ReadMore';

function ProductsServices () {
    // const profile = useMemo(() => {
    //     return {
    //     };
    //   }, [data]);

    return (
        <div id="products-services" className={classes['products-services']}>
            <div className={classes['products-services__title']}>
                <div className={classes['products-services__title--block']}>
                    <p className={classes['products-services__title--text']}>Товари / послуги</p>
                </div>
                <div className={classes['products-services__title--divider']}></div>
            </div>
            <div className={classes['products-services__content']}>
                <div className={classes['products-services__content--block']}>
                    <p className={classes['products-services__content--title']}>Товари</p>
                    <p className={classes['products-services__content--description']}>
                        <ReadMore>
                        </ReadMore>
                    </p>
                </div>
                <div className={classes['products-services__content--block']}>
                    <p className={classes['products-services__content--title']}>Послуги</p>
                    <p className={classes['products-services__content--description']}>
                        <ReadMore>
                        </ReadMore>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductsServices;
