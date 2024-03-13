import { useState } from 'react';
import css from './UserTable.module.css';
import { useNavigate } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';
import axios from 'axios';
import useSWR from 'swr';

const COLUMN_NAMES = ['ID', 'ФІО', 'Пошта'];

function UserTable() {
    const navigate = useNavigate();
    const routeChange = (id) => {
        let path = `../../customadmin/users/${id}`;
        navigate(path);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/?page=${currentPage}&page_size=${pageSize}`;

    async function fetcher(url) {
        const response = await axios.get(url);
        return response.data;
    }
    const { data, error, isValidating: loading } = useSWR(url, fetcher);

    const users = data ? data.results : [];

    return (
        <div>
            <PaginationButtons
                totalPages={data ? data.total_pages : 1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
            />
            <ul className={css['log-section']}>
                {loading && <li className={css['log']} >Завантаження ...</li>}
                {error && <li className={css['log']}>Виникла помилка: {error}</li>}
            </ul>
            <table className={css['table-section']}>
                <thead>
                    <tr className={css['table-header']}>
                        {COLUMN_NAMES.map((column) => (
                            <th key={column} className={css['table-header__text']}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={css['table-element']} onClick={() => routeChange(user.id)}>
                            <td className={css['table-element__text']}>{user.id}</td>
                            <td className={css['table-element__text']}>
                                {user.surname} {user.name}
                            </td>
                            <td className={css['table-element__text']}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
