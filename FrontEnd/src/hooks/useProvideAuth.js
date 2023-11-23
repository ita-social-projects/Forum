import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useProvideAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [UserId, setUserId] = useState(null);
  const validateToken = async (authToken) => {
    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then((res) => res.data);
      setUserId(userData.id);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return false;
      }
    }
  };

  const login = (authToken) => {
    localStorage.setItem('Token', authToken);
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuth(false);
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
  return { login, logout, isAuth, isLoading, UserId };
}
