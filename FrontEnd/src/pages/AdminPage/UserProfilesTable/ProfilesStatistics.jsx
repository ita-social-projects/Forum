import React from 'react';
import { Descriptions } from 'antd';
import css from './ProfilesStatistics.module.css';

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

export default ProfilesStatistics;