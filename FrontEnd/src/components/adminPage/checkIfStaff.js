import axios from 'axios';

const checkIfStaff = async () => {
    try {
        const token = localStorage.getItem('Token');
        const userDataResponse = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`,
            {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        );
        if (userDataResponse.data) {
            const userStaffDataResponse = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${userDataResponse.data.id}`,
                {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }
            );
            return userStaffDataResponse.data.is_staff || false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default checkIfStaff;

