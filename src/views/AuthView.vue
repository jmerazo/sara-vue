<script setup>
import { ref } from "vue";
import { useAuthToken } from "../stores/auth";
import { useRouter } from "vue-router";
import Alerta from "@/components/Alerta.vue";

const store = useAuthToken();
const router = useRouter();
const email = ref("");
const password = ref("");

const error = ref(null);

const handleLogin = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    const response = await store.login(credentials);

    if (response.success) {
      const user = response.user;
      router
        .push({
          name: "panel", // Nombre de la ruta de la vista del panel
          params: response.user, // Envía response.data como parámetros
        })
        .catch((err) => {});
    } else {
      showLoginError("Credenciales inválidas");
    }
  } catch (e) {
    showLoginError(e.message);
  }
};

const showLoginError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};

localStorage.removeItem("hasReloaded");
</script>

<template>
  <div class="contenedor">
    <div class="login__header">
      <h2 class="login__heading">Iniciar sesión</h2>
    </div>
    <hr />
    
      <div class="formulario__contenido">
        <form @submit.prevent="handleLogin" class="formulario">
          <div class="formulario__encabezado">
            <div class="logo">
              <img src="/icons/sara.png" alt="Logotipo" />
            </div>
            <p>Bienvenidos</p>
          </div>
          <hr />
          <div class="formulario__campo">
            <label class="formulario__label" for="email">Email</label>
            <input
              class="formulario__input"
              type="email"
              name="email"
              id="email"
              v-model="email"
              placeholder="Escribe tu email"
            />
          </div>
          <div class="formulario__campo">
            <label class="formulario__label" for="pass">Contraseña</label>
            <input
              class="formulario__input"
              type="password"
              id="password"
              v-model="password"
              placeholder="Ingresar contraseña"
              required
            />
          </div>
          <div class="formulario__botones">
            <input
              class="formulario__btn"
              type="submit"
              name="ingresar"
              id="ingresar"
              :class="{ show: error }"
              :value="error ? error : 'Ingresar'"
            />
          </div>
          <RouterLink :to="{ name: 'register' }" class="formulario__enlace">
            <span>Solicitud de registro</span>
          </RouterLink>
        </form>
      </div>
   
  </div>
</template>

<style scoped>
.login__heading{
  margin-top: 2rem;
}
.show {
  background-color: rgb(175, 4, 4);
}

.formulario__enlace {
  font-weight: 700;
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--primary);
  border-bottom: 1px solid var(--gris);
  transition: background-color 0.5s;
}
.formulario__enlace:hover {
  background-color: var(--gris);
  opacity: 1.1;
  color: var(--blanco);
  border-radius: 5px;
  border-bottom: none;
  border: 1px solid var(--gris);
}

.formulario__encabezado {
  color: var(--gris);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  gap: 1rem;
}
.logo {
  width: 3.5rem;
}

.formulario__contenido {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  text-align: center;
}

@media (min-width: 992px) {
  .formulario__contenido {
    margin: 3rem auto;
  }
}

.formulario {
  width: 90%;
  max-width: 400px;
  padding: 1rem;
  border: 1px solid #ccc;
  background-color: var(--blanco);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.formulario__campo {
  margin: 2rem 0;
}

.formulario__label {
  font-size: 1rem;
  display: block;
  font-weight: bold;
  color: var(--gris);
}

.formulario__input {
  font-size: 1rem;
  text-align: center;
  width: 95%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.formulario__botones{
  margin: 2rem 0;
}
.formulario__btn {
  width: 95%;
  font-size: 1rem;
  font-weight: 700;
  padding: .5rem;
  background-color: var(--primary);
  color: var(--blanco);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>