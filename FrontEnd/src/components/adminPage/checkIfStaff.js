import axios from 'axios';

async function checkIfStaff() {
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`;
    const userDataResponse = await axios.get(url);
    return userDataResponse.data.is_staff === true;
}
export default checkIfStaff;


