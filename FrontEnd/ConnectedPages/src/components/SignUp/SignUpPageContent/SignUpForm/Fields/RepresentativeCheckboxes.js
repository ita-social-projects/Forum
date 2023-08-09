import css from './RepresentativeCheckboxes.module.css'

function RepresentativeCheckboxesComponent(params) {
    return (<div className={css['representative']}>
        <div className={css['representative__label']}>
            <label className={css['representative__label--required']}>*</label>
            <label className={css['representative__label--text']}>Кого ви представляєте?</label>
        </div>
        <div className={css['representative__checkboxes']}>
            <div className={css['representative__checkboxes--company']}>
                <label className={css['form-control']}>
                    <input type='checkbox' />
                    Зареєстрована компанія
                </label>
            </div>
            <div className={css['representative__checkboxes-startup']}>
                <label className={css['form-control']}>
                    <input type='checkbox' />
                    Стартап проект, який шукає інвестиції
                </label>
            </div>
        </div>
    </div>);
}

export default RepresentativeCheckboxesComponent;