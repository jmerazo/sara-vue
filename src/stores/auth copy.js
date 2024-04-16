import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import APIService from "../services/APIService";

export const useAuthTokenStore = defineStore("authToken", () => {

  const router = useRouter()
  const user = ref({});
  const userPermissions = ref(null); 
  const isLoadingPermissions = ref(false);

  onMounted(async ()=>{
    getDataUser()
  })

  const getDataUser = async ()=>{
    try {
      const Token = ref(localStorage.getItem('Token-SARA') || null);
      const {data} = await APIService.refreshAuthToken({ refresh: Token.value });
      
      loadUserPermissions()
      user.value = data.user_data

    } catch (error) {
      console.log(error.message)
    }
  }
  
  const login = async (credentials) => {
    try {
      const {data} = await APIService.getAuthToken(credentials);
      localStorage.setItem("Token-SARA", data.access);
      getDataUser()
      router.push({name:'panel'})
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      errorAuth.value = error;
      return { success: false, error };
    }
  };


  function logout(){
    localStorage.removeItem('Token-SARA')
    router.push({name:'home'})
  }

  // Método para cargar los permisos del usuario
  const loadUserPermissions = async () => {
    isLoadingPermissions.value = true;  // Comienza la carga
    try {
      const {data} = await APIService.modulesUser(); // Asume que este método realiza la llamada API al endpoint
      userPermissions.value = data;
    } catch (error) {
      isLoadingPermissions.value = false;
      console.error('Error al realizar la solicitud de permisos:', error);
    }    
  };
  return {
    login,
    logout,
    loadUserPermissions

  };
});
