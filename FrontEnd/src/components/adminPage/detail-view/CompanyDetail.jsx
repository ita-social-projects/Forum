import { useState, useEffect } from 'react';
import DeleteModal from './DeleteModal';
import css from './CompanyDetail.module.css';


function CompanyDetail() {
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [error, setError] = useState(null);
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('Token');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const companyId = usePathCompanyId();

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
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${companyId}/`,
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
                setCompany(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();

    }, [companyId, token ]);

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${companyId}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: company.name,
                        is_deleted: company.is_deleted,
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
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/${companyId}/`,
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
                {updateSuccess && <p>Профіль успішно оновлений!</p>}
                <ul>
                    {companyInfo.map((info, index) => (
                        <li key={index}>
                            {info.label}: {company[info.key]}
                        </li>
                    ))}
                    <li>Видалений: {company.is_deleted ? 'Так' : 'Ні'}</li>
                </ul>
                <div className={css['form-section']}>
                    <label className={css['form-info__text']}>Назва компанії</label>
                    <input
                        value={company.name}
                        onChange={(e) => setCompany({ ...company, name: e.target.value })}
                        type="text"
                        className={css['form-input']}
                    />
                    <label className={css['form-info__text_checkbox']}>Видалений</label>
                    <input
                        type="checkbox"
                        checked={company.is_deleted}
                        onChange={(e) => setCompany({ ...company, is_deleted: e.target.checked })}
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
export default CompanyDetail;
