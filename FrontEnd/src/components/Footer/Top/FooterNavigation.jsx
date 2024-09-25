import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import axios from 'axios';
import css from './FooterNavigation.module.css';
import useScrollToTop from '../../../hooks/useScrollToTop';

const PAGE_NAVIGATION_LINKS = [
  {
    title: 'Головна',
    link: '/',
  },
  {
    title: 'Компанії',
    link: '/profiles/companies',
  },
  {
    title: 'Стартапи',
    link: '/profiles/startups',
  },
  {
    title: 'Про нас',
    link: '/#about-us',
  },
];
const SERVICES_LINKS = [
  {
    title: 'Виробники',
    link: '/profiles/producers',
  },
  {
    title: 'Імпортери',
    link: '/profiles/importers',
  },
  {
    title: 'Роздрібні мережі',
    link: '/profiles/retailers',
  },
  {
    title: 'HORECA',
    link: '/profiles/horeca',
  },
  {
    title: 'Інші послуги',
    link: '/profiles/other-services',
  },
];

function FooterNavigation() {
  useScrollToTop();
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!contacts) {
    return <p>Loading...</p>;
  }

  return (
    <div className={css['navigation-content']}>
      <div className={css['navigation-content-section']}>
        {PAGE_NAVIGATION_LINKS.map((element) => (
          <HashLink
            key={element.link}
            className={css['navigation-content-section__text']}
            to={element.link}
          >
            {element.title}
          </HashLink>
        ))}
      </div>
      <div className={css['navigation-content-section']}>
        {SERVICES_LINKS.map((element) => (
          <Link
            className={css['navigation-content-section-service__text']}
            key={element.link}
            to={element.link}
          >
            {element.title}
          </Link>
        ))}
      </div>
      <div className={css['navigation-content-section']}>
        <p className={css['navigation-content-section-service__text']}>Контакти</p>
        <p className={css['navigation-content-section-service__text']}>{contacts.email}</p>
        <p className={css['navigation-content-section-service__text']}>{contacts.phone}</p>
        <p className={css['navigation-content-section-service__text']}>{contacts.university}</p>
        <p className={css['navigation-content-section-service__text']}>{contacts.address}</p>
     </div>
    </div>
  );
}

export default FooterNavigation;