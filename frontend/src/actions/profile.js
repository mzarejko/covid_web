import axiosInstance from "../utils/axiosApi";
import {base_paths} from '../utils/Endpoints';
import axios from 'axios';
import {history} from '../utils/history';
import {url_listAssignedProducts} from '../utils/Endpoints';
import {url_listUnassignedProducts} from '../utils/Endpoints';
import {url_assignProducts} from '../utils/Endpoints';
import {url_setProducts} from '../utils/Endpoints';
import {url_updateProducts} from '../utils/Endpoints';
import {url_deleteAnnouncement} from '../utils/Endpoints';


export const setNeedy = (error_func) => {
    axiosInstance.put(base_paths.SET_NEEDY, {
    }).then((response) => {
        console.log('response: ',response.data)
        error_func(response.data)
    }).catch((error) => {
        console.log('error: ',error.data)
        error_func(error.data)
    });
}

export const setVolunteer = (error_func) => {
    axiosInstance.put(base_paths.SET_VOLUNTEER, {
    }).then((response) => {
        console.log('response: ',response.data)
        error_func(response.data)
    }).catch((error) => {
        console.log('error: ',error.data)
        error_func(error.data)
    });
}

export const setAnnouncement = (description, address) => {
    return axiosInstance.post(base_paths.SET_ANNOUNCEMENT, {
        "description" : description,
        "address" : address,
    })
}

export const listAnnoncement = (key) => {
    if(key){
        return axiosInstance.get(base_paths.LIST_ANNONCEMENT+'?address='+key)
    }else{
        return axiosInstance.get(base_paths.LIST_ANNONCEMENT)
    }
}

export const deleteAnnouncement = (key) => {
    return axiosInstance.delete(url_deleteAnnouncement(key))
}
export const listAssignedProducts = (key) => {
    return axiosInstance.get(url_listAssignedProducts(key))
}

export const listUnassignedProducts = (key) => {
    return axiosInstance.get(url_listUnassignedProducts(key))
}

export const assignProducts = (key1, key2) => {
    return axiosInstance.put(url_assignProducts(key1, key2))
}

export const setProducts = (key, name, description, priority) => {
    return axiosInstance.post(url_setProducts(key), {
        "name" : name,
        "description" : description,
        "priority" : Number(priority)
    })
}


export const deleteProducts = (key1, key2) => {
    return axiosInstance.delete(url_updateProducts(key1, key2))
}

