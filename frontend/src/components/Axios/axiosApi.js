import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://0.0.0.0:8000/',
    timeout: 5000,
    headers: {
        'Authorization': 'Bearer '+ localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

function resetToken(){
            axios.post('http://00.0.0.0:8000/accounts/refresh-token/', {
            "refresh" : localStorage.getItem('refresh_token')
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access);
        }).catch((err) => {
            throw err
        });
};

axiosInstance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response.status === 401) {
        resetToken()
        return error.response
    }
    return Promise.reject(error)
});



export default axiosInstance
