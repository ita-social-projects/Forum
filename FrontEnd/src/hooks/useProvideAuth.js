import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useProvideAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const validateToken = async (authToken) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return false;
      }
    }
  };

  const login = async (authToken) => {
    localStorage.setItem('Token', authToken);
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    setIsAuth(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`,
        {headers: {Authorization: `Token ${authToken}`,},}
      );
      const ponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${response.data.id}`,
        {headers: {Authorization: `Token ${authToken}`,},}
      );
      if (ponse.data.is_staff && ponse.data.is_superuser ) {
        setIsSuper(true);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuth(false);
    setIsSuper(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem('Token');
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    if (authToken && validateToken(authToken)) {
      login(authToken);
    } else {
      logout();
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'Token') {
        setIsAuth(e.newValue);
      }
    });
  });
  return { login, logout, isAuth, isLoading, isSuper };
}
