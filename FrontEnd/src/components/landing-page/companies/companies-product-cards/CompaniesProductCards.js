import './CompaniesProductCards.css';

export const ProductCard = ({ data }) => {
    const { category, name, address, badges, logoSrc, photoSrc } = data;

    return (
        <div className="product-card">
            <div className="product-card__block">
                <div className="product-card__image-frame">
                    <img className="product-card__image" src={photoSrc} alt=""/>
                </div>
                <div className="product-card__text-block">
                    <div className="product-card__text-block__header">
                        <div className="product-card__category-text">{category}</div>
                        <div className="product-card__name-text">{name}<br /></div>
                    </div>
                    <div className="product-card__address-text">{address}</div>
                    <div className="product-card__badges-block">
                        {badges.map((badge, index) => (
                            <div className="product-card__badges" key={index}>
                                <div className="product-card__badge">
                                    <div className="product-card__badge-text">{badge}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="product-card__logo">
                <div className="product-card__logo-ellipse">
                <img className="product-card__logo-image" src={logoSrc} alt=""/>
                </div>
            </div>
        </div>
    );
};
