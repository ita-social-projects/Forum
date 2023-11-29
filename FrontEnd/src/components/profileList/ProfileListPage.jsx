import { useEffect, useState } from 'react';

import { Radio } from 'antd';
import useSWR from 'swr';

import ErrorPage404 from '../errorPages/ErrorPage404';
import Loader from '../loader/Loader';
import ProfileList from './ProfileList';

import css from './ProfileListPage.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfileListPage({ isAuthorized }) {
  const { filter } = useParams();

  const [filterSaved, setFilterSaved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [profileFilter, setProfileFilter] = useState('');

  useEffect(() => {
    const FILTER_MAP = {
      companies: 'is_registered=True',
      startups: 'is_startup=True',
      producers: 'activities__name=Виробник',
      importers: 'activities__name=Імпортер',
      retailers: 'activities__name=Роздрібна мережа',
      horeca: 'activities__name=HORECA'
    };
    setProfileFilter(FILTER_MAP[filter]);
    setFilterSaved(false);
  }, [filter]);

  const urlForAll = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/?${profileFilter}&page=${currentPage}`;

  const urlForSaved = `${
    process.env.REACT_APP_BASE_API_URL
  }/api/profiles/?${profileFilter}${
    filterSaved ? '&is_saved=True' : ''
  }&page=${currentPage}`;

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const fetchUrl = filterSaved ? urlForSaved : urlForAll;

  const {
    data: fetchedProfiles,
    error,
    isLoading,
  } = useSWR(
    fetchUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

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
