import axiosInstance from "../utils/axiosApi";
import {rel_paths} from '../utils/Endpoints';
import {base_paths} from '../utils/Endpoints';
import axios from 'axios';
import {history} from '../utils/history';


export const getData = () => {
    return axiosInstance.get(base_paths.COVID_DATA)
}

