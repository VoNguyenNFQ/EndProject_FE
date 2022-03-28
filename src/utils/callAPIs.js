import axios from 'axios';
const api = axios.create({
     contentType: 'multipart/form-data',
     responseType: 'json',
     baseURL: "http://127.0.0.1:8080/api"
});

const getAllProduct = async () => {
     return await api.get("/products")
          .then(data => { return data })
          .catch(error => {
               return error;
          });
}
const getProductById = async (id) => {
     return await api.get(`/products/${id}`)
          .then(response => { return response.data })
          .then(data => { return data })
          .catch(error => {
               return error;
          });
}

const getFilterProduct = async (payload) => {
     return await api.get('/products/filter', payload)
     .then(response => response.data)
     .then(data => data)
     .catch(error => error);
}
export { getAllProduct, getProductById, getFilterProduct };