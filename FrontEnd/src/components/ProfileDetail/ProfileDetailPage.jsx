import useSWR from 'swr';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Loader from '../loader/Loader';
import ErrorPage404 from '../errorPages/ErrorPage404';
import MainInfoSection from './MainInfo/MainInfoSection';
import DetailedInfoSection from './DetailedInfo/DetailedInfoSection';
import BannerImage from './BannerImage';
import { ActiveLinksContext } from '../../context/ActiveLinksContext';
import classes from './ProfileDetailPage.module.css';

function ProfileDetailPage({ isAuthorized }) {
  const [activeLinks, setActiveLinks] = useState([]);
  const authToken = localStorage.getItem('Token');
  const { id } = useParams();
  const urlProfile = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${id}`;

  async function fetcher(url) {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (authToken) {
      headers.Authorization = `Token ${authToken}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: headers,
    }).then((res) => res.json());
  }

  const {
    data: fetchedProfile,
    error,
    isLoading,
  } = useSWR(urlProfile, fetcher);

  const notRequiredData = ['address', 'banner_image', 'common_info', 'edrpou', 'founded', 'official_name', 'product_info', 'service_info', 'startup_idea'];
  const containsNotRequiredData = fetchedProfile ? Object.keys(fetchedProfile).some(key => notRequiredData.includes(key) && fetchedProfile[key] !== null) : false;

  return error ? (
    <ErrorPage404 />
  ) : (
      isLoading ? (
        <Loader />
      ) : ( <>
      <ActiveLinksContext.Provider value={{ activeLinks, setActiveLinks }}>
        <BannerImage data={fetchedProfile}/>
          <div className={classes['profile-page']}>
            <MainInfoSection
              containsNotRequiredData={containsNotRequiredData}
              isAuthorized={isAuthorized}
              data={fetchedProfile}
            />
            <DetailedInfoSection
              containsNotRequiredData ={containsNotRequiredData }
              isAuthorized={isAuthorized}
              data={fetchedProfile}
              />
          </div>
        </ActiveLinksContext.Provider>
        </>
      )
  );

}

export default ProfileDetailPage;

ProfileDetailPage.propTypes = {
  isAuthorized: PropTypes.bool,
};
