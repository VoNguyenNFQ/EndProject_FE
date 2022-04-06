import axios from 'axios';
const api = axios.create({
    baseURL: "http://127.0.0.1:8080/api",
});

api.interceptors.request.use(function (config) {
    let token = localStorage.getItem("tokenAdmin");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    return config;
});

const getAdminInfo = async () => {
    return await api.get('/users/profile')
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data);
}

const getAllColor = async () => {
    return await api.get('/admin/colors')
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}

const getAllProduct = async (page) => {

    return await api.get(`/admin/products?page=${page}`)
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const loginAdmin = async (data) => {
    return await api.post('/login_check', data)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}

const addProduct = async (payload) => {

    return await api.post(`/admin/products`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const updateProduct = async (id, payload) => {

    return await api.put(`/admin/products/${id}`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

export { addProduct, getAllProduct, getAllColor, updateProduct, getAdminInfo, loginAdmin }