import { ref } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useAuthToken = defineStore('authToken',()=>{
    const accessToken = ref(localStorage.getItem('access_token') || null)
    const refreshToken = ref(localStorage.getItem('refresh_token') || null)
    const errorAuth = ref(null)
    const dashboardActive = ref(false)

    const setDashboard= (value) => {
        dashboardActive.value = value;
      };

    const login = async (credentials) => {
        try {            
            const response = await APIService.getAuthToken(credentials);
            if (response.status === 200) {
                accessToken.value = response.data.access;
                refreshToken.value = response.data.refresh;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                errorAuth.value = null;
                return { success: true };
            } else {
                errorAuth.value = 'Credenciales incorrectas';
                return { success: false };
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error)
            errorAuth.value = error
            return { success: false, error };
        }
    }

    const logout = () => {
        accessToken.value = null;
        refreshToken.value = null;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };
    
    return {
        accessToken,
        refreshToken,
        login,
        logout,
        errorAuth,
        dashboardActive,
        setDashboard
    }
})