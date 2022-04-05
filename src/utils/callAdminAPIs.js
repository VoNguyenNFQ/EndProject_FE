import axios from 'axios';
const token = localStorage.getItem("tokenAdmin");
const api = axios.create({
    // contentType: 'multipart/form-data',
    responseType: 'json',
    baseURL: "http://127.0.0.1:8080/api/admin",
    headers: {
        Authorization: token ? "Bearer " + token : "",
        contentType: 'multipart/form-data',
    }
});

const login = async (data) => {
    return await api.post('/login_check', data)
        // .then(response => response.data)
        .then(data => data)
        .catch(error => error.response.data)
}

export { login }