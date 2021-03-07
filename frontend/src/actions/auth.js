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
            error_func(error.request.response)    
        });
    }


export const register = (username, image,  email, country, town, telephone, 
                            birth, description, password, firstname, lastname, error_func) => {
        const formData = new FormData()
        formData.append("username", username)
        if (image){
            formData.append("image",image)
        }
        formData.append("email", email)
        formData.append("country", country)
        formData.append("town", town)
        formData.append("telephone", telephone)
        formData.append("birth", birth)
        formData.append("description", description)
        formData.append("password", password)
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        axios.post(base_paths.REGISTER,
            formData, 
            { headers: { "content-type": "multipart/form-data" } }
        ).then((resp) => {
            console.log(resp.request)
            error_func(resp.request.response)    
        }).catch((error) =>{
            console.log(error.request)
            error_func(error.request.response)    
        });
    }




