import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://0.0.0.0:8000/',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


