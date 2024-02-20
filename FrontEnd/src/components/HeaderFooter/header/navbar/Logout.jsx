import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../../../hooks';

function Logout() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      if (isAuth) {
        try {
          await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`);
          await logout();
        } catch (error) {
          console.error('Error during logout', error);
        }
      }
      navigate('/');
    };

    performLogout();
  }, [isAuth, navigate]);
}

export default Logout;
