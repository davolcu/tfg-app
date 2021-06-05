// Out of the box imports
import axios from 'axios';

// Set the default base url for the API
axios.defaults.baseURL = 'https://api.olmosdev.com';

export const setToken = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
};

export const getToken = () => {
    return axios.defaults.headers.common.Authorization;
};

// Reference to axios's spread method to handle the responses from the 'all' method
export const handleSpread = axios.spread;

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    all: axios.all,
};
