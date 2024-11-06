import { PropTypes } from 'prop-types';

import Company from './Company';
import Startup from './Startup';
import ProductsServices from './ProductsServices';
import Logistics from './Logistics';
import Cooperation from './Cooperation';

import classes from './CompanyDescription.module.css';



function CompanyDescription({ data }) {
    return (
        <div className={classes['company-description-block']}>
            <h3 className={classes['company-description-block--title']}>Про Компанію</h3>
            <Company data={data} />
            {data.is_startup && <Startup data={data} />}
            {data.is_registered && <ProductsServices data={data} />}
            {data.is_registered && <Logistics />}
            {data.is_registered && <Cooperation />}
        </div>
    );
}

export default CompanyDescription;

CompanyDescription.propTypes = {
    data: PropTypes.shape({
        is_registered: PropTypes.bool.isRequired,
        is_startup: PropTypes.bool.isRequired,
        common_info: PropTypes.string,
        startup_idea: PropTypes.string,
        product_info: PropTypes.string,
        service_info: PropTypes.string,
    }),
};
