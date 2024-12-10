import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';
import css from './ProfilesStatistics.module.css';

function ProfilesStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchStatistics = async () => {
          try {
              const baseUrl = process.env.REACT_APP_BASE_API_URL;
              const response = await axios.get(`${baseUrl}/api/admin/profiles/statistics/`);
              setStatistics(response.data);
          } catch (error) {
              console.error('Error fetching statistics:', error);
              setError('Не вдалось отримати статистику компаній');
          } finally {
              setLoading(false);
          }
      };

      fetchStatistics();
  }, []);

  if (loading) return <div className={css['loading']}>Loading...</div>;
  if (error) return <div className={css['error']}>{error}</div>;

  const items = [
    {
      key: '1',
      label: 'Кількість зареєстрованих компаній',
      children: statistics.companies_count,
    },
    {
      key: '2',
      label: 'Кількість Інвесторів',
      children: statistics.investors_count,
    },
    {
      key: '3',
      label: 'Кількість Cтратапів',
      children: statistics.startups_count,
    },
    {
      key: '4',
      label: 'Кількість заблокованих компаній',
      children: statistics.blocked_companies_count,
    },
  ];

  return (
    <Descriptions
      title="Статистика компаній"
      column={1}
      bordered
      size="small"
      items={items.map((item) => ({
        ...item,
        label: (
          <span className={css['description-item-label']}>{item.label}</span>
        ),
        children: (
          <span className={css['description-item-content']}>
            {item.children}
          </span>
        ),
      }))}
    />
  );
}

export default ProfilesStatistics;
