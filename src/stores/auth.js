import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';

// Auth firebase
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthTokenStore = defineStore('authToken', () => {
  const accessToken = ref(null);
  const refreshToken = ref(localStorage.getItem('refresh_token') || null);
  const userData = ref(null);
  const errorAuth = ref(null);
  const authActive = ref(false);
  const userPermissions = ref(null); 
  const isLoadingPermissions = ref(false);

  const departments = ref({});
  const cities = ref({});

  const router = useRouter();
  const isRehydrated = ref(false);

  // Método para cargar los permisos del usuario
  const loadUserPermissions = async (email) => {
    console.log('email ', email)
    isLoadingPermissions.value = true;  // Comienza la carga
    try {
      const response = await APIService.modulesUser(email); // Asume que este método realiza la llamada API al endpoint
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
      return
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

  const signInAndGetToken = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken(); // Obtén el token de ID
      return token;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const loginFirebase = async (email, password) => {
    try {
      const token = await signInAndGetToken(email, password); 
      const response = await APIService.loginFirebase(token);
      if (response.status === 200) {
        accessToken.value = response.data.access;
        refreshToken.value = response.data.refresh;
        userData.value = response.data.user_data;
        authActive.value = true;
        errorAuth.value = null;
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
        await loadUserPermissions(email); 
        return { success: true };
      } else {
        errorAuth.value = 'Credenciales incorrectas';
        return { success: false };
      }
    } catch (error) {
      console.error("Error during backend login:", error);
      return { success: false, error: error.message };
    }
  }

  const logoutFirebase = async () => {
    try {
      await signOut(auth);
      this.user = null;
    } catch (error) {
      console.error("Error during logout:", error);
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
    loginFirebase,
    logoutFirebase,
  };
});