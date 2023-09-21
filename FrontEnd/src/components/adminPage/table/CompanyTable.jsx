import css from "./Table.module.css"
import {useNavigate} from "react-router-dom";
import PaginationButtons from "./PaginationButtons";

const COLUMN_NAMES = ["ID", "Person", "Position", "Company", "Region", "Phone", "EDRPOU", "Adress", "IsDeleted", "IsApproved"]

const COMPANIES = [
    {
        id: 1,
        person: 1,
        person_position: "Trainee",
        comp_name: "SoftServe",
        comp_region: "West",
        comp_phone_number: "+380997777778",
        comp_EDRPOU: 459345389,
        comp_address: "st. Sadova 2A",
        is_deleted: "false",
        is_approved: "true"
    },
    {
        id: 2,
        person: 2,
        person_position: "Junior",
        comp_name: "EPAM",
        comp_region: "East",
        comp_phone_number: "+380996667778",
        comp_EDRPOU: 559377389,
        comp_address: "st. Ugorska 3A",
        is_deleted: "false",
        is_approved: "true"
    },
    {
        id: 3,
        person: 3,
        person_position: "Intermediate",
        comp_name: "GlobalLogic",
        comp_region: "North",
        comp_phone_number: "+38098747778",
        comp_EDRPOU: 339366389,
        comp_address: "st. Pekarska 22",
        is_deleted: "false",
        is_approved: "true"
    },
    {
        id: 4,
        person: 4,
        person_position: "Senior",
        comp_name: "Intellias",
        comp_region: "South",
        comp_phone_number: "+3809765478",
        comp_EDRPOU: 119977389,
        comp_address: "sq. Soborna 77",
        is_deleted: "false",
        is_approved: "true"
    },
    {
        id: 5,
        person: 5,
        person_position: "CEO",
        comp_name: "EveryMatrix",
        comp_region: "Lviv",
        comp_phone_number: "+3809543478",
        comp_EDRPOU: 101077389,
        comp_address: "sq. Petrushenicha 7",
        is_deleted: "false",
        is_approved: "true"
    },
]

function CompanyTable() {

    let navigate = useNavigate();
    const routeChange = (id) =>{
        let path = `/admin/company/${id}`;
        navigate(path);
    }

    return (
        <div>
            <PaginationButtons></PaginationButtons>
            <table  className={css["table-section"]}>
            <thead>
                <tr className={css["table-header"]}>
                    {COLUMN_NAMES.map((column) =>(
                        <th className={css["table-header__text"]}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {COMPANIES.map((company) =>(
                    <tr className={css["table-element"]} onClick={() => routeChange(company.id)}>
                        <td className={css["table-element__text"]}>{company.id}</td>
                        <td className={css["table-element__text"]}>{company.person}</td>
                        <td className={css["table-element__text"]}>{company.person_position}</td>
                        <td className={css["table-element__text"]}>{company.comp_name}</td>
                        <td className={css["table-element__text"]}>{company.comp_region}</td>
                        <td className={css["table-element__text"]}>{company.comp_phone_number}</td>
                        <td className={css["table-element__text"]}>{company.comp_EDRPOU}</td>
                        <td className={css["table-element__text"]}>{company.comp_address}</td>
                        <td className={css["table-element__text"]}>{company.is_deleted}</td>
                        <td className={css["table-element__text"]}>{company.is_approved}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default CompanyTable;
