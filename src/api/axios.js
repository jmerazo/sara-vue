import axios from "axios";

const api = axios.create({
    //baseURL:'http://127.0.0.1:8000/api',
    baseURL:'https://apisara.corpoamazonia.gov.co/api'
})

export default api