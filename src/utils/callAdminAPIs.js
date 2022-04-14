import axios from 'axios';
import { formatYMD } from './formatNumber';
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

const getAllProduct = async (page, limit = 10) => {

    return await api.get(`/admin/products?page=${page}&limit=${limit}`)
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const getFilterProduct = async (page, limit = 10, payload) => {

    return await api.post(`/admin/products/filter?page=${page}&limit=${limit}`, payload)
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

    return await api.post(`/admin/products/${id}`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}


const getAllOrder = async (page = 1, limit,  payload) => {
    const { fromDate, status, toDate } = payload
    console.log(fromDate);
    return await api.get(`/admin/orders?limit=${limit}&page=${page}&status=${status ? status : 0}` + (fromDate ? ("&fromDate=" + fromDate) : "") + `&toDate=${toDate}`)
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}


const exportCSV = async (data) => {
    return await api.post('/admin/orders/export/csv', data)
        //.then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}


const deleteProduct = async (id) => {
    return await api.delete(`/admin/products/${id}`)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const updateOrder = async (id, payload) => {
    return await api.put(`/admin/orders/${id}`, payload)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}

const countSummary = async (fromDate, toDate) => {
    return await api.get(`/admin/summary?fromDate=${fromDate}&toDate=${toDate}`)
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response);
}
const getChartData = async () => {
    return await api.get('/admin/chart')
        .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}
export { addProduct, getAllProduct, getAllColor, updateProduct, getAllOrder, deleteProduct, exportCSV, getAdminInfo, countSummary, updateOrder, getFilterProduct, getChartData, loginAdmin }
