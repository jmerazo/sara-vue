<script setup>
import { ref } from "vue";
import { useAuthToken } from "../stores/auth";
import { useRouter } from "vue-router";

const store = useAuthToken();
const router = useRouter();
const username = ref("");
const password = ref("");

const error = ref(null);

const handleLogin = async () => {
  const credentials = {
    username: username.value,
    password: password.value,
  };
  try {
    const response = await store.login(credentials);
    console.log("r: ", response);
    if (response.success) {
      router.push({ name: "aboutus" });
    } else {
      showLoginError("Credenciales inválidas");
    }
  } catch (e) {
    showLoginError(e.message);
  }
};

const handleLogout = () => {
  store.logout();
  // Redirigir a la página de inicio de sesión u otra página adecuada
  router.push("/");
};

const showLoginError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};
</script>

<template>
  <div class="h-screen flex justify-center items-center mb-8">
    <div
      class="w-full max-w-md relative bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50"
    >
      <h2 class="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block font-semibold mb-1">Usuario</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="w-full rounded-lg border px-4 py-2"
            required
          />
        </div>
        <div>
          <label for="password" class="block font-semibold mb-1"
            >Contraseña</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full rounded-lg border px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-500 text-white font-semibold rounded-lg py-2"
        >
          Ingresar
        </button>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>