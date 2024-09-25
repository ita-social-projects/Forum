import { useEffect } from 'react';
import { useContext } from 'react';
import { ActiveLinksContext } from '../../../context/ActiveLinksContext';
import classes from './Cooperation.module.css';
import ReadMore from './ReadMore';

function Cooperation () {
    const { setActiveLinks } = useContext(ActiveLinksContext);
    const cooperationData = '';

    useEffect(() => {
        if (cooperationData) {
            setActiveLinks(prevData => [
              ...prevData,
              'cooperation']);
          }
        }, [cooperationData, setActiveLinks]);

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
