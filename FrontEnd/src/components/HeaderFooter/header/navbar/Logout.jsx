import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../../../hooks';

function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      if (auth.isAuth) {
        try {
          await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`);
          await auth.logout();
        } catch (error) {
          console.error('Error during logout', error);
        }
      }
      navigate('/');
    };

    performLogout();
  }, [auth, navigate]);
}

export default Logout;
