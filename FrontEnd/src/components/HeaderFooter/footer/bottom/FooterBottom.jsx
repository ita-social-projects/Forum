import css from './FooterBottom.module.css';

function FooterBottom() {
    return (
        <div className={css['footer-bottom']}>
            <p className={css['footer-bottom__text']}>
                Copyright 2023 Forum. All rights reserved.
            </p>
            <img
                className={css['footer-bottom-logo__svg']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/img/opentech_logo.svg`}
                alt="opentech_logo"
                title="opentech_logo"
            />
        </div>
    );
}

export default FooterBottom;
