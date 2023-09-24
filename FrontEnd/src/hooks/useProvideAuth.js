import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useProvideAuth() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const validateToken = async (authToken) => {

        try {
            await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, {
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            });
            return true;
        } catch (error) {
            return false;
        }
        };

    const login = () => {
        setIsAuth(true)
    };

    const logout = () => {
        localStorage.removeItem("Token");
        setIsAuth(false);
    };

  useEffect(() => {
    const authToken = localStorage.getItem("Token")
    axios.interceptors.request.use(config => {
        if (authToken) {
          config.headers.Authorization = `Token ${authToken}`;
        }
        return config;
      });

    axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            logout();
          }
          return Promise.reject(error);
        }
      );
    if (authToken && validateToken(authToken)) {
          login()
        } else {
          logout()
        }

    setLoading(false);
  }, []);

  useEffect(() => {
    window.addEventListener("storage", e => {
      if (e.key === "Token") {
        setIsAuth(e.newValue);
      }
    });
  });

  return { login, logout, isAuth, isLoading }
}
