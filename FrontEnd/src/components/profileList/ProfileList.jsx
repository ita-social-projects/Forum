import { useState, useEffect } from 'react';
import { List } from 'antd';
import ProfileCard from './ProfileCard';
import css from './ProfileList.module.css';

const PAGE_SIZE = 6;

const getCompanyWord = (number) => {
  if (number === 1 || (number > 20 && number % 10 === 1)) {
    return 'компанія';
  } else if ((number >= 2 && number <= 4) || (number > 20 && number % 10 >= 2 && number % 10 <= 4)) {
    return 'компанії';
  } else {
    return 'компаній';
  }
};

const ListHeader = ({ number }) => (
  <div className={css['results-header']}>
    <p className={css['results-header__number']}>{number}</p>
    <p className={css['results-header__text']}>{getCompanyWord(number)}</p>
  </div>
);

export default function ProfileList({
  isAuthorized,
  current,
  data,
  paginationFunc,
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
      pagination={{
        onChange: (page) => {
          paginationFunc(page);
        },
        position: 'bottom',
        align: 'center',
        pageSize: PAGE_SIZE,
        total: data.total_items,
        hideOnSinglePage: true,
        current: current,
      }}
      header={<ListHeader number={data.total_items} />}
      dataSource={data.results}
      split={false}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <ProfileCard
              isAuthorized={isAuthorized}
              data={item}
              savedIsUpdated={savedIsUpdatedMap[item.id]}
              onClearUpdate={(isUpdated) => handleClearUpdate(item.id, isUpdated)}
          />
        </List.Item>
      )}
    />
  );
}
