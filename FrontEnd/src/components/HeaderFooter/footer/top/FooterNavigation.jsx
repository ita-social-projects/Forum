import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import css from './FooterNavigation.module.css';

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
    link: '#',
  },
];
const CONTACTS = [
  'Контакти',
  'qwerty@gmail.com',
  '+38 050 234 23 23',
  'Львівська Політехніка',
  'вул. Степана Бандери 12, Львів',
];

function FooterNavigation() {
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
        {CONTACTS.map((element, index) => (
          <p
            key={index}
            className={css['navigation-content-section-service__text']}
          >
            {element}
          </p>
        ))}
      </div>
    </div>
  );
}

export default FooterNavigation;
