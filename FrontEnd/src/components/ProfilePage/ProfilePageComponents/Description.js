import css from './Description.module.css';

const Description = (props) => {
    return (
        <div className={css["description__section"]}>
            <img
                className={css["description__avatar"]}
                src={`${process.env.PUBLIC_URL}/profilepage/initialCompanyLogo.png`}
                alt=""
            />
            <div className={css["description__content"]}>
                <div className={css['company__attributes']}>
                    <div className={css['companyName']}>{props.companyName.toUpperCase()}</div>
                    <div className={css['brend']}>{props.brend}</div>
                </div>
                <div className={css['description__text']}>Зробіть зміни для електронної пошти та особистиї інформації</div>
            </div>
        </div>
    );
};

export default Description;