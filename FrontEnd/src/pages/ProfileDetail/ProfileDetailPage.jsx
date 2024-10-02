import useSWR from 'swr';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Loader from '../../components/Loader/Loader';
import ErrorPage404 from '../../pages/ErrorPages/ErrorPage404';
import MainInfoSection from './MainInfo/MainInfoSection';
import DetailedInfoSection from './DetailedInfo/DetailedInfoSection';
import BannerImage from './BannerImage';
import { ActiveLinksContext } from '../../context/ActiveLinksContext';
import classes from './ProfileDetailPage.module.css';
import PendingStatus from '../../components/MiniComponents/PendingModerationIcon/PendingStatus';

function ProfileDetailPage({ isAuthorized }) {
  const [activeLinks, setActiveLinks] = useState([]);
  const { id } = useParams();
  const urlProfile = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${id}`;

  async function fetcher(url) {
    return axios.get(url)
    .then(res => res.data);
  }

  const {
    data: fetchedProfile,
    error,
    isLoading,
  } = useSWR(urlProfile, fetcher);

  const notRequiredData = ['address', 'banner', 'logo', 'common_info', 'edrpou', 'rnokpp', 'founded', 'official_name', 'product_info', 'service_info', 'startup_idea', 'logistics', 'cooperation'];
  const containsNotRequiredData = fetchedProfile ? Object.keys(fetchedProfile).some(key => notRequiredData.includes(key) && fetchedProfile[key] !== '' && fetchedProfile[key] !== null) : false;

  return (error && error.status !== 401) ? (
    <ErrorPage404 />
  ) : (
    <div className={isLoading ? classes['profile-detail__loader-content'] : null}>
      {isLoading ? (
        <Loader />
      ) : (
          <ActiveLinksContext.Provider value={{ activeLinks, setActiveLinks }}>
            <div className={classes['profile-detail__banner-tooltip']}>
            <PendingStatus profile={fetchedProfile} elementType="banner" />
            </div>
            <BannerImage data={fetchedProfile} />
            <div className={classes['profile-detail__page']}>
              <MainInfoSection
                containsNotRequiredData={containsNotRequiredData}
                isAuthorized={isAuthorized}
                data={fetchedProfile}
              />
              <div className={classes['profile-detail__logo-tooltip']}>
                <PendingStatus profile={fetchedProfile} elementType="logo" />
              </div>
              <DetailedInfoSection
                containsNotRequiredData={containsNotRequiredData}
                isAuthorized={isAuthorized}
                data={fetchedProfile}
              />
            </div>
          </ActiveLinksContext.Provider>
      )}
    </div>
  );

}

export default ProfileDetailPage;

ProfileDetailPage.propTypes = {
  isAuthorized: PropTypes.bool,
};
