import css from './ImageField.module.css';
import scraper from './Vector.png';
import trashBin from './Vectordelete.png';

const ImageField = (props) => {
    return (
        <div className={css['fields__column']}>
            <div className={css['fields__label']}>
                {props.requredField && <label className={css['fields__label--required']}>*</label>}
                <label
                    className={`${css['fields__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
                >
                    {props.label}
                </label>
            </div>
            <div>
                <input
                    id={props.name}
                    type={props.inputType ? props.inputType : 'text'}
                    className={css['upload-file__input']}
                    name={props.name}
                    onChange={props.updateHandler}
                    required={(props.requredField) ? "required" : ""}
                />
                <label className={css["upload-file__label"]} htmlFor={props.name}>
                    <span className={css["upload-file__text"]}>Оберіть файл</span>
                </label>
                {props.value &&
                    <div className={css["upload-file__filename"]}>
                        <img src={scraper} className={css["upload-file__icon"]} alt='' />
                        <div className={css["upload-file__filename--text"]}>{props.value}</div>
                        <span className={css["upload-file__filename--trashBin"]} onClick={() => (props.onDeleteImage(props.name))}>
                            <img src={trashBin} alt='' />
                        </span>
                    </div>
                }
            </div>
            {props.error &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

export default ImageField;


