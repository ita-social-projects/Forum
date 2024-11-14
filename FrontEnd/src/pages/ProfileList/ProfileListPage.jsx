import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import useSWR from 'swr';

import useWindowWidth from '../../hooks/useWindowWidth';

import ErrorPage404 from '../ErrorPages/ErrorPage404';
import Loader from '../../components/Loader/Loader';
import ProfileListHeader from './ProfileListHeader';
import ProfileList from './ProfileList';

import css from './ProfileListPage.module.css';

const COMPANY_TYPE = [
  { title: 'Усі підприємства', key: 'all', value: '' },
  { title: 'Компанії', key: 'companies', value: 'companies' },
  { title: 'Стартапи', key: 'startups', value: 'startups' },
];

const ACTIVITY_TYPE = [
  { title: 'Усі сектори', key: 'all', value: '' },
  { title: 'Виробники', key: 'producers', value: 'producers' },
  { title: 'Імпортери', key: 'importers', value: 'importers' },
  { title: 'Роздрібні мережі', key: 'retailers', value: 'retailers' },
  { title: 'HORECA', key: 'horeca', value: 'horeca' },
  { title: 'Інші послуги', key: 'other-services', value: 'other-services' },
];

export default function ProfileListPage({ isAuthorized }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const companyType = searchParams.get('companyType') || '';
  const activity = searchParams.get('activity') || '';
  const [filters, setFilters] = useState([]);
  const [url, setUrl] = useState(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/?ordering=name&page=${currentPage}`);

  const [activeTab, setActiveTab] = useState('all');
  const [activeBtn, setActiveBtn] = useState('all');

  const windowWidth = useWindowWidth();
  const linkText = windowWidth >= 768 ? 'Усі підприємства' : 'Усі';

  const companyTypeMap = {
    '': '',
    companies: 'is_registered=True',
    startups: 'is_startup=True',
  };

  const activityTypeMap = {
    '': '',
    producers: 'activities__name=Виробник',
    importers: 'activities__name=Імпортер',
    retailers: 'activities__name=Роздрібна мережа',
    horeca: 'activities__name=HORECA',
    'other-services': 'activities__name=Інші послуги',
  };

  useEffect(() => {

    const companyTypeFilter = companyTypeMap[companyType] || '';
    const activityTypeFilter = activityTypeMap[activity] || '';

    setFilters([companyTypeFilter, activityTypeFilter].filter(Boolean));
    setCurrentPage(1);
  }, [companyType, activity]);

  useEffect(() => {
    const baseUrl = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/`;
    let queryString = `?ordering=name&page=${currentPage}`;
    if (filters.length === 2) {
      queryString = `?${filters.join('&')}&ordering=name&page=${currentPage}`;
    } else if (filters.length === 1) {
      queryString = `?${filters[0]}&ordering=name&page=${currentPage}`;
    }
    const newUrl = `${baseUrl}${queryString}`;
    setUrl(newUrl);
  }, [filters]);

  const handleFilters = (companyType, activity) => {
    if (companyType) {
      searchParams.set('companyType', companyType);

    } else {
      searchParams.delete('companyType');
    }

    if (activity) {
      searchParams.set('activity', activity);
    } else {
      searchParams.delete('activity');
    }

    setSearchParams(searchParams);
  };
  const handleActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  };

  const handleActiveBtn = (activeBtn) => {
    setActiveBtn(activeBtn);
  };

  const updateQueryParams = (newPage) => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateQueryParams(page);
  };

  async function fetcher(url) {
    return axios.get(url)
    .then(res => res.data);
  }

  const {
    data: fetchedProfiles,
    error,
    isLoading,
  } = useSWR(url, fetcher);

  return (
    <div className={css.page}>
      {error && error.response.status !==401 ? (
        <ErrorPage404 />
      ) : (
        <div className={css['page-content']}>
          <div className={css['company-list__header--wrapper']}>
            <div className={css['company-list__header']}>
                  <h2 className={css['company-list__title']}>
                      Підприємства та сектори
                  </h2>
                  <div className={css['company-list__tabs']}>
                    {COMPANY_TYPE.map((item) => (
                      <div
                        key={item.key}
                        className={css['company-list__tabs--wrapper']}>
                        <span
                          className={activeTab === item.key ?
                            css['company-list__tabs--element--active'] :
                            css['company-list__tabs--element']}
                          onClick={() => (handleFilters(item.value, activity), handleActiveTab(item.key))}
                        >
                          {item.title === 'Усі підприємства' ? linkText : item.title}
                        </span>
                        <span className={activeTab === item.key ? css['divider'] : ''}>
                        </span>
                      </div>
                    ))}
                  </div>
              </div>
            </div>
          <div className={css['company-list__content']}>
            <div className={css['company-list__content--btns-wrapper']}>
              <div className={css['company-list__content--btns']}>
                {ACTIVITY_TYPE.map((item) => (
                  <button
                    key={item.key}
                    className={activeBtn === item.key ?
                      css['company-list__btns--element--active'] :
                      css['company-list__btns--element']}
                    onClick={() => (handleFilters(companyType, item.value), handleActiveBtn(item.key))}
                  >
                    {item.title}
                  </button>
                    ))}
              </div>
              <ProfileListHeader number={fetchedProfiles?.total_items}/>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={css['company-list__content--items']}>
                <ProfileList
                  isAuthorized={isAuthorized}
                  isLoading={isLoading}
                  data={fetchedProfiles}
                  paginationFunc={handlePageChange}
                  current={currentPage}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
