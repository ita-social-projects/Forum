import axios from 'axios';

const checkIfStaff = async () => {
    try {
        const userDataResponse = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/admin/status/`
        );
        return userDataResponse.data ? userDataResponse.data.is_staff || false : false;
    } catch (error) {
        return false;
    }
};

export default checkIfStaff;

