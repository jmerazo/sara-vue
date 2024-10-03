import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import APIService from '../services/APIService';
import { auth } from '../firebase/firebase';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup
 } from 'firebase/auth';

export const useAuthTokenStore = defineStore('authToken', () => {
  const firebaseToken = ref(null);
  const userData = ref(null);
  const errorAuth = ref(null);
  const authActive = ref(false);
  const userPermissions = ref(null);
  const isLoadingPermissions = ref(false);
  const loading = ref(null);

  const router = useRouter();

  const initializeAuthListener = () => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        loading.value = true;
        if (user) {
          try {
            firebaseToken.value = await user.getIdToken(true);
            authActive.value = true;
            await getUserData(firebaseToken.value);
          } catch (error) {
            console.error('Error al obtener el token:', error);
            clearAuthState();
          }
        } else {
          clearAuthState();
        }
        loading.value = false;
        resolve();
      });
    });
  };

  const getUserData = async (firebaseToken, recaptchaToken) => {
    try {
      // Enviar el token al backend para obtener los datos del usuario
      const response = await APIService.loginFirebase(firebaseToken, recaptchaToken);
  
      if (response.data.success) {
        // La autenticación fue exitosa
        userData.value = response.data.data.user_data;
        localStorage.setItem('user_data', JSON.stringify(response.data.data.user_data));
        await loadUserPermissions(userData.value.email);
      } else {
        // La autenticación falló, manejar el error
        console.error('Error al obtener datos del usuario:', response.data.message);
        throw new Error(response.data.message || 'Error al obtener datos del usuario');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      clearAuthState();
      throw error;
    }
  };

  const loadUserPermissions = async (email) => {
    if (!email) return;
    isLoadingPermissions.value = true;
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
      isLoadingPermissions.value = false;
    }
  };

  const loginFirebase = async (email, password, recaptchaToken) => {
    try {
      loading.value = true;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      firebaseToken.value = await userCredential.user.getIdToken();
      await getUserData(firebaseToken.value, recaptchaToken);
      return { success: true };
    } catch (error) {
      //console.error('Error durante el inicio de sesión:', error);
      errorAuth.value = error.message;
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  };

  const loginWithProvider = async (providerName, recaptchaToken) => {
    loading.value = true;
    try {
      let provider;
      if (providerName === 'google') {
        provider = new GoogleAuthProvider();
      } else if (providerName === 'microsoft') {
        provider = new OAuthProvider('microsoft.com');
      } else {
        throw new Error('Proveedor no soportado');
      }

      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const firebaseToken = await firebaseUser.getIdToken();

      // Utilizar getUserData para manejar la autenticación
      await getUserData(firebaseToken, recaptchaToken);

      return { success: true };
    } catch (error) {
      errorAuth.value = error.message;
      console.error('Error durante el inicio de sesión social:', error);
      return { success: false, error: error.message };
    } finally {
      loading.value = false;
    }
  }; 

  const logout = async () => {
    try {
      await signOut(auth);
      clearAuthState();
      router.push('/auth');
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  };

  const clearAuthState = () => {
    firebaseToken.value = null;
    userData.value = null;
    authActive.value = false;
    userPermissions.value = null;
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_permissions');
  };

  const getToken = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        return await user.getIdToken(true);
      } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
      }
    }
    return null;
  };

  const checkAuth = async () => {
    if (loading.value) {
      await new Promise(resolve => {
        const checkLoading = setInterval(() => {
          if (!loading.value) {
            clearInterval(checkLoading);
            resolve();
          }
        }, 100);
      });
    }

    if (!authActive.value) {
      const token = await getToken();
      if (token) {
        firebaseToken.value = token;
        authActive.value = true;
        await getUserData(token);
      }
    }
    return authActive.value;
  };

  return {
    userData,
    errorAuth,
    authActive,
    logout,
    userPermissions,
    isLoadingPermissions,
    loadUserPermissions,
    loginFirebase,
    checkAuth,
    loading,
    initializeAuthListener,
    getToken,
    loginWithProvider,
  };
});