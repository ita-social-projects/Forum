import { useState, useEffect } from 'react';
import { List } from 'antd';
import CompanyCard from '../../components/CompanyCard/CompanyCard';

export default function ProfileList({
  isAuthorized,
  current,
  data,
  paginationFunc,
  pageSize,
}) {
  const [savedIsUpdatedMap, setSavedIsUpdatedMap] = useState({});

  useEffect(() => {
    const initialMap = data.results.reduce((acc, item) => {
      acc[item.id] = item.saved_is_updated;
      return acc;
    }, {});
    setSavedIsUpdatedMap(initialMap);
  }, [data]);

  const handleClearUpdate = (profileId, isUpdated) => {
    setSavedIsUpdatedMap((prev) => ({
      ...prev,
      [profileId]: isUpdated,
    }));
  };

  return (
    <List
      grid={{
        justify: 'center',
        align: 'stretch',
        gutter: [32, 8],
        xs: 1,
        md: 2,
        xl: 4,
      }}
      pagination={{
        onChange: (page) => {
          paginationFunc(page);
        },
        position: 'bottom',
        align: 'center',
        pageSize: pageSize,
        total: data.total_items,
        hideOnSinglePage: true,
        current: current,
      }}
      dataSource={data.results}
      split={false}
      locale={{emptyText: 'Жодна компанія не відповідає обраному фільтру.'}}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <CompanyCard
              isAuthorized={isAuthorized}
              profile={item}
              savedIsUpdated={savedIsUpdatedMap[item.id]}
              onClearUpdate={(isUpdated) => handleClearUpdate(item.id, isUpdated)}
          />
        </List.Item>
      )}
    />
  );
}
