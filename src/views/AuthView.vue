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
    <main class="login__contenido">
      
      <form @submit.prevent="handleLogin" class="formulario">
        <p class="formulario__icono"><font-awesome-icon :icon="['fas', 'circle-user']" /></p>
        <div class="formulario__seccion">
          <label for="email" class="formulario__label">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="formulario__input"
            required
          />
        </div>
        <div class="formulario__seccion">
          <label for="password" class="formulario__label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="formulario__input"
            required
          />
        </div>
        <input type="submit" class="formulario__boton" :class="{'show':error}" :value="error ? error : 'Ingresar'">
      </form>

      <RouterLink :to="{ name: 'register' }" class="formulario__enlace">
        <span>Solicitud de registro</span>
      </RouterLink>
    </main>
  </div>
</template>

<style scoped>

.login__header {
  margin-top: 3rem;
}
.login__heading {
  font-size: 2rem;
  margin: 2rem auto;
}
@media (min-width:768px){
  .login__heading{
    font-size: 3rem;
  }
}
.login__contenido {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 3rem auto;
}

@media (min-width:768px){
  .login__contenido{
    margin: 5rem auto;
  }
}
.formulario__icono{
  text-align: center;
  margin: 2rem 0 0 0;
  font-size: 3rem;
  color: var(--gris);
}

@media (min-width:768px){
  .formulario__icono{
    font-size: 5rem;
  }
}

.formulario {
  display: flex;
  flex-direction: column;
  background-color: var(--gris-claro);
  margin-bottom: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
}


.formulario__seccion {
  margin: 1rem 1rem;
}

@media (min-width:768px){
  .formulario{
    width: 50%;
    
  }
  .formulario__seccion{
    margin: 2rem 1rem;
  }
}

.formulario__label {
  display: block;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}
.formulario__input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}

@media (min-width:768px){
  .formulario__input{
    text-align: center;
    width: 95%;
  }
}
.formulario__input:focus{
  outline: 2px solid var(--primary);
}

.formulario__boton {
  background-color: green;
  max-width: 100%;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 1rem 0;
  color: var(--blanco);
  font-weight: 700;
  transition: background-color 0.3s ease;
}

.formulario__boton:hover {
  background-color: var(--primary-hover);
}

.show {
  background-color: rgb(175, 4, 4);
}
.show:hover{
  background-color: rgb(209, 7, 7);
}

.formulario__enlace{
  font-weight: 700;
  padding: .5rem;
  color: var(--primary);
  border-bottom: 1px solid var(--gris);
  transition: background-color .4s;
}
.formulario__enlace:hover{
 
  color: var(--blanco);
  border-bottom: none;
  background-color: var(--gris);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>