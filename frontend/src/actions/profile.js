import axiosInstance from "../utils/axiosApi";
import {base_paths} from '../utils/Endpoints';
import {url_listOpinion} from '../utils/Endpoints';

export const setNeedy = (error_func) => {
    axiosInstance.put(base_paths.SET_NEEDY, {
    }).then((response) => {
        error_func(response.data)
    }).catch((error) => {
        error_func(error.data)
    });
}

export const setVolunteer = (error_func) => {
    axiosInstance.put(base_paths.SET_VOLUNTEER, {
    }).then((response) => {
        error_func(response.data)
    }).catch((error) => {
        error_func(error.data)
    });
}

export const listUsers = (key) => {
    if(key){
        console.log(key)
        return axiosInstance.get(base_paths.LIST_USERS+'?username='+key)
    }else{
        return axiosInstance.get(base_paths.LIST_USERS)
    }
}

export const setComments = (text, target) => {
    return axiosInstance.post(base_paths.COMMENTS,{
        "text": text,
        "target": target
        })
}

export const listComments = (key) => {
    return axiosInstance.get(url_listOpinion(key))
}

export const getAdmin = () => {
    return axiosInstance.get(base_paths.ADMIN)
}
