import axios from "axios";
import { useAuthTokenStore } from "../stores/auth";

const api = axios.create({
    baseURL:'https://apisara.corpoamazonia.gov.co/api',
    //baseURL:'http://127.0.0.1:8000/api',
})

/* api.interceptors.request.use(config => {
    const authStore = useAuthTokenStore();
    const { accessToken } = authStore; // Usa destructuración para obtener accessToken

    if (accessToken.value) {
        config.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
}); */

export default api