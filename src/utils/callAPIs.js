import axios from 'axios';
export const api = axios.create({
    contentType: 'multipart/form-data',
    responseType: 'json',
    baseURL: "https://reqres.in"
});
