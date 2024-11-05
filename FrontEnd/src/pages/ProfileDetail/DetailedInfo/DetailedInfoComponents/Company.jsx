import { PropTypes } from 'prop-types';
import { useEffect, useContext } from 'react';

import ReadMore from '../../ProfileDetailComponents/ReadMore';

import { ActiveLinksContext } from '../../../../context/ActiveLinksContext';

import classes from './Company.module.css';

function Company({ data }) {
    const { setActiveLinks } = useContext(ActiveLinksContext);

    // TODO: implement logic for getting data from db when it's added on server side

    const competitiveEdge = '';
    const slogan = '';
    const companyData = data.common_info || competitiveEdge || slogan;

    useEffect(() => {
        if (companyData) {
            setActiveLinks(prevData => [
                ...prevData,
                'about-company',
            ]);
        }
    }, [setActiveLinks, companyData]);

    return (
        companyData ? (
            <div id="about-company" className={classes['about-company']}>
                    {data.common_info ? (
                        <div className={classes['about-company__content--common']}>
                            <ReadMore >
                                {data.common_info}
                            </ReadMore>
                        </div>
                    ) : null}
                    {competitiveEdge ? (
                        <div className={classes['about-company__content--advantage']}>
                            <p className={classes['about-company__content--advantage--title']}>Конкурентна перевага</p>
                            <div className={classes['about-company__content--advantage--text']}>
                                <ReadMore>
                                    {competitiveEdge}
                                </ReadMore>
                            </div>
                        </div>
                    ) : null}
                    {slogan ? (
                        <div className={classes['about-company__content--slogan']}>
                            <p className={classes['about-company__content--slogan--title']}>Візія, слоган</p>
                            <p className={classes['about-company__content--slogan--text']}>{slogan}</p>
                        </div>
                    ) : null}
                </div>
        ) : null
    );
}

export default Company;

Company.propTypes = {
    data: PropTypes.shape({
        common_info: PropTypes.string,
    }),
};
