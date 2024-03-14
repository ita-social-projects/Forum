import { useState } from 'react';
import css from './ProfilesTable.module.css';
import { useNavigate } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';
import axios from 'axios';
import useSWR from 'swr';
import { DEFAULT_PAGE_SIZE } from '../AdminConstants';

const COLUMN_NAMES = [
    'ID', 'Person', 'Position', 'Company', 'Region', 'Phone', 'EDRPOU', 'Adress', 'IsDeleted', 'IsApproved'
];

function ProfilesTable() {
    const navigate = useNavigate();
    const routeChange = (id) => {
        const path = `../../customadmin/profile/${id}`;
        navigate(path);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/?page=${currentPage}&page_size=${pageSize}`;

    async function fetcher(url) {
        const response = await axios.get(url);
        return response.data;
    }
    const { data, error, isValidating: loading } = useSWR(url, fetcher);

    const profiles = data ? data.results : [];

    return (
        <div className={css['table-profiles']}>
            <PaginationButtons
                totalPages={data ? data.total_pages : 1}
                currentPage={currentPage} onPageChange={handlePageChange}
                pageSize={pageSize} onPageSizeChange={handlePageSizeChange}
            />
            <ul className={css['log-section']}>
                {loading && <li className={css['log']} >Завантаження ...</li>}
                {error && <li className={css['log']}>Виникла помилка: {error}</li>}
            </ul>
            <table className={css['table-section']}>
                <thead>
                    <tr className={css['table-header']}>
                        {COLUMN_NAMES.map((column) => (
                            <th key={column} className={css['table-header__text']}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {profiles.map(profile => (
                        <tr key={profile.id} className={css['table-element']} onClick={() => routeChange(profile.id)}>
                            <td className={css['table-element__text']}>{profile.id} </td>
                            <td className={css['table-element__text']}>
                                {profile.person.name} - {profile.person.surname}
                            </td>
                            <td className={css['table-element__text']}>{profile.person_position} </td>
                            <td className={css['table-element__text']}>{profile.official_name} </td>
                            <td className={css['table-element__text']}>{profile.region} </td>
                            <td className={css['table-element__text']}>{profile.phone} </td>
                            <td className={css['table-element__text']}>{profile.edrpou} </td>
                            <td className={css['table-element__text']}>{profile.address} </td>
                            <td className={css['table-element__text']}>{profile.is_deleted ? 'True' : 'False'} </td>
                            <td className={css['table-element__text']}>{profile.is_registered ? 'True' : 'False'} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default ProfilesTable;