import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useAuth } from './useAuth';

export default function useProfile() {
    const token = localStorage.getItem('Token');
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);

    const { data, error, mutate } = useSWR(
      (token && user)
        ? [`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, token]
        : null,
      ([url, token]) =>
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok && res.status === 401) {
              logout();
              const error = new Error('Unauthorized user.');
              error.info = res.json();
              error.status = res.status;
              throw error;
            }
            if (!res.ok) {
              const error = new Error(
                'An error occurred while fetching the data.'
              );
              error.info = res.json();
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