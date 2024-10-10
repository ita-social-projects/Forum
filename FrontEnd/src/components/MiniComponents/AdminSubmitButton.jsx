import classes from './AdminSubmitButton.module.css';

const AdminSubmitButton = ({ disabled }) => {
    return (
        <div className={classes['admin-submit__container']}>
            <button
                className={classes['admin-submit__button']}
                type="submit"
                disabled={disabled}
            >
                Зберегти зміни
            </button>
          </div>
    );
};

export default AdminSubmitButton;