import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/stocks", // Your backend URL
});

export default api;
