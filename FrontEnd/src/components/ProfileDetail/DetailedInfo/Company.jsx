import { useMemo } from 'react';
import classes from './Company.module.css';
import ReadMore from './ReadMore';

function Company ({ data }) {
    const profile = useMemo(() => {
        return {
          common_info: data.common_info,
        };
      }, [data]);

    // TODO: implement logic for getting data from db when it's added on server side

    const competitiveEdge = '';
    const slogan = '';
    const companyData = profile.common_info || competitiveEdge || slogan;

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
                    {profile.common_info ? (
                        <p className={classes['about-company__content--common']}>
                            <ReadMore >
                                {profile.common_info}
                            </ReadMore>
                        </p>
                    ) : null}
                    {competitiveEdge ? (
                        <div className={classes['about-company__content--advantage']}>
                            <p className={classes['about-company__content--advantage--title']}>Конкурентна перевага</p>
                            <p className={classes['about-company__content--advantage--description']}>
                                <ReadMore>
                                    {competitiveEdge}
                                </ReadMore>
                            </p>
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
