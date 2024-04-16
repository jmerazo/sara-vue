import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';

export const useAuthTokenStore = defineStore('authToken', () => {
  const accessToken = ref(null);
  const refreshToken = ref(localStorage.getItem('refresh_token') || null);
  const userData = ref(null);
  const errorAuth = ref(null);
  const authActive = ref(false);
<<<<<<< HEAD
  const socialData = ref(false);

=======
>>>>>>> modal
  const userPermissions = ref(null); 
  const isLoadingPermissions = ref(false);

  const departments = ref({});
  const cities = ref({});

  const router = useRouter();
  const isRehydrated = ref(false);

  // Método para cargar los permisos del usuario
  const loadUserPermissions = async () => {
    isLoadingPermissions.value = true;  // Comienza la carga
    try {
      const response = await APIService.modulesUser(); // Asume que este método realiza la llamada API al endpoint
      if (response.status === 200) {
        userPermissions.value = response.data;
        localStorage.setItem('user_permissions', JSON.stringify(response.data));
      } else {
        console.error('Error al cargar los permisos del usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de permisos:', error);
    } finally {
      isLoadingPermissions.value = false;  // Finaliza la carga
    }
  };

  const rehydrateAuth = async () => {
    if (refreshToken.value) {
      try {
        const response = await APIService.refreshAuthToken({ refresh: refreshToken.value });
        if (response.status === 200 && response.data.access) {
          accessToken.value = response.data.access;
          userData.value = response.data.user_data;
          authActive.value = true;
          isRehydrated.value = true;
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (error) {
        console.error('Error al rehidratar la autenticación:', error);
        logout();  // Si hay un error, asegúrate de limpiar el estado
      }
    } else {
      console.log('No refresh token available');
    }
  };

  const login = async (credentials, authType) => {
    try {
      const response = await APIService.getAuthToken(credentials, authType);
      if (response.status === 200) {
        accessToken.value = response.data.access;
        refreshToken.value = response.data.refresh;
        userData.value = response.data.user_data;
        authActive.value = true;
        errorAuth.value = null;
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log(response.data.user_data)
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
        await loadUserPermissions(); 
        return { success: true };
      } else {
        errorAuth.value = 'Credenciales incorrectas';
        return { success: false };
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      errorAuth.value = error;
      return { success: false, error };
    }
  };

  const loginSocial = async (code) => {
    try{
      const data = await APIService.socialAuth(code)
      if(data.status === 200) {
          socialData.value = data.data;
          console.log('data: ', socialData.value)
          await loadUserPermissions(); 
      }
    }catch (error) {
      return { success: false, error}
    }
  }

  const logout = () => {
    localStorage.removeItem('refresh_token');
    accessToken.value = null;
    refreshToken.value = null;
    userData.value = null;
    authActive.value = false;
    router.push('/');
  };

  function isAuth() {
    const auth = accessToken.value;
    if (auth) {
      authActive.value = true;
    } else {
      authActive.value = false;
    }
  }

  onMounted(async () => {
    isAuth();
    await rehydrateAuth();
    try {
      const departmentsResponse = await APIService.getDepartments();
      departments.value = departmentsResponse.data;

      const citiesResponse = await APIService.getCities();
      cities.value = citiesResponse.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  });

  return {
    accessToken,
    refreshToken,
    userData,
    errorAuth,
    authActive,
    useAuthTokenStore,
    isRehydrated,
    departments,
    cities,
    login,
    logout,
    isAuth,
    rehydrateAuth,
    userPermissions,
    isLoadingPermissions,
    loadUserPermissions,
    loginSocial
  };
});
