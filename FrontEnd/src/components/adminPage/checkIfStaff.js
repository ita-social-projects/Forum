import axios from 'axios';

async function checkIfStaff() {
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/status/`;
    const userDataResponse = await axios.get(url);
    if (userDataResponse.data.is_staff === true ) {
        return true;
    } else {
        return false;
    }
}
export default checkIfStaff;


