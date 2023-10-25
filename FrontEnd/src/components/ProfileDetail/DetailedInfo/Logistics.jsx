import classes from './Logistics.module.css';
import ReadMore from './ReadMore';

function Logistics () {
    return (
        <div id="logistics" className={classes['logistics-wrapper']}>
            <div className={classes['logistics']}>
                <div className={classes['logistics__title']}>
                    <div className={classes['logistics__title--block']}>
                        <p className={classes['logistics__title--text']}>Логістика товарів / послуг</p>
                    </div>
                    <div className={classes['logistics__title--divider']}></div>
                </div>
                <div className={classes['logistics__content--block']}>
                    <p className={classes['logistics__content--description']}>
                        <ReadMore>
                        </ReadMore>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Logistics;
