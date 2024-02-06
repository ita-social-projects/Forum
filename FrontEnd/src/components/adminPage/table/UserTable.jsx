import { useState, useEffect } from 'react';
import css from './Table.module.css';
import { useNavigate } from 'react-router-dom';
import PaginationButtons from './PaginationButtons';

const COLUMN_NAMES = ['ID', 'ФІО', 'Пошта', 'Телефон'];

function UserTable() {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const routeChange = (id) => {
        let path = `/admin/users/${id}`;
        navigate(path);
    };
    const token = localStorage.getItem('Token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/admin/users/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUser(data.results);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div>
            <PaginationButtons></PaginationButtons>
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
                            <td className={css['table-element__text']}>{user.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
