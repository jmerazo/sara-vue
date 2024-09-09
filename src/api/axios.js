import axios from "axios";
import { auth } from '../firebase/firebase';

const api = axios.create({
   //baseURL:'https://apisara.corpoamazonia.gov.co/api',
   baseURL:'http://127.0.0.1:8000/api',
})

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);

const onRefreshed = (token) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    // Esperar a que Firebase inicialice
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve();
      });
    });

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const user = auth.currentUser;
      if (user) {
        try {
          const newToken = await user.getIdToken(true);
          onRefreshed(newToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Error renovando token", refreshError);
          // Aquí puedes dispatch una acción de tu store para hacer logout
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default api;