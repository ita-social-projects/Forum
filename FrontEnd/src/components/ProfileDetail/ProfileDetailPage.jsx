import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import Loader from '../loader/Loader';
import ErrorPage404 from '../errorPages/ErrorPage404';
import MainInfo from './MainInfo/MainInfo';
import DetailedInfo from './DetailedInfo/DetailedInfo';
import BannerImage from './BannerImage';
import classes from './ProfileDetailPage.module.css';

function ProfileDetailPage({ isAuthorized }) {
  const { id } = useParams();
  const urlProfile = `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${id}`;

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
    data: fetchedProfile,
    error,
    isLoading,
  } = useSWR(urlProfile, fetcher);

  console.log('DATA', fetchedProfile);

  return error ? (
    <ErrorPage404 />
  ) : (
      isLoading ? (
        <Loader />
      ) : ( <>
        <BannerImage data={fetchedProfile}/>
        <div className={classes['profile-page']}>
          <MainInfo
            isAuthorized={isAuthorized}
            data={fetchedProfile}
          />
          <DetailedInfo
            isAuthorized={isAuthorized}
            data={fetchedProfile}/>
        </div>
        </>
      )
  );

}

export default ProfileDetailPage;

ProfileDetailPage.propTypes = {
  isAuthorized: PropTypes.bool,
};
