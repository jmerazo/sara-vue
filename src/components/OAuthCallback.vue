<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthTokenStore } from '@/stores/auth.js'; // Asegúrate de que la ruta sea correcta

const store = useAuthTokenStore();
const router = useRoute();

onMounted(() => {  
  const code = router.query.code; // Captura el código de la URL
  const state = localStorage.getItem('oauth_state');

  if (router.query.state !== state) {
    error.value = 'Invalid state parameter';
    console.error(error.value);
    return;
  }

  if (code) {
    sendCodeToAPI(code); // Envía el código a tu backend
  } else {
    console.error('No se encontró el código de autorización');
    // Maneja el caso de error adecuadamente
  }
});

const sendCodeToAPI = async (code) => {
    const response = await store.login({code : code}, 'google');
    if (response.success) {
        router.push({ name: "panel" }).catch((err) => {});
    } else {
        showLoginError("Credenciales inválidas");
    }
}
</script>

<template>
    <div>
      <h1>Procesando respuesta de Google...</h1>
    </div>
</template>
  