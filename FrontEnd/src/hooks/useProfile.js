import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from './useAuth';

export default function useProfile() {
    const { user, logout, authToken } = useAuth();
    const [profile, setProfile] = useState(null);

    const { data, error, mutate } = useSWR(
      (authToken && user)
        ? [`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, authToken]
        : null,
      ([url, authToken]) =>
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
          .then((res) => {
            if (!res.ok && res.status === 401) {
              logout();
              const error = new Error('Unauthorized user.');
              error.status = res.status;
              throw error;
            }
            if (!res.ok) {
              const error = new Error(
                'An error occurred while fetching the data.'
              );
              error.status = res.status;
              throw error;
            }
            return res.json();
          })
          .catch((error) => {
            console.error(error);
          }),
      { revalidateOnFocus: false }
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