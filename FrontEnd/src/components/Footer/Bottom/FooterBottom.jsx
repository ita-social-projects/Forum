import css from './FooterBottom.module.css';

function FooterBottom() {
    return (
        <div className={css['footer-bottom']}>
            <p className={css['footer-bottom__text']}>
                Copyright 2023 CraftMerge. All rights reserved.
            </p>
            <img
                className={css['footer-bottom-logo__svg']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/opentech_logo.svg`}
                alt="Opentech logo"
                title="Opentech logo"
            />
        </div>
    );
}

export default FooterBottom;
