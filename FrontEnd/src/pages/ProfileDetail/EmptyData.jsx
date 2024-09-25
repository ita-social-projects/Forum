import classes from './EmptyData.module.css';

function EmptyData () {
    return (
        <div className={classes['empty-data-wrapper']}>
            <p className={classes['empty-data']}>
                Інформація не заповнена
            </p>
        </div>
    );
}

export default EmptyData;
