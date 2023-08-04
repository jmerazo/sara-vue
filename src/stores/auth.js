import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'
import { useRoute } from 'vue-router'

export const useAuthToken = defineStore('authToken',()=>{

    const accessToken = ref(localStorage.getItem('access_token') || null)
    const refreshToken = ref(localStorage.getItem('refresh_token') || null)
    const error = ref(null)


    const login = async (credentials) => {
        console.log('credentials: ', credentials)
        try {            
            const response = await APIService.getAuthToken(credentials)
            accessToken.value = response.data.access
            refreshToken.value = response.data.refresh
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            error.value = null
        } catch (error) {
            console.error('Error en el inicio de sesión:', error)
            error.value = 'Credenciales incorrectas'
        }
    }

    const logout = () => {
        // Código para cerrar sesión
    }

    return {
        accessToken,
        refreshToken,
        login,
        logout,
        error
    }
})