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
