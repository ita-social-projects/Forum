import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { AuthContext } from '../context';

export function AuthProvider ({ children }) {
  const [isAuth, setIsAuth] = useState(!!JSON.parse(localStorage.getItem('isAuth')));
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const authToken = localStorage.getItem('Token');
  const navigate = useNavigate();

  const { data, error, mutate } = useSWR(
    authToken
      ? [`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, authToken]
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

  const login = (authToken) => {
    localStorage.setItem('Token', authToken);
    localStorage.setItem('isAuth', true);
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('isAuth');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuth(false);
    setUser(null);
    navigate('/', { replace: true });
  };

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
  }, []);

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

  const value =  { login, logout, isAuth, isLoading, user, error, mutate };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
