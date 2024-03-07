import { useState } from 'react';
import { useNavigate } from 'react-router';
import css from './UserDetail.module.css';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import useSWR from 'swr';

function UserDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const userId = usePathUserId();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${userId}/`;
    const navigate = useNavigate();

    const fetcher = url => axios.get(url).then(res => res.data);
    const { data, error: fetchError, isValidating: loading } = useSWR(url, fetcher);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (fetchError) {
        return <p>Error:  {fetchError.message}</p>;
    }
    if (data && !Object.keys(user).length) {
        setUser(data);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                url,
                {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    is_active: user.is_active,
                    is_staff: user.is_staff,
                    is_superuser: user.is_superuser
                },
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUpdateSuccess(true);
        } catch (error) {
            setError(error.message);
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
            const response = await axios.delete(url);
            if (response.status !== 204) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUser([]);
            navigate('/customadmin/users');
        } catch (error) {
            setError(error.message);
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
                {error && <p>Виникла помилка!</p>}
                {updateSuccess && <p>Користувач успішно оновлений!</p>}
                <ul className={css['form-info__user_text']}>
                    <li>Ім&apos;я: {user.name}</li>
                    <li>Прізвище: {user.surname}</li>
                    <li>Email: {user.email}</li>
                    <li>Активний користувач: {user.is_active ? 'Так' : 'Ні'}</li>
                    <li>Персонал: {user.is_staff ? 'Так' : 'Ні'}</li>
                    <li>Компанія: {user.company_name ? 'Так' : 'Ні'}</li>
                </ul>
                <div className={css['form-section']}>
                    <label className={css['form-info__text']}>Прізвище</label>
                    <input
                        value={user.surname}
                        onChange={(e) => setUser({ ...user, surname: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text']}>Ім&apos;я</label>
                    <input
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text']}>Активний користувач</label>
                    <input
                        type="checkbox"
                        checked={user.is_active}
                        onChange={(e) => setUser({ ...user, is_active: e.target.checked })}
                        className={css['form-input_checkbox']}
                    />
                </div>
                <button className={css['save-button']} onClick={handleSaveChanges}>Зберегти зміни</button>
            </div>
            <div className={css['delete-section']}>
                <div className={css['form-info__text']}>
                    {user.company_name ? 'Заборона на видалення, користувач має профіль' : 'Видалити акаунт'}
                </div>
                {!user.company_name && (
                    <button
                        className={css['button__delete']}
                        onClick={() => setDeleteModalActive(true)}
                        disabled={user.company_name}
                    >
                        Видалити
                    </button>
                )}
            </div>
        </div>
    );
}
function usePathUserId() {
    const pathname = window.location.pathname;
    return pathname.substring(pathname.lastIndexOf('/') + 1);
}
export default UserDetail;
