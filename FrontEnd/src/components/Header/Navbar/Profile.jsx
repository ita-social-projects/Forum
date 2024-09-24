import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../hooks';

import DropdownMenu from './DropdownMenu';
import css from './Profile.module.css';


function Profile() {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile-detail/${user.profile_id}`);
  };

  const performLogout = async () => {
    if (isAuth) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`);
        await logout();
      } catch (error) {
        console.error('Error during logout', error);
      }
    }
  };

  return (
    <div className={css['header-profile-section']}>
      <img
        className={css['header-profile__avatar']}
        src={`${process.env.REACT_APP_PUBLIC_URL}/img/Avatar.png`}
        alt="Avatar"
        onClick={navigateToProfile}
      />
      <DropdownMenu toggleText="Профіль">
        <Link to="/profile/user-info">Профіль</Link>
        <button onClick={performLogout}>Вихід</button>
      </DropdownMenu>
    </div>
  );
}

export default Profile;
