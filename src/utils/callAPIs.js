import axios from 'axios';
const api = axios.create({
     baseURL: "http://127.0.0.1:8080/api",
});

api.interceptors.request.use(function (config) {
     let token = localStorage.getItem("tokenUser");
     if (token) config.headers["Authorization"] = "Bearer " + token;
     return config;
});

const getAllProduct = async () => {
     return await api.get("/products")
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const getProductById = async (id) => {
     return await api.get(`/products/${id}`)
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const getFilterProduct = async (page, payload) => {
     return await api.post(`/products/filter?limit=9&page=${page}`, payload)
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const getAllCategory = async () => {
     return await api.get('/categories')
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const getAllColor = async () => {
     return await api.get('/colors')
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const login = async (data) => {
     return await api.post('/login_check', data)
          // .then(response => response.data)
          .then(data => data)
          .catch(error => error.response.data)
}

const getUserInfo = async () => {
     return await api.get('/users/profile')
          .then(response => response.data)
          .then(data => data)
          .catch(error => error.response.data);
}

const signupFunction = async (payload) => {
     return await api.post(`/register`, payload)
          // .then(response => response.data)
          .then(data => data)
          .catch(error => error.response);
}
const countCartItem = async () => {
     return await api.get(`/users/carts/count`)
          .then(response => response)
          .then(res => res.data)
          .catch(error => error);
}

const getCartItem = async () => {
     return await api.get('/users/carts')
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}
const addToCart = async (payload) => {
     return await api.post(`/users/carts`, payload)
          .then(data => data)
          .then(re => re)
          .catch(error => error.response);
}
const deleteCartItem = async (id) => {
     await api.delete(`/users/carts/${id}`)
          .catch(error => error.response);
}
const updateCart = async (payload, id) => {
     await api.put(`/users/carts/${id}`, payload)
          .then(data => data)
          .catch(error => error.response);
}
const placeOrder = async (payload) => {
     return await api.post(`/users/orders`, payload)
          .then(data => data)
          .catch(error => error.response);
}

const getAllOrder = async (param) => {
     return await api.get(`/users/orders${param}`)
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

const getOrderDetail = async (id) => {
     return await api.get(`/users/orders/${id}`)
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}

export { getAllProduct, getProductById, getFilterProduct, getAllColor, getAllCategory, login, signupFunction, getUserInfo, getCartItem, updateCart, countCartItem, addToCart, deleteCartItem, placeOrder, getAllOrder, getOrderDetail };
