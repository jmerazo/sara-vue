import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';

// Auth firebase
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthTokenStore = defineStore('authToken', () => {
  /* const token = ref(localStorage.getItem('auth_token') || null); */
  const firebaseToken = ref(null);
  const userData = ref(null);
  const errorAuth = ref(null);
  const authActive = ref(false);
  const userPermissions = ref(null);
  const isLoadingPermissions = ref(false);

  const router = useRouter();
  
  onMounted(async () => {
    /* checkAuth(); */
    initializeAuthListener();
  });

  const initializeAuthListener = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        firebaseToken.value = await user.getIdToken();
        authActive.value = true;
        await getUserData(firebaseToken.value);
      } else {
        firebaseToken.value = null;
        userData.value = null;
        authActive.value = false;
      }
    });
  };

  const getUserData = async (token) => {
    try {
      const response = await APIService.loginFirebase(token);
      if (response.status === 200) {
        userData.value = response.data.user_data;
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
        await loadUserPermissions(userData.value.email);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  // Método para cargar los permisos del usuario
  const loadUserPermissions = async (email) => {
    isLoadingPermissions.value = true;  // Comienza la carga
    try {
      const response = await APIService.modulesUser(email);
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

  const loginFirebase = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      firebaseToken.value = await userCredential.user.getIdToken();
      await getUserData(firebaseToken.value);
      return { success: true };
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      errorAuth.value = error.message;
      return { success: false, error: error.message };
    }
  };

  /* const loginFirebase = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await userCredential.user.getIdToken();
      const response = await APIService.loginFirebase(firebaseToken);
      console.log('response: ', response)
      
      if (response.status === 200) {
        token.value = response.data.token;
        userData.value = response.data.user_data;
        authActive.value = true;
        errorAuth.value = null;
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user_data));
        await loadUserPermissions(email);
        return { success: true };
      } else {
        errorAuth.value = 'Credenciales incorrectas';
        return { success: false };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, error: error.message };
    }
  } */

  /* const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    token.value = null;
    userData.value = null;
    authActive.value = false;
    router.push('/auth');
  }; */
  const logout = async () => {
    try {
      await signOut(auth);
      firebaseToken.value = null;
      userData.value = null;
      authActive.value = false;
      router.push('/auth');
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  };

  /* const checkAuth = () => {
    if (token.value) {
      authActive.value = true;
    } else {
      authActive.value = false;
    }
  }; */

  /* const checkTokenValidity = async () => {
    if (!token.value) {
      return false;
    }

    try {
      const response = await APIService.verifyTokenAuth(token.value);
      if (response.data.isValid) {
        userData.value = response.data.userData;
        localStorage.setItem('user_data', JSON.stringify(response.data.userData));
      }
      return response.data.isValid;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return false;
    }
  }; */
  const checkTokenValidity = async () => {
    if (!firebaseToken.value) return false;
    try {
      const user = auth.currentUser;
      if (user) {
        // Forzar la actualización del token
        firebaseToken.value = await user.getIdToken(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return false;
    }
  };

  return {
    userData,
    errorAuth,
    authActive,
    useAuthTokenStore,
    logout,
    userPermissions,
    isLoadingPermissions,
    loadUserPermissions,
    loginFirebase,
    checkTokenValidity
  };
});