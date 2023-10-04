import css from './FooterNavigation.module.css';
import { HashLink } from 'react-router-hash-link';

const PAGE_NAVIGATION_LINKS = [
  {
    id: 'pnl0',
    title: 'Головна',
    link: '/',
  },
  {
    id: 'pnl1',
    title: 'Компанії',
    link: '#',
  },
  {
    id: 'pnl2',
    title: 'Стартапи',
    link: '#',
  },
  {
    id: 'pnl3',
    title: 'Про нас',
    link: '/#about-us',
  },
];
const SERVICES_LINKS = [
  {
    id: 'sl0',
    title: 'Виробники',
    link: '#',
  },
  {
    id: 'sl1',
    title: 'Імпортери',
    link: '#',
  },
  {
    id: 'sl2',
    title: 'Роздрібні мережі',
    link: '#',
  },
  {
    id: 'sl3',
    title: 'HORECA',
    link: '#',
  },
  {
    id: 'sl4',
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
            key={element.id}
            className={css['navigation-content-section__text']}
            to={element.link}
          >
            {element.title}
          </HashLink>
        ))}
      </div>
      <div className={css['navigation-content-section']}>
        {SERVICES_LINKS.map((element) => (
          <a
            className={css['navigation-content-section-service__text']}
            key={element.id}
            href={element.link}
          >
            {element.title}
          </a>
        ))}
      </div>
      <div className={css['navigation-content-section']}>
        {CONTACTS.map((element, index) => (
          <label
            key={index}
            className={css['navigation-content-section-service__text']}
          >
            {element}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FooterNavigation;
