import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import classes from './Company.module.css';
import ReadMore from './ReadMore';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';

function Company ({ data }) {
    const { setDataInComponents } = useContext(DataContext);

    // TODO: implement logic for getting data from db when it's added on server side

    const competitiveEdge = '';
    const slogan = '';
    const companyData = data.common_info || competitiveEdge || slogan;

    useEffect(() => {
        if (companyData) {
            setDataInComponents(prevData => [
                ...prevData,
                'about-company',
               ]);
            }
        }, [setDataInComponents, companyData]);

    return (
        companyData ? (
            <div id="about-company" className={classes['about-company']}>
                <div className={classes['about-company__title']}>
                    <div className={classes['about-company__title--block']}>
                        <p className={classes['about-company__title--text']}>Про компанію</p>
                    </div>
                    <div className={classes['about-company__title--divider']}></div>
                </div>
                <div className={classes['about-company__content']}>
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
                            <div className={classes['about-company__content--advantage--description']}>
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
