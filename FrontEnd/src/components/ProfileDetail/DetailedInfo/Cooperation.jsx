import { useEffect } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../../context/DataContext';
import classes from './Cooperation.module.css';
import ReadMore from './ReadMore';

function Cooperation () {
    const { setDataInComponents } = useContext(DataContext);
    const cooperationData = '';

    useEffect(() => {
        if (cooperationData) {
          setDataInComponents(prevData => [
              ...prevData,
              'cooperation']);
          }
        }, [cooperationData, setDataInComponents]);

    // TODO: implement logic for getting data from db when it's added on server side

    return (
        cooperationData ? (
            <div id="cooperation" className={classes['cooperation-wrapper']}>
                <div className={classes['cooperation']}>
                    <div className={classes['cooperation__title']}>
                        <div className={classes['cooperation__title--block']}>
                            <p className={classes['cooperation__title--text']}>Формат співпраці</p>
                        </div>
                        <div className={classes['cooperation__title--divider']}></div>
                    </div>
                    <div className={classes['cooperation__content--block']}>
                            <div className={classes['cooperation__content--description']}>
                                <ReadMore>
                                    {cooperationData}
                                </ReadMore>
                            </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default Cooperation;
