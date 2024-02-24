import { useState, useEffect } from 'react';
import css from './ProfilesTable.module.css';
import { useNavigate } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';
import axios from 'axios';

const COLUMN_NAMES = [
    'ID', 'Person', 'Position', 'Company', 'Region', 'Phone', 'EDRPOU', 'Adress', 'IsDeleted', 'IsApproved'
];

function ProfilesTable() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const routeChange = (id) => {
        let path = `../../customadmin/profile/${id}`;
        navigate(path);
    };
    const [pageSize, setPageSize] = useState(10);
    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/?page=${currentPage}&page_size=${pageSize}`,
                );
                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setProfiles(response.data.results);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={css['table-profiles']}>
            <PaginationButtons totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}
                pageSize={pageSize} onPageSizeChange={handlePageSizeChange}
            />
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