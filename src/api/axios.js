import axios from "axios";
import { useAuthTokenStore } from "../stores/auth";

const api = axios.create({
    //baseURL:'https://apisara.corpoamazonia.gov.co/api',
    baseURL:'http://127.0.0.1:8000/api',
})

/* api.interceptors.request.use(config => {
    const store = useAuthTokenStore();
    console.log('api store: ', store.refreshToken)
    const accessToken = store.refreshToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
}); */

export default api