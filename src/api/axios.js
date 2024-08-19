import axios from "axios";

const api = axios.create({
   //baseURL:'https://apisara.corpoamazonia.gov.co/api',
   baseURL:'http://127.0.0.1:8000/api',
})

export default api