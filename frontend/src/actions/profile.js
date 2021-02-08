import axiosInstance from "../utils/axiosApi";
import {rel_paths} from '../utils/Endpoints';
import {base_paths} from '../utils/Endpoints';
import axios from 'axios';
import {history} from '../utils/history';


export const setNeedy = (error_func) => {
    axiosInstance.put(base_paths.SET_NEEDY, {
    }).then((response) => {
        error_func(response.data.needy)
    }).catch((error) => {
        console.log(error)
    });
}

export const setVolunteer = (error_func) => {
    axiosInstance.put(base_paths.SET_VOLUNTEER, {
    }).then((response) => {
        error_func(response.data.volunteer)
    }).catch((error) => {
        console.log(error)
    });
}
