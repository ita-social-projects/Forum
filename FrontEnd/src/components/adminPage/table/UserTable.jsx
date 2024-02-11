import { useState, useEffect } from 'react';
import css from './Table.module.css';
import { useNavigate } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';

const COLUMN_NAMES = ['ID', 'ФІО', 'Пошта',];

function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const token = localStorage.getItem('Token');
    const routeChange = (id) => {
        let path = `../../customadmin/users/${id}`;
        navigate(path);
    };
    const [pageSize, setPageSize] = useState(3);
    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/?page=${currentPage}&page_size=${pageSize}`,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data.results);
                setTotalPages(data.total_pages);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, pageSize, token]);

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
        <div>
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
                    {users.map((user) => (
                        <tr key={user.id} className={css['table-element']} onClick={() => routeChange(user.id)}>
                            <td className={css['table-element__text']}>{user.id}</td>
                            <td className={css['table-element__text']}>{user.surname} {user.name}</td>
                            <td className={css['table-element__text']}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
