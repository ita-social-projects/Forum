import css from "./Checkbox.module.css";
function Checkbox(props) {
    return (
        <div className={css["user-detail-checkbox"]}>
            <label >
                <input id={props.id} type="checkbox" />
                {props.title}
            </label>
        </div>
    );
}

export default Checkbox;
