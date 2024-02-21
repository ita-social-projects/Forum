import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { AuthContext } from '../context';
import PropTypes from 'prop-types';

export function AuthProvider ({ children }) {
  const [isAuth, setIsAuth] = useState(!!JSON.parse(localStorage.getItem('isAuth')));
  const [isStaff, setIsStaff] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('Token'));
  const navigate = useNavigate();
  const { data, error, mutate } = useSWR(
    authToken
      ? [`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, authToken]
      : null,
    ([url, authToken]) =>
      axios.get(url, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then(res => res.data)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        console.error('An error occurred while fetching the data.', error);
      },
    { revalidateOnFocus: false }
  )
);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

  const login = async (authToken) => {
    try {
      localStorage.setItem('Token', authToken);
      setAuthToken(authToken);
      localStorage.setItem('isAuth', true);
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
      setIsAuth(true);
      const userDataResponse = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`
      );
      if (userDataResponse.data) {
        const userStaffDataResponse = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${userDataResponse.data.id}`
        );
        if (userStaffDataResponse.data.is_staff) {
          setIsStaff(true);
        }
      } else { console.error('Error fetching user data'); }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('Token');
    localStorage.removeItem('isAuth');
    setAuthToken('');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuth(false);
    setUser(null);
    navigate('/', { replace: true });
  }, [navigate]);

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    if (authToken) {
      login(authToken);
    } else {
      logout();
    }

    setLoading(false);
  }, [authToken, logout]);

  useEffect(() => {
    if (data) {
        setUser(data);
    }
    if (error) {
        setUser(null);
    }
  }, [data, error]);

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'Token') {
        setIsAuth(e.newValue);
      }
    });
  });

  const value = { login, logout, isAuth, authToken, isLoading, user, error, isStaff, mutate };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}