import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useUser from './useUser';

export default function useProfile() {
    const token = localStorage.getItem('Token');
    const { user } = useUser();

    const [profile, setProfile] = useState(null);

    const { data, error, mutate } = useSWR(
        (token && user) ? `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}` : null,
        url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`,
                },
            }).then(res => res.json()),
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