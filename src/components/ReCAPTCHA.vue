<template>
    <div>
      <!-- Contenedor para el reCAPTCHA -->
      <div ref="recaptcha"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecaptcha } from 'vue-recaptcha-v3';

const actionName = 'formulario_solicitud_registro'; // Cambia esto según la acción que estés registrando

const recaptchaRef = ref(null);

onMounted(async () => {
    const recaptcha = useRecaptcha();
    try {
        await recaptcha.load();
        recaptchaRef.value = await recaptcha.execute(actionName);
    } catch (error) {
        console.error('Error al cargar reCAPTCHA:', error);
    }
});
</script>