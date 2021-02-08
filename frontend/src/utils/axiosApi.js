import axios from 'axios';
import {base_paths} from '../utils/Endpoints';
import {logout} from '../actions/auth';
// sliding session technique and some axios config


const axiosInstance = axios.create({
    baseURL: base_paths.BASE,
    timeout: 5000,
});



axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization =  'Bearer '+localStorage.getItem('access_token');
    return config;
}, (error) => {
    return error
});


axiosInstance.interceptors.response.use((response) => {
    resetToken()
    return response;
}, (error) => {
    if (error.response.status === 401) {
        console.log("Unauthorizer request, you was forced to logout")
        logout()
    }
    return Promise.reject(error)
});



function resetToken(){
    axios.post(base_paths.REFRESH_TOKEN, {
    "refresh" : localStorage.getItem('refresh_token') 
    }).then((response) => {
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', response.data.access);
    }).catch((err) => {
        return err
    });
};



export default axiosInstance; 



