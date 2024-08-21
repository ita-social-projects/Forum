import { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useAuth } from './useAuth';

export default function useProfile() {
    const { user, logout, authToken } = useAuth();
    const [profile, setProfile] = useState(null);

    const { data, error, mutate } = useSWR(
      (authToken && user)
        ? [`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, authToken]
        : null,
      ([url, authToken]) =>
      axios.get(url, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then(res => res.data)
      .catch((error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 404)) {
          logout();
        }
        console.error('An error occurred while fetching the data.', error);
      },
    { revalidateOnFocus: false }
    )
  );

    useEffect(() => {
        if (data) {
            setProfile(data);
        }
        if (error) {
            setProfile(null);
        }
    }, [data, error]);

    return { profile, mutate, error };
}