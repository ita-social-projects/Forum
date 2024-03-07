import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { AuthContext } from '../context';
import checkIfStaff from '../components/adminPage/checkIfStaff';

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(!!JSON.parse(localStorage.getItem('isAuth')));
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('Token'));
  const navigate = useNavigate();
  const [isStaff, setIsStaff] = useState(false);
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

  const login = (authToken) => {
    localStorage.setItem('Token', authToken);
    setAuthToken(authToken);
    localStorage.setItem('isAuth', true);
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('isAuth');
    setAuthToken('');
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

    setLoading(false);
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      setUser(null);
    }
    setLoading(false);
  }, [data, error]);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'Token') {
        setIsAuth(e.newValue);
      }
    });
  });

  useEffect(() => {
    const checkStaff = async () => {
      const staffStatus = await checkIfStaff();
      setIsStaff(staffStatus);
    };
    if (isAuth) {
      checkStaff();
    }
  });

  const value = { login, logout, isAuth, authToken, isLoading, isStaff, user, error, mutate };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}