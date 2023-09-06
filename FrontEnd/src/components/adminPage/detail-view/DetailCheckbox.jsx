import css from "./DetailCheckbox.module.css";
function DetailCheckbox(props) {
    return (
        <div className={css["user-detail-checkbox"]}>
            <label >
                <input id={props.id} type="checkbox" />
                {props.title}
            </label>
        </div>
    );
}

export default DetailCheckbox;
