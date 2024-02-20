import { useState, useEffect } from 'react';
import DeleteModal from './DeleteModal';
import css from './ProfileDetail.module.css';
import axios from 'axios';


function ProfileDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('Token');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const profileId = usePathCompanyId();
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${profileId}/`;
    const companyInfo = [
        { label: 'Ім\'я', key: 'name' },
        { label: 'person_position', key: 'person_position' },
        { label: 'official_name', key: 'official_name' },
        { label: 'region', key: 'region' },
        { label: 'phone', key: 'phone' },
        { label: 'edrpou', key: 'edrpou' },
        { label: 'address', key: 'address' },
    ];

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(
                   url,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                if (response.status !==200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setProfile(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();

    }, [url, profileId, token ]);

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(
                url,
                {
                    name: profile.name,
                    is_deleted: profile.is_deleted,
                },
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setUpdateSuccess(true);
        } catch (error) {
            console.error('Failed to update profile:', error);
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
            const response = await axios.delete(
                url,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to delete profile:', error);
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
