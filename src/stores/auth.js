import { onMounted, ref } from 'vue'
import {defineStore} from 'pinia'
import { useRouter } from "vue-router";
import APIService from '../services/APIService'


export const useAuthToken = defineStore('authToken',()=>{
    const router = useRouter();
    const accessToken = ref(localStorage.getItem('access_token') || null)
    const refreshToken = ref(localStorage.getItem('refresh_token') || null)
    const errorAuth = ref(null)
    const authActive = ref(false)


    const login = async (credentials) => {
        try {            
            const response = await APIService.getAuthToken(credentials);
            if (response.status === 200) {
                
                accessToken.value = response.data.access;
                refreshToken.value = response.data.refresh;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                authActive.value = true
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
        authActive.value = false
        router.push("/");
    };

   onMounted(()=>{
    isAuth()
   })

    function isAuth(){
        const auth = accessToken.value
        if(auth){
            authActive.value = true
        }else{
            authActive.value = false
        }
    }
    return {
        accessToken,
        refreshToken,
        errorAuth,
        authActive,
        useAuthToken,
        login,
        logout,
        isAuth,
       
    }
})