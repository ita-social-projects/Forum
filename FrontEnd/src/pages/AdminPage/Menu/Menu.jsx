import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import css from './Menu.module.css';

import React from 'react';
import { Descriptions } from 'antd';

const items = [
    {
      key: '1',
      label: 'Кількість зареєстрованих компаній',
      children: '2',
    },
    {
      key: '2',
      label: 'Кількість Інвесторів',
      children: '22',
    },
    {
      key: '3',
      label: 'Кількість стратапів',
      children: '222',
    },
    {
      key: '4',
      label: 'Кількість заблокованих компаній',
      children: '2222',
    }
  ];

const MENU = [
    {
        id: 'am1',
        title: 'Керування користувачами',
        link: '/customadmin/users/'
    },
    {
        id: 'am2',
        title: 'Керування компаніями',
        link: '/customadmin/profiles/'
    },
    {
        id: 'am3',
        title: 'Керування контактами',
        link: '/customadmin/contacts/'
    },
    {
        id: 'am4',
        title: 'Налаштування часу автоапруву',
        link: '/customadmin/automoderation/'
    },
];

const ProfilesStatistics = () => <Descriptions
    title="Сompanies Statistics"
    column={1}
    bordered
    size="small"
    items={items.map((item) => ({
        ...item,
        label: <span className={css['description-item-label']}>{item.label}</span>,
        children: <span className={css['description-item-content']}>{item.children}</span>
    }))} />;

const SUPERUSER_MENU = [
    {
        id: 'am5',
        title: 'Пошта адміністратора',
        link: '/customadmin/email/'
    },
    {
        id: 'am6',
        title: 'Реєстрація адміністратора',
        link: '/customadmin/admin-create/'
    }

];

function Menu() {
    const { isSuperUser } = useAuth();
    const location = useLocation();

    return (
        <div className={css['menu-section']}>
            {[
                ...MENU,
                ...(isSuperUser ? SUPERUSER_MENU : [])
            ].map((element) => (
                <NavLink
                    className={({ isActive }) => (`${css['menu-section-element']} ${isActive && css['menu-section-element__active']}`)}
                    key={element.id} to={element.link}>{element.title}
                </NavLink>
            ))}
            {location.pathname === '/customadmin/profiles/' && <ProfilesStatistics />}
        </div>
    );
}

export default Menu;
