import axios from "axios";
import { auth } from '../firebase/firebase';

const api = axios.create({
   //baseURL:'https://apisara.corpoamazonia.gov.co/api',
   baseURL:'http://127.0.0.1:8000/api',
})

/* api.interceptors.request.use(
   (config) => {
     const token = localStorage.getItem('auth_token');
     if (token) {
       config.headers['Authorization'] = `Bearer ${token}`;
     }
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
); */
api.interceptors.request.use(
   async (config) => {
     // Obtener el token CSRF de las cookies si es necesario
     const csrfToken = getCookie('csrftoken');
     if (csrfToken) {
       config.headers['X-CSRFToken'] = csrfToken;
     }
 
     // Obtener el token de Firebase
     const user = auth.currentUser;
     if (user) {
       const token = await user.getIdToken(true);
       config.headers['Authorization'] = `Bearer ${token}`;
     }
 
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );
 
 // Interceptor para manejar errores de autenticación
 api.interceptors.response.use(
   (response) => response,
   async (error) => {
     if (error.response && error.response.status === 401) {
       // Token expirado o inválido, intentar renovar
       const user = auth.currentUser;
       if (user) {
         try {
           await user.getIdToken(true); // Forzar renovación del token
           // Reintentar la solicitud original
           return api(error.config);
         } catch (refreshError) {
           // Si no se puede renovar el token, redirigir al login
           // Aquí puedes dispatch una acción de tu store para hacer logout
           console.error("Error renovando token", refreshError);
         }
       }
     }
     return Promise.reject(error);
   }
 );
 
 // Función auxiliar para obtener cookies
 function getCookie(name) {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop().split(';').shift();
 }

export default api