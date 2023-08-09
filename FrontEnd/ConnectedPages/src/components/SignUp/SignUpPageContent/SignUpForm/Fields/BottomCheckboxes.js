import css from './BottomCheckboxes.module.css'
import RepresentativeCheckboxesComponent from './RepresentativeCheckboxes';


function BottomCheckboxesComponent() {
    return <div className={css['checkboxes-block']}>
        <RepresentativeCheckboxesComponent />
        <div className={css['rules-agreement']}>
            <div className={css['rules-agreement__content']}>
                <label className={css['rules-agreement__text--required']}>*</label>
                <label className={css['rules-agreement__text']}>
                    <input type='checkbox' />
                    Погоджуюсь з 
                </label>
                <a href='#' className={css['rules-agreement_link']}>правилами використання</a>
            </div>
        </div>
    </div>
}

export default BottomCheckboxesComponent;