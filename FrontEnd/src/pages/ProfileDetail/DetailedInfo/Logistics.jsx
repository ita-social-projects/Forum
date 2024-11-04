import { useEffect, useContext } from 'react';
import { ActiveLinksContext } from '../../../context/ActiveLinksContext';

import ReadMore from './ReadMore';

import classes from './Logistics.module.css';


function Logistics () {
    const { setActiveLinks } = useContext(ActiveLinksContext);
    const logisticsData = '';

    useEffect(() => {
        if (logisticsData) {
            setActiveLinks(prevData => [
              ...prevData,
              'logistics']);
          }
        }, [logisticsData, setActiveLinks]);

    // TODO: implement logic for getting data from db when it's added on server side

    return (
        logisticsData ? (
            <div id="logistics" className={classes['logistics-wrapper']}>
                <div className={classes['logistics']}>
                    <div className={classes['logistics__title']}>
                        <div className={classes['logistics__title--block']}>
                            <p className={classes['logistics__title--text']}>Логістика товарів / послуг</p>
                        </div>
                        <div className={classes['logistics__title--divider']}></div>
                    </div>
                    <div className={classes['logistics__content--block']}>
                        <div className={classes['logistics__content--description']}>
                            <ReadMore>
                                {logisticsData}
                            </ReadMore>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default Logistics;
