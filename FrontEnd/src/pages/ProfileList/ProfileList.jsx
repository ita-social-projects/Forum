import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import CompanyCard from '../../components/CompanyCard/CompanyCard';

export default function ProfileList({
  isAuthorized,
  emptyText,
  current,
  items,
  profiles,
  paginationFunc,
  pageSize,
  changeCompanies,
}) {
  const [savedIsUpdatedMap, setSavedIsUpdatedMap] = useState({});

  useEffect(() => {
    const initialMap = profiles.reduce((acc, item) => {
      acc[item.id] = item.saved_is_updated;
      return acc;
    }, {});
    setSavedIsUpdatedMap(initialMap);
  }, [profiles]);

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
        gutter: [24, 24],
        xs: 1,
        md: 2,
        xl: 3,
        xxl: 4,
      }}
      pagination={{
        onChange: (page) => {
          paginationFunc(page);
        },
        position: 'bottom',
        align: 'center',
        pageSize: pageSize,
        total: items,
        hideOnSinglePage: true,
        current: current,
      }}
      dataSource={profiles}
      split={false}
      locale={{emptyText: emptyText}}
      renderItem={(item) => (
        <List.Item key={item.id}
          style={{
            marginBlockEnd: '0',
          }}
        >
          <CompanyCard
              isAuthorized={isAuthorized}
              profile={item}
              savedIsUpdated={savedIsUpdatedMap[item.id]}
              onClearUpdate={(isUpdated) => handleClearUpdate(item.id, isUpdated)}
              changeCompanies={changeCompanies}
          />
        </List.Item>
      )}
    />
  );
}

ProfileList.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  current: PropTypes.number.isRequired,
  profiles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        saved_is_updated: PropTypes.bool,
      })
    ).isRequired,
  items: PropTypes.number,
  paginationFunc: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};
