import axios from 'axios';

const authToken = localStorage.getItem('Token');
if (authToken) {
  axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
} else {
    delete axios.defaults.headers.common['Authorization'];
}