import axios from 'axios';
import { useAuth } from '../../../../hooks';

function Logout() {
  const { logout } = useAuth();
  const onClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`
    );
    logout();
  };
  return (
    <button onClick={onClick} type="submit">
      Вихід
    </button>
  );
}

export default Logout;
