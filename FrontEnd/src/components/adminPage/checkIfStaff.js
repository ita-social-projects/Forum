import axios from 'axios';

async function checkIfStaff() {
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/status/`;
    try {
        const userDataResponse = await axios.get(url);
        if (
            userDataResponse &&
            userDataResponse.data &&
            userDataResponse.data.is_staff !== undefined &&
            userDataResponse.data.is_staff === true) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
export default checkIfStaff;


