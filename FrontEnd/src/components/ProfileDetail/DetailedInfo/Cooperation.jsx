// import { useMemo } from 'react';
// import { PropTypes } from 'prop-types';
import classes from './Cooperation.module.css';
import ReadMore from './ReadMore';

function Cooperation () {
    // const profile = useMemo(() => {
    //     return {
    //     };
    //   }, [data]);

    return (
        <div id="cooperation" className={classes['cooperation-wrapper']}>
            <div className={classes['cooperation']}>
                <div className={classes['cooperation__title']}>
                    <div className={classes['cooperation__title--block']}>
                        <p className={classes['cooperation__title--text']}>Формат співпраці</p>
                    </div>
                    <div className={classes['cooperation__title--divider']}></div>
                </div>
                <div className={classes['cooperation__content--block']}>
                        <p className={classes['cooperation__content--description']}>
                            <ReadMore>
                            </ReadMore>
                        </p>
                </div>
            </div>
        </div>
    );
}

export default Cooperation;
