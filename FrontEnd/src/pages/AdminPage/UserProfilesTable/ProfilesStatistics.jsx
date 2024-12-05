import React from 'react';
import { Descriptions } from 'antd';
const items = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
    span: 3
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
    span: 3
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
    span: 3
  },
  {
    key: '4',
    label: 'Automatic Renewal',
    children: 'YES',
    span: 3
  }
];
const ProfilesStatistics = () => <Descriptions title="User Info" bordered items={items} />;
export default ProfilesStatistics;