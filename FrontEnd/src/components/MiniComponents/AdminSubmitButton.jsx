import classes from './AdminSubmitButton.module.css';

const AdminSubmitButton = () => {
    return (
        <div className={classes['admin-submit__container']}>
            <button
                className={classes['admin-submit__button']}
                type="submit"
            >
                Зберегти зміни
            </button>
          </div>
    );
};

export default AdminSubmitButton;