import './Companies.css';
import {ProductCard} from "./companies-product-cards/CompaniesProductCards";

const MainCompanies = () => {
    const companyDataList = [
        {
            category: 'Виноробство',
            name: '«Ace&W by Stakhovsky»',
            address: 'Київ, Київська обл, Закарпатська обл.',
            badges: ['15 років досвіду', 'експорт', 'мін. опт'],
            logoSrc: '/companies-logos/1.png',
            photoSrc: '/companies-images/1.jpeg'
        },
        {
            category: 'Імпортер',
            name: 'Regno',
            address: 'Київ',
            badges: ['13 років досвіду', 'імпорт', 'великий опт'],
            logoSrc: '/companies-logos/2.png',
            photoSrc: '/companies-images/2.jpeg'
        },
                {
            category: 'Сироварня',
            name: 'Мукко',
            address: 'Львів, Львівська обл',
            badges: ['5 років досвіду', 'сімейне виробництво'],
            logoSrc: '/companies-logos/33.jpeg',
            photoSrc: '/companies-images/3.jpeg'
        },
    ];
    const companyDataListSecond = [
        {
            category: 'РІТЕЙЛЕР',
            name: 'АСОЦІАЦІЯ РІТЕЙЛЕРІВ УКРАЇНИ',
            address: 'Київ, Київська обл, Закарпатська обл.',
            badges: ['15 років досвіду'],
            logoSrc: '/companies-logos/44.jpeg',
            photoSrc: '/companies-images/4.jpeg'
        },
        {
            category: 'Виробник',
            name: 'МХП',
            address: 'Київ, Київська обл',
            badges: ['15 років досвіду'],
            logoSrc: '/companies-logos/5.jpeg',
            photoSrc: '/companies-images/5.jpeg'
        },
                {
            category: 'Роздрібна торгівля',
            name: 'Сільпо',
            address: 'Київ, Київська обл',
            badges: ['9 років досвіду'],
            logoSrc: '/companies-logos/66.png',
            photoSrc: '/companies-images/6.jpeg'
        },
    ];

    return (
        <div className="new-companies-main">
            <div className="new-companies">
                <div className="new-companies-main__header">Нові учасники</div>
            </div>
            <div className="new-companies-block">
                <div className="new-companies-block__row">
                    {companyDataList.map((data, index) => (
                        <ProductCard key={index} data={data} />
                    ))}
                </div>
                <div className="new-companies-block__row">
                    {companyDataListSecond.map((data, index) => (
                        <ProductCard key={index} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainCompanies;