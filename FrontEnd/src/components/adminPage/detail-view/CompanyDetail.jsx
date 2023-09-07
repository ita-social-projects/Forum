import css from "./UserDetail.module.css";
import DetailCheckbox from "./DetailCheckbox";
import {useState} from "react";
import DeleteModal from "./DeleteModal";

const FIELDS = [
    {
        id: "f1",
        label: "Person",
        form_name: "person",
    },
    {
        id: "f2",
        label: "Position",
        form_name: "person_position",
    },
    {
        id: "f3",
        label: "Company",
        form_name: "comp_name",
    },
    {
        id: "f4",
        label: "Region",
        form_name: "comp_region",
    },
    {
        id: "f5",
        label: "Phone",
        form_name: "comp_phone_number",
    },
    {
        id: "f6",
        label: "EDRPOU",
        form_name: "comp_EDRPOU",
    },
    {
        id: "f7",
        label: "Address",
        form_name: "comp_address",
    },
    {
        id: "f8",
        label: "IsDeleted",
        form_name: "is_deleted",
    },
]


function CompanyDetail(props) {
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
                <h2>#1 SoftServe</h2>
                {FIELDS.map((field) =>(
                    <div key={field.id} className={css["form-section"]}>
                        <label className={css["form-info__text"]}>{field.label}</label>
                        <input id={field.form_name} type="text" className={css["form-input"]}></input>
                    </div>
                ))}
                <DetailCheckbox id="is_active" title="Активний користувач"/>

                <button className={css['save-button']}>Зберегти зміни</button>
            </div>
            <div className={css['delete-section']}>
                <div className={css['form-info__text']}>Видалити акаунт</div>
                <button className={css['button__delete']} onClick={handleDeleteClick}>Видалити</button>
            </div>
        </div>

    );
};

export default CompanyDetail;
