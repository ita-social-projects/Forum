import { useState, useEffect } from 'react';
import axios from 'axios';
import css from './FooterAddress.module.css';


function FooterAddress() {
    const [contacts, setContacts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/contacts/`;
                const response = await axios.get(url);
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setError('Не вдалося отримати контактну інформацію');
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className={css['footer-address__block']}>
            <img
                className={css['footer-logo']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/craftMerge-logo-white.svg`}
                alt="Footer craft merge logo"
                title="CraftMerge">
            </img>
            {error ? (
                <p className={css['footer-address__error']} style={{ color: 'white' }}>
                    {error}
                </p>
            ) : contacts && (
                <>
                    <div className={css['footer-address__company']}>
                        <p className={css['footer-address__text']}>{contacts.university}</p>
                        <p className={css['footer-address__text']}>{contacts.address}</p>
                    </div>
                    <div className={css['footer-address__contacts']}>
                        <p className={css['footer-address__text']}>{contacts.email}</p>
                        <p className={css['footer-address__text']}>{contacts.phone}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default FooterAddress;
