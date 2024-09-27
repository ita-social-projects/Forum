import { useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteModal from './DeleteModal';
import css from './ProfileDetail.module.css';
import axios from 'axios';
import useSWR from 'swr';

function ProfileDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [profile, setProfile] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const profileId = usePathCompanyId();
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${profileId}/`;
    const navigateToProfiles = useNavigate();
    const companyInfo = [
        { label: 'Ім\'я', key: 'name' },
        { label: 'person_position', key: 'person_position' },
        { label: 'official_name', key: 'official_name' },
        { label: 'region', key: 'regions' },
        { label: 'phone', key: 'phone' },
        { label: 'edrpou', key: 'edrpou' },
        { label: 'address', key: 'address' },
    ];

    const fetcher = url => axios.get(url).then(res => res.data);
    const { data, error, isValidating: loading } = useSWR(url, fetcher);

    if (data && !Object.keys(profile).length) {
        setProfile(data);
    }

    const handleSaveChanges = async () => {
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
        setTimeout(() => setUpdateSuccess(false), 3000);
    };

    const handleDeleteUser = async () => {
        const response = await axios.delete(url);
        if (response.status !== 204) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setProfile({});
        navigateToProfiles('/customadmin/profiles');
    };

    return (
        <div className={css['profile-detail-page']}>
            <DeleteModal
                active={deleteModalActive}
                setActive={setDeleteModalActive}
                onDelete={handleDeleteUser}
            />
            <div className={css['profile-details-section']}>
                <ul className={css['log-section']}>
                    {loading && <li className={css['log']} >Завантаження ...</li>}
                    {error && <li className={css['log']}>Виникла помилка: {error}</li>}
                    {updateSuccess && <li className={css['log']}>Профіль успішно оновлений!</li>}
                </ul>
                <ul className={css['profile-details-section_info']}>
                    {companyInfo.map((info, index) => (
                        <li key={index}>
                            {info.label}: {
                                Array.isArray(profile[info.key]) ?
                                    profile[info.key].map(region => (
                                        <p key={region.id}> {region.name_ukr} </p>
                                    )) :
                                    profile[info.key]
                            }
                        </li>
                    ))}
                    <li>Видалений: {profile.is_deleted ? 'Так' : 'Ні'}</li>
                </ul>
                <div className={css['form-section']}>
                    <label className={css['form-info__text']}>Назва компанії</label>
                    <input
                        value={profile.name || ''}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text_checkbox']}>Видалений</label>
                    <input
                        type="checkbox"
                        checked={profile.is_deleted || false}
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
