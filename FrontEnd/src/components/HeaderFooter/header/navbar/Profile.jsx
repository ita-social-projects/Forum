import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../../hooks';

import DropdownMenu from './DropdownMenu';
import css from './Profile.module.css';
import avatar_image from './Avatar.png';


function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile-detail/${user.profile_id}`);
  };

  return (
    <div className={css['header-profile-section']}>
      <img
        className={css['header-profile__avatar']}
        src={avatar_image}
        alt=""
        onClick={navigateToProfile}
      />
      <DropdownMenu toggleText="Профіль">
        <Link to="/profile/user-info">Профіль</Link>
        <Link to="/logout">Вихід</Link>
      </DropdownMenu>
    </div>
  );
}

export default Profile;
