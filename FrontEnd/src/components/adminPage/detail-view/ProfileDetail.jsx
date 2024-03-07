import { useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteModal from './DeleteModal';
import css from './ProfileDetail.module.css';
import axios from 'axios';
import useSWR from 'swr';

function ProfileDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const profileId = usePathCompanyId();
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${profileId}/`;
    const navigate = useNavigate();
    const companyInfo = [
        { label: 'Ім\'я', key: 'name' },
        { label: 'person_position', key: 'person_position' },
        { label: 'official_name', key: 'official_name' },
        { label: 'region', key: 'region' },
        { label: 'phone', key: 'phone' },
        { label: 'edrpou', key: 'edrpou' },
        { label: 'address', key: 'address' },
    ];

    const fetcher = url => axios.get(url).then(res => res.data);
    const { data, error: fetchError, isValidating: loading } = useSWR(url, fetcher);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (fetchError) {
        return <p>Error:  {fetchError.message}</p>;
    }
    if (data && !Object.keys(profile).length) {
        setProfile(data);
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                url,
                {
                    name: profile.name,
                    is_deleted: profile.is_deleted,
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
            setProfile([]);
            navigate('/customadmin/profiles');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={css['profile-detail-page']}>
            <DeleteModal
                active={deleteModalActive}
                setActive={setDeleteModalActive}
                onDelete={handleDeleteUser}
            />
            <div className={css['profile-details-section']}>
                {error && <p>Виникла помилка!</p>}
                {updateSuccess && <p>Профіль успішно оновлений!</p>}
                <ul className={css['profile-details-section_info']}>
                    {companyInfo.map((info, index) => (
                        <li key={index}>
                            {info.label}: {profile[info.key]}
                        </li>
                    ))}
                    <li>Видалений: {profile.is_deleted ? 'Так' : 'Ні'}</li>
                </ul>
                <div className={css['form-section']}>
                    <label className={css['form-info__text']}>Назва компанії</label>
                    <input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text_checkbox']}>Видалений</label>
                    <input
                        type="checkbox"
                        checked={profile.is_deleted}
                        onChange={(e) => setProfile({ ...profile, is_deleted: e.target.checked })}
                        className={css['form-input_checkbox']}
                    />
                </div>
                <button className={css['save-button']} onClick={handleSaveChanges}>Зберегти зміни</button>
            </div>
            <div className={css['delete-section']}>
                <div className={css['form-info__text']}>Видалити Профіль</div>
                <button className={css['button__delete']} onClick={() => setDeleteModalActive(true)}>Видалити</button>
            </div>
        </div>
    );
}

function usePathCompanyId() {
    const pathname = window.location.pathname;
    return pathname.substring(pathname.lastIndexOf('/') + 1);
}
export default ProfileDetail;
