import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../../../../hooks';

import DropdownMenu from './DropdownMenu';
import Logout from './Logout';
import avatar_image from './Avatar.png';
import css from './Profile.module.css';


function Profile() {
  const { user } = useUser();
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
        <Logout />
      </DropdownMenu>
    </div>
  );
}

export default Profile;
