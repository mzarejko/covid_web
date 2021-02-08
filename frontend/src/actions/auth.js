import {base_paths} from '../utils/Endpoints';
import axios from 'axios';
import {history} from '../utils/history';
import {urls} from '../utils/urls';

export const logout = () => {
    axios.post(base_paths.LOGOUT,{
        "refresh" : localStorage.getItem('refresh_token')
    }).then((response) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        history.push(urls.LOGIN)
    }).catch((err) => {
        console.log(err)
    });
}


export const login = (username, password, error_func) => {
        axios.post(base_paths.LOGIN, {
            "username": username,
            "password": password
        }).then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            history.push(urls.HOME); 
        }).catch((error) => {
            if(!!error_func){
                error_func(error.request.response)    
            }
        });
    }


export const register = (username, email, country, town, telephone, 
                            birth, description, password, firstname, lastname, error_func) => {
        axios.post(base_paths.REGISTER, {
            "username": username,
            "email": email,
            "country": country,
            "town": town,
            "telephone": telephone,
            "birth": birth,
            "description": description,
            "password": password,
            "firstname": firstname,
            "lastname": lastname 
        }).then((resp) => {
            if(!!error_func){
                error_func(resp.request.response)    
            }
        }).catch((error) =>{
            if(!!error_func){
                error_func(error.request.response)    
            }
        });
    }



