import { useState, useEffect } from 'react';
import css from './Table.module.css';
import {useNavigate} from 'react-router-dom';
import PaginationButtons from './PaginationButtons';

const COLUMN_NAMES = [
    'ID', 'Person', 'Position', 'Company', 'Region', 'Phone', 'EDRPOU', 'Adress', 'IsDeleted', 'IsApproved'
];



const ProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const routeChange = (id) =>{
        let path = `company=${id}`;
        navigate(path);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/admin/profiles/`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProfiles(data.results);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
};

export default ProfilesPage;