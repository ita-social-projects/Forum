import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useUser() {
    const token = localStorage.getItem('Token');
    const [user, setUser] = useState(null);

    const { data, error, mutate } = useSWR(
        token ? `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/` : null,
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
            setUser(data);
        }
        if (error) {
            setUser(null);
        }
    }, [data, error]);

    return { user, mutate, error };
}