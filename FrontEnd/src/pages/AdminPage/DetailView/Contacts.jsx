import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './Contacts.module.css';

const Contacts = () => {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_API_URL;
                const response = await axios.get(`${baseUrl}/api/admin/contacts/`);
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setError('Не вдалося отримати контактну інформацію');
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) return <div className={css['loading']}>Loading...</div>;
    if (error) return <div className={css['error']}>{error}</div>;

    return (
        <div className={css['contacts-container']}>
            <h3>Контактна інформація</h3>
            {contacts ? (
                <div className={css['contacts-info']}>
                    <p>Email: {contacts.email}</p>
                    <p>Телефон: {contacts.phone}</p>
                    <p>Університет: {contacts.university}</p>
                    <p>Адреса: {contacts.address}</p>
                </div>
            ) : (
                <p>Контактна інформація недоступна</p>
            )}
        </div>
    );
};

export default Contacts;
