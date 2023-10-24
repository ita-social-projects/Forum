import css from './PaginationButtons.module.css';

function PaginationButtons() {
    return (
        <div className={css['buttons-section']}>
            <div className={css['buttons-section-content']}>
                <button className={css['pagination-button']}>&#60;</button>
                <label className={css['pagination-counter']}>1/5</label>
                <button className={css['pagination-button']}>&#62;</button>
            </div>

        </div>
    );
}

export default PaginationButtons;
