<script setup>
import { ref } from 'vue'
import { useAuthToken } from '../stores/auth'
import { useRouter } from 'vue-router';

const store = useAuthToken();
const router = useRouter();
const username = ref('')
const password = ref('')


const loginError = ref(null);

const handleLogin = async () => {
    const credentials = {
      username: username.value,
      password: password.value,
    }

    await store.login(credentials)

    // Si el inicio de sesión fue exitoso, redireccionamos a la página 'aboutus'
    if (!store.error) {
        router.push({ name: 'aboutus' })
    }
}

const showLoginError  = () => {
    loginError.value = 'Credenciales incorrectas';
    setTimeout(() => {
        loginError.value = null;
    }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};
</script>

<template>
    <div class="h-screen flex justify-center items-center bg-gray-50">
        <div class="relative bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50">
            <h2 class="text-2xl font-bold mb-4">Iniciar sesión</h2>
            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                <label for="email" class="block font-semibold mb-1">Usuario</label>
                <input v-model="username" type="text" id="username" class="w-full rounded-lg border px-4 py-2" required>
                </div>
                <div>
                <label for="password" class="block font-semibold mb-1">Contraseña</label>
                <input v-model="password" type="password" id="password" class="w-full rounded-lg border px-4 py-2" required>
                </div>
                <button type="submit" class="w-full bg-green-500 text-white font-semibold rounded-lg py-2">Ingresar</button>
                <div v-if="error" class="text-red-500 mt-2">Credenciales incorrectas</div>
            </form>
        </div>
    </div>
</template>