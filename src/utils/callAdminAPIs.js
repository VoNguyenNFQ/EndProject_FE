import axios from 'axios';
const token = localStorage.getItem("tokenAdmin");
const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api/admin",
    headers: {
        Authorization: token ? "Bearer " + token : "",
    }
});

const login = async (data) => {
    return await api.post('/login_check', data)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}

const getAllProduct = async (payload) => {

    return await api.get(`/products`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const addProduct = async (payload) => {

    return await api.post(`/products`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

export { login, addProduct, getAllProduct }