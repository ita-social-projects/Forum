import { useState, useEffect } from 'react';
import css from './UserDetail.module.css';
import DeleteModal from './DeleteModal';

function UserDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('Token');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const pathname = window.location.pathname;
        const userId = pathname.substring(pathname.lastIndexOf('/') + 1);

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${userId}/`,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();

    }, [token]);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${users.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: users.name,
                        surname: users.surname,
                        is_active: users.is_active,
                        is_staff: users.is_staff,
                        is_superuser: users.is_superuser
                    })
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${users.id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className={css['user-detail-page']}>
            <DeleteModal
                active={deleteModalActive}
                setActive={setDeleteModalActive}
                onDelete={handleDeleteUser}
            />
            <div className={css['user-details-section']}>
                {updateSuccess && <p>Користувач успішно оновлений!</p>}
                <ul>
                    <li>Ім&apos;я: {users.name}</li>
                    <li>Прізвище: {users.surname}</li>
                    <li>Email: {users.email}</li>
                    <li>Активний користувач: {users.is_active ? 'Так' : 'Ні'}</li>
                    <li>Персонал: {users.is_staff ? 'Так' : 'Ні'}</li>
                    <li>Суперкористувач: {users.is_superuser ? 'Так' : 'Ні'}</li>
                </ul>
                <div className={css['form-section']}>
                    <label className={css['form-info__text']}>Прізвище</label>
                    <input
                        value={users.surname}
                        onChange={(e) => setUsers({ ...users, surname: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text']}>Ім&apos;я</label>
                    <input
                        value={users.name}
                        onChange={(e) => setUsers({ ...users, name: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text']}>Активний користувач</label>
                    <input
                        type="checkbox"
                        checked={users.is_active}
                        onChange={(e) => setUsers({ ...users, is_active: e.target.checked })}
                        className={css['form-input']}
                    />
                </div>
                <button className={css['save-button']} onClick={handleSaveChanges}>Зберегти зміни</button>
            </div>
            <div className={css['delete-section']}>
                <div className={css['form-info__text']}>Видалити акаунт</div>
                <button className={css['button__delete']} onClick={() => setDeleteModalActive(true)}>Видалити</button>
            </div>
        </div>
    );
}

export default UserDetail;
