import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import css from './FooterNavigation.module.css';


const PAGE_NAVIGATION_LINKS = [
  {
    title: 'Компанії',
    link: '/profiles/companies',
  },
  {
    title: 'Стартапи',
    link: '/profiles/startups',
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


  return (
    <div className={css['navigation-content']}>
      <div className={css['navigation-content__company']}>
        <h3 className={css['navigation-content-company__header']}>Підприємства</h3>
        <div className={css['navigation-content-company__text-block']}>
        {PAGE_NAVIGATION_LINKS.map((element) => (
          <HashLink
            key={element.link}
            className={css['navigation-content-company__text']}
            to={element.link}
          >
            {element.title}
          </HashLink>
        ))}
        </div>
      </div>
      <div className={css['navigation-content__section']}>
        <h3 className={css['navigation-content-section__header']}>Сектори</h3>
        <div  className={css['navigation-content-section__text-block']}>
        {SERVICES_LINKS.map((element) => (
          <Link
            className={css['navigation-content-section__text']}
            key={element.link}
            to={element.link}
          >
            {element.title}
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

export default FooterNavigation;