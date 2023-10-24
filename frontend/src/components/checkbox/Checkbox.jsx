import css from './Checkbox.module.css';
function Checkbox(props) {
    return (
        <div className={css['checkbox']}>
            <label >
                <input id={props.id} type="checkbox" />
                {props.title}
            </label>
        </div>
    );
}

export default Checkbox;
