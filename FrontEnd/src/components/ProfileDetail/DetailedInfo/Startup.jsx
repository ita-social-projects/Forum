import { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import classes from './Startup.module.css';
import ReadMore from './ReadMore';

function Startup ({ data }) {
    const profile = useMemo(() => {
        return {
          startup_idea: data.startup_idea,
        };
      }, [data]);

    return (
        <div id="startup" className={classes['startup-wrapper']}>
            <div className={classes['startup']}>
                <div className={classes['startup__title']}>
                    <div className={classes['startup__title--block']}>
                        <p className={classes['startup__title--text']}>Стартап</p>
                    </div>
                    <div className={classes['startup__title--divider']}></div>
                </div>
                <div className={classes['startup__content']}>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Ідея стартапу</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                                {profile.startup_idea}
                            </ReadMore>
                        </p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Розмір інвестиції</p>
                        <p className={classes['startup__content--description']}></p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Ціль співпраці</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Кінцевий результат</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Конкурентна перевага ідеї</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Ризики</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                    </div>
                    <div className={classes['startup__content--block']}>
                        <p className={classes['startup__content--title']}>Пошук партнерів</p>
                        <p className={classes['startup__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Startup;

Startup.propTypes = {
    data: PropTypes.shape({
      startup_idea: PropTypes.string,
    }),
  };
