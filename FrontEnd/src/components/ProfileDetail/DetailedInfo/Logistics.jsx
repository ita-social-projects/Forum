import { useEffect } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import classes from './Logistics.module.css';
import ReadMore from './ReadMore';

function Logistics () {
    const { setDataInComponents } = useContext(DataContext);
    const logisticsData = '';

    useEffect(() => {
        if (logisticsData) {
          setDataInComponents(prevData => [
              ...prevData,
              'logistics']);
          }
        }, [logisticsData, setDataInComponents]);

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
