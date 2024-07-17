<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthTokenStore } from '@/stores/auth.js'; // Asegúrate de que la ruta sea correcta
import LoadingData from "@/components/LoadingData.vue";

const store = useAuthTokenStore();
const router = useRouter();
const isVisible = ref(true); // Controla la visibilidad del componente

onMounted(() => {  
  const code = router.currentRoute.value.query.code; // Captura el código de la URL
  const state = localStorage.getItem('oauth_state');

  if (router.currentRoute.value.query.state !== state) {
    console.error('Invalid state parameter');
    isVisible.value = false; // Ocultar el componente
    return;
  }

  if (code) {
    sendCodeToAPI(code); // Envía el código a tu backend
  } else {
    console.error('No se encontró el código de autorización');
    isVisible.value = false; // Ocultar el componente si no hay código
  }
});

const sendCodeToAPI = async (code) => {
    const response = await store.login({code: code}, 'google');
    if (response.success) {
        router.push({ name: "panel" }).catch((err) => {});
    } else {
        router.push({ name: "auth"}).catch((err) => {});
    }
    isVisible.value = false; // Ocultar el componente después de procesar la respuesta
};
</script>

<template>
  <div v-if="isVisible">
    <h1>Procesando respuesta de Google...</h1>
    <LoadingData v-if="isVisible" />
  </div>
</template>

  