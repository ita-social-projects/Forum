import css from './CompanyFields.module.css'

function CompanyFieldsComponent(props) {
    const errorMessage = props.error;
    return (
        <div className={css['company-field']}>
            <div className={css['company-field__column']}>
            <div className={css['company-field__label']}>
                <label className={css['company-field__label--required']}>*</label>
                <label className={css['company-field__label--text']}>Назва компанії</label>
            </div>
            <div className={css['company-field__field']}>
                <input
                    className={css['company-field__field--input']}
                    name='companyName'
                    // value={props.value}
                    placeholder='Назва компанії'
                    onChange={props.companyNameChangeHandler}
                    required
                />
            </div>
            <div className={css['error-message']}>
                {errorMessage}            
            </div>
            </div>
            
        </div>
    );
}

export default CompanyFieldsComponent;