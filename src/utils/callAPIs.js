import axios from 'axios';
const token = localStorage.getItem("tokenUser");
const api = axios.create({
     // contentType: 'multipart/form-data',
     responseType: 'json',
     baseURL: "http://127.0.0.1:8080/api",
     headers: {
          Authorization: token ? "Bearer " + token : "",
          contentType: 'multipart/form-data',
     }
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

const getMoreProduct = async (page) => {
     return await api.get('/product/getmore', page)
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
     return await api.post(`/users/register`, payload)
          // .then(response => response.data)
          .then(data => data)
          .catch(error => error.response);
}
const countCartItem= async () => {
     await api.get(`/count`)
     
}
const getCartItem = async () => {
     return await api.get('/users/carts')
          .then(response => response.data)
          .then(data => data)
          .catch(error => error);
}
const addToCart = async (payload) => {
     return await api.post(`/cart`, payload)
          // .then(response => response.data)
          .then(data => data)
          .catch(error => error.response);
}
const deleteCartItem= async (id) => {
     await api.delete(`${id}/delete/`)
     
   }

   const addProduct = async (payload) => {
     return await api.post(`/admin/products`, payload)
          // .then(response => response.data)
          .then(data => data)
          .catch(error => error.response);
}

export { getAllProduct, getProductById, getFilterProduct, getMoreProduct, getAllCategory, login, signupFunction, getUserInfo, countCartItem, addToCart, deleteCartItem};
