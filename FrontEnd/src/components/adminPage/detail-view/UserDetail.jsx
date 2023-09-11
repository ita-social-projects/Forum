import css from "./UserDetail.module.css";
import Checkbox from "./Checkbox";
import {useState} from "react";
import DeleteModal from "./DeleteModal";

const FIELDS = [
    {
        id: "f1",
        label: "Прізвище",
        form_name: "lastname",
    },
    {
        id: "f2",
        label: "Ім'я",
        form_name: "name",
    },
    {
        id: "f3",
        label: "Електронна пошта",
        form_name: "email",
    },
    {
        id: "f4",
        label: "Номер телефону",
        form_name: "phone_number",
    }
]


function UserDetail(props) {
    const [deleteModalActive, setDeleteModalActive] = useState(false);

    const handleDeleteClick = () => {
        setDeleteModalActive(true)
    }

    return (
        <div className={css['user-detail-page']}>
            <DeleteModal
                active={deleteModalActive}
                setActive={setDeleteModalActive}
            />
            <div className={css["user-details-section"]}>
                <h2>#22 Тарас Панасюк</h2>
                {FIELDS.map((field) =>(
                    <div key={field.id} className={css["form-section"]}>
                        <label className={css["form-info__text"]}>{field.label}</label>
                        <input id={field.form_name} type="text" className={css["form-input"]}></input>
                    </div>
                ))}
                <Checkbox id="is_active" title="Активний користувач"/>

                <button className={css['save-button']}>Зберегти зміни</button>
            </div>
            <div className={css['delete-section']}>
                <div className={css['form-info__text']}>Видалити акаунт</div>
                <button className={css['button__delete']} onClick={handleDeleteClick}>Видалити</button>
            </div>
        </div>

    );
};

export default UserDetail;
