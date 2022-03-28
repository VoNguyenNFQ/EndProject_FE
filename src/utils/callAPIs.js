import axios from 'axios';
export const api = axios.create({
    contentType: 'multipart/form-data',
    responseType: 'json',
    baseURL: "http://127.0.0.1:8080/api"
});

const getAllProduct=() =>{
    return await api.get("/products")
    .then(response =>
         {return response.data} )
    .then (data =>
         {return data})
    .catch (error =>{
            return error;
      });   
}
const getProductById=(id) =>{
    return await api.get(`/products/${id}`)
    .then(response =>
         {return response.data} )
    .then (data =>
         {return data})
    .catch (error =>{
            return error;
      });   
}
export default (getAllProduct, getProductById);