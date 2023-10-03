import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";

function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`
    );
    auth.logout();
    navigate("/");
  };
  return (
    <button onClick={onClick} type="submit">
      Вихід
    </button>
  );
}

export default Logout;
