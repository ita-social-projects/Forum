import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Radio } from 'antd';
import useSWR from 'swr';

import ErrorPage404 from '../errorPages/ErrorPage404';
import Loader from '../loader/Loader';
import ProfileList from './ProfileList';

import css from './ProfileListPage.module.css';

export default function ProfileListPage({ isAuthorized }) {
  const { filter } = useParams();

  const [filterSaved, setFilterSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [profileFilter, setProfileFilter] = useState('');

  useEffect(() => {
    switch (filter) {
      case 'companies':
        setProfileFilter('is_registered=True');
        break;
      case 'startups':
        setProfileFilter('is_startup=True');
        break;
      case 'producers':
        setProfileFilter('activities__name=Виробник');
        break;
      case 'importers':
        setProfileFilter('activities__name=Імпортер');
        break;
      case 'retailers':
        setProfileFilter('activities__name=Роздрібна мережа');
        break;
      case 'horeca':
        setProfileFilter('activities__name=HORECA');
        break;
      default:
        break;
    }
    setFilterSaved(false);
  }, [filter]);

  const urlForAll = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/?${profileFilter}&page=${currentPage}`;

  const urlForSaved = `${
    process.env.REACT_APP_BASE_API_URL
  }/api/profiles/?${profileFilter}${
    filterSaved ? '&is_saved=True' : ''
  }&page=${currentPage}`;

  async function fetcher(url) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (isAuthorized) {
      const authToken = localStorage.getItem('Token');
      headers.Authorization = `Token ${authToken}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json());
  }

  const {
    data: fetchedProfiles,
    error,
    isLoading,
  } = useSWR(filterSaved ? urlForSaved : urlForAll, fetcher);

  const handleRadioSelect = () => {
    if (!filterSaved) {
      setCurrentPage(1);
    }
    setFilterSaved(!filterSaved);
  };

  return (
    <div className={css.page}>
      {error ? (
        <ErrorPage404 />
      ) : (
        <div className={css['page-content']}>
          {isAuthorized ? (
            <div className={css.group}>
              <Radio.Group
                onChange={handleRadioSelect}
                value={filterSaved}
                optionType="button"
                buttonStyle="solid"
                size="large"
              >
                <Radio.Button value={false}>Усі</Radio.Button>
                <Radio.Button value={true}>Збережені</Radio.Button>
              </Radio.Group>
            </div>
          ) : null}
          {isLoading ? (
            <Loader />
          ) : (
            <ProfileList
              isAuthorized={isAuthorized}
              isLoading={isLoading}
              data={fetchedProfiles}
              paginationFunc={setCurrentPage}
              current={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
