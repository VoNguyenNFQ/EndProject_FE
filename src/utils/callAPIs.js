import axios from 'axios';
const api = axios.create({
     contentType: 'multipart/form-data',
     responseType: 'json',
     baseURL: "http://127.0.0.1:8080/api",
     // headers: {
     //      Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDg3MDU5NDEsImV4cCI6MTY0ODcwOTU0MSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidm9AZ21haWwuY29tIn0.D5S9b1XIb_LGOoe0EQ6OW3AVTJonzDKMAJgVQ9aXXaQSj94J4uXEPPM_oRHQ3ikgEPMLQEjYxLEmx2oYkz8aW75PNQJlG3GwUePUpJOUpbgum7VUyv2z9ECJK1zMnyiXHV0KtJAapXzAM4I1LrQ-Z6TZEmyGM3Q8M8_w5BbS9PKsgjjRTcVaKxxb3qz09-wTG34pBId9Qd4kriNrqmR6zoeYTRM2hK9cBEvrLbuWpZkTCQNqVujmvhQLirTZEubtdOj0AOrXaoa0woq1kSm4xgXsl_5g4I_GXL8YFWW7a4YMAOdTKiixteqKeQe9hAc_tsU-0DHn8gcOZkeHnthejLyyTAH12qKRdXluK-icQI9bN7pYp03Nn9JpxmqmqwWYzCxWEMYArMXqDGR1c1lSOVHaaglzxuJzr3WtIL-7NqJ70wAULex2nMlUHHG5IYd8GGjlZ-xHUYnxnT0wNa_U7QkrO72HPBR12DAD_ux_AUGlaXYXKid-ZDMbts5BYJJAwLa6FLlS0jZVua9pbAHNy3TzDx6X27bv4PlfY8QITmkE-Oh_HV-IYha3-RVUBKgNLyGLE_jYx0VE1tJc_3Q7tfGvZZezHZI3J7DnOwtN7c7jcrt7WrFc8DPfHHVvAi4v73DkBeBkQFXBHTzTYYNU41SW1HJShEAG4J-XpkceWYg",
     //      contentType: 'application/json',
     // }
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

export { getAllProduct, getProductById, getFilterProduct, getMoreProduct, getAllCategory };