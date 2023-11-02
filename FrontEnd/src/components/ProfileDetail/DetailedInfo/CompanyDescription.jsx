import { PropTypes } from 'prop-types';
import classes from './CompanyDescription.module.css';
import Company from './Company';
import Startup from './Startup';
import ProductsServices from './ProductsServices';
import Logistics from './Logistics';
import Cooperation from './Cooperation';

function CompanyDescription ({ data }) {
    return (
        <div className={classes['company-description-block']}>
            <Company data={data} />
            <Startup data={data} />
            <ProductsServices data={data} />
            <Logistics />
            <Cooperation />
        </div>
    );
}

export default CompanyDescription;

CompanyDescription.PropTypes = {
    data: PropTypes.shape({
        common_info: PropTypes.string,
        startup_idea: PropTypes.string,
        product_info: PropTypes.string,
        service_info: PropTypes.string,
      }),
};
