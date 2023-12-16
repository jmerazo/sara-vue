import axios from "axios";

const api = axios.create({
    baseURL:'https://apisara.corpoamazonia.gov.co/api',
})

export default api