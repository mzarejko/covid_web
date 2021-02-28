import axiosInstance from "../utils/axiosApi";
import {base_paths} from '../utils/Endpoints';

export const getData = () => {
    return axiosInstance.get(base_paths.COVID_DATA)
}

