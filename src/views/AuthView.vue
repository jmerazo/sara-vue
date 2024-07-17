<script setup>
import { ref, onMounted } from "vue";
import { useAuthTokenStore } from "../stores/auth";
import { useRouter } from "vue-router";
import Alerta from "@/components/shared/Alerta.vue";

const store = useAuthTokenStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const error = ref(null);


const handleLoginFirebase = async () => {
  try {
    const response = await store.loginFirebase(email.value, password.value)
    console.log("response login: ", response.success)
    if (response.success) {
      router
        .push({
          name: "home-panel", // Nombre de la ruta de la vista del panel
        })
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

const handleGoogleLogin = () => {
  const client_id = '46583489341-6lugf7o37gcgqk9u7aj210e16pi79bhg.apps.googleusercontent.com';
  const redirect_uri = 'http://localhost:5173/auth/callback';
  /* const client_id = '754512352002-5if5e9nmuaq5hb2of73e3trhepq2315r.apps.googleusercontent.com';
  const redirect_uri = 'https://sara.corpoamazonia.gov.co/auth/callback'; */
  const scope = 'email profile openid';
  const response_type = 'code';
  const state = generateRandomString(); // Genera un string aleatorio seguro
  localStorage.setItem('oauth_state', state); // Almacena el state en el almacenamiento local para verificarlo luego

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${response_type}&client_id=${encodeURIComponent(client_id)}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=${encodeURIComponent(state)}`;

  window.location.href = authUrl; // Redirigir al usuario a la URL de Google
}

function generateRandomString() {
  const array = new Uint32Array(10);
  window.crypto.getRandomValues(array);
  return array.join('');
}
</script>

<template>
  <div class="contenedor">
      <div class="formulario__contenido">
        <div class="formulario">
          <form @submit.prevent="handleLoginFirebase" >
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
          <div class="login-container">
            <div class="login-social">
              <span>Iniciar sesión con:</span>
              <button @click="handleGoogleLogin" class="google-login-btn">
                <img src="/icons/google.png" alt="Google login" class="google-icon">
                Google
              </button>
            </div>   
          </div> 
        </div>        
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
  margin:  6rem 0 3rem 0;
  text-align: center;
 
}

@media (min-width: 992px) {
  .formulario__contenido {
    margin: 9rem 0 3rem 0;
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

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 400px;
  margin-top: 1rem; /* Añadido espacio entre el formulario y el botón de Google */
  padding: 1rem;
}

.login-social {
  display: flex;
  flex-direction: column;
  align-items: center; /* Asegura que los elementos hijos se alineen al centro horizontalmente */
  width: 100%; /* Opcional, depende de cómo quieras manejar el ancho */
}

.google-login-btn {
  background-color: #ffffff; /* Color de Google */
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 0 auto; /* Centra el botón en el contenedor */
}

.google-login-btn:hover {
  background-color: #f5f5f5; /* Color más oscuro al pasar el mouse */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.google-icon {
  width: 20px; /* Tamaño del icono de Google */
}

.login-social span {
  margin-bottom: 0.5rem; /* Espacio entre la etiqueta y el botón */
  font-size: 1rem; /* Tamaño de la fuente para 'Iniciar sesión con' */
}
</style>