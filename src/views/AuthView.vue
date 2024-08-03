<script setup>
import { ref, computed } from "vue";
import { useAuthTokenStore } from "../stores/auth";
import { useRouter } from "vue-router";

const store = useAuthTokenStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const error = ref(null);
const isRequest = ref(false)

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



const formData = {
  name: '',
  email: '',
  occupation: '',
  entity: '',
  password: '',
  confirmPassword: ''
}

function changeForm() {
  isRequest.value = !isRequest.value
  return isRequest.value
}

function sendData(e) {
  e.preventDefault();

  if (isRequest.value) {

    if (Object.values(formData).includes('')) {
      error.value = 'Todos los campos son obligatorios'
      setTimeout(() => {
        error.value = null
      }, 3000)

      return
    }
    if(formData.password !== formData.confirmPassword){
      showLoginError('Las contraseñas no coinciden')
      setTimeout(() => {
        error.value = null
      }, 3000)

      return
    }
    //connect to the api to validate 
    console.log(formData);

  } else {
    if (email.value === '' || password.value === '') {
      showLoginError('Todos los campos son obligatorios')
      setTimeout(() => {
        error.value = null
      }, 3000)

      return
    }
    //connect to the api to sign in
    handleLoginFirebase() 
    console.log({ email: email.value, password: password.value });
  }

}


function showLoginError(message){
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};
</script>

<template>
  <div class="container__login" :class="{ 'mode__signin': isRequest }">
    <div class="login__content">
      <div class="forms">

        <!-- form to sign in -->
        <form class="form__sign-in">
          <h2 class="title">Iniciar sesión</h2>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="email" placeholder="Correo electrónico">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z">
                </path>
              </svg>
            </div>
            <input type="password" v-model="password" placeholder="Contraseña">
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <input @click="sendData" type="submit" value="Ingresar" class="login__button solid">
        </form>
        <!-- form to sign out -->
        <form class="form__sign-up">
          <h2 class="title">Solicitar ingreso</h2>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="formData.name" placeholder="Nombre completo">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z">
                </path>
              </svg>
            </div>

            <input type="email" v-model="formData.email" placeholder="Correo electrónico">
          </div>

          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 14V16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 21.5L15.0611 23.0451L15.6224 19.7725L13.2447 17.4549L16.5305 16.9775L18 14L19.4695 16.9775L22.7553 17.4549L20.3776 19.7725L20.9389 23.0451L18 21.5Z">
                </path>
              </svg>
            </div>
            <input type="text" v-model="formData.occupation" placeholder="Profesión">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z">
                </path>
              </svg>
            </div>
            <input type="text" v-model="formData.entity" placeholder="Entidad">
          </div>

          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z">
                </path>
              </svg>
            </div>
            <input type="password" v-model="formData.password" placeholder="Contraseña">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 14.1364 21.3301 16.1162 20.1889 17.741L17 12H20C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C14.1502 20 16.1023 19.1517 17.5398 17.7716L18.5379 19.567C16.7848 21.083 14.4995 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 7C13.6569 7 15 8.34315 15 10V11H16V16H8V11H9V10C9 8.34315 10.3431 7 12 7ZM14 13H10V14H14V13ZM12 9C11.4872 9 11.0645 9.38604 11.0067 9.88338L11 10V11H13V10C13 9.48716 12.614 9.06449 12.1166 9.00673L12 9Z">
                </path>
              </svg>
            </div>
            <input type="password" v-model="formData.confirmPassword" placeholder="Confirmar Contraseña">
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <input @click="sendData" type="submit" value="Enviar" class="login__button solid">
        </form>
      </div>
    </div>
    <div class="walls__container">

      <div class="wall wall__left">
        <div class="wall__content">
          <h3>¿Deseas solicitar acceso a SARA?</h3>
          <p>Diligencia el formulario y recibirás las instrucciones en tu email.</p>
          <!-- <p>Recuerda que las credenciales de acceso (correo y contraseña) serán las mismas una vez realizada la habilitación de la cuenta.</p> -->
          <button @click="changeForm" class="login__button transparent">
            Solicitar
          </button>
        </div>
        <img class="image" src="/img/auth/login-man2.svg" alt="img-auth">
      </div>

      <div class="wall wall__right">
        <div class="wall__content">
          <h3>¿Ya eres usuario SARA? </h3>
          <p>Si tienes una cuenta validada ingresa tus credenciales</p>
          <button @click="changeForm" class="login__button transparent">
            Ingresar
          </button>
        </div>
        <img class="image" src="/img/auth/login-woman2.svg" alt="img-auth">
      </div>

    </div>
  </div>
</template>

<style scoped>
.error {
  margin: 0;
  font-size: 1rem;
  color: red;
  border-left: 2px solid red;
  padding: 0 3rem;
  font-weight: 500;
}

.container__login {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
  margin-top: 5.6rem;
}

.container__login::before {
  content: '';
  position: absolute;
  width: 2000px;
  height: 2000px;
  border-radius: 50%;
  background: linear-gradient(-45deg, var(--primary-hover), var(--primary));
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  transition: all 1.8s ease-in-out;
  z-index: 6;
}

.login__content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.forms {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
  transition: 1s 0.7s ease-in-out;
}


.forms form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 5rem;
  overflow: hidden;
  grid-column: 1/2;
  grid-row: 1/2;
  transition: 0.2s 0.7s ease-in-out;
}

form.form__sign-in {
  z-index: 2;
}

form.form__sign-up {
  z-index: 1;
  opacity: 0;
}

/* form general components */

.forms form .title {
  font-size: 2rem;
  color: #444;
  margin-bottom: 1rem;
}

.forms form .form__field {
  max-width: 380px;
  width: 100%;
  height: 44px;
  background-color: #f0f0f0;
  margin: 1rem 0;
  border-radius: 44px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 .4rem;
}

.login__button {
  width: 150px;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 35px;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--blanco);
  font-weight: 600;
  text-transform: uppercase;
  margin: 1rem 0;
  transition: all .3s ease-in-out;
}

.login__button:hover {
  background-color: var(--primary-hover);
}

.form__field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 500;
  font-size: 1.1rem;
  color: #333;
}



.form__field input::placeholder {
  color: #aaa;
}



.form__field .icon svg {
  width: 1.5rem;
}

.form__field .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #acacac;
}

/* styles to walls */
.walls__container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.wall {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 7;
}

.wall__left {
  pointer-events: all;
  padding: 3rem 17% 5 12%;
}

.wall__right {
  pointer-events: none;
  padding: 3rem 12% 5 17%;
}

.wall .wall__content {
  color: #fff;
  transition: .9s .6s ease-in-out;
  padding: 0 5rem;
}

.login__button.transparent {
  background: none;
  border: 2px solid var(--blanco);
  width: 130px;
  height: 41px;
  font-size: 1rem;
}

.wall__right .wall__content,
.wall__right .image {
  transform: translateX(900px);
}

.image {
  width: 50%;
  transition: .9s .6s ease-in-out;
}

/* animation */

.container__login.mode__signin::before {
  transform: translate(100%, -50%);
  right: 52%;

}

.container__login.mode__signin .wall__left .image,
.container__login.mode__signin .wall__left .wall__content {
  transform: translateX(-1200px);
}

.container__login.mode__signin .wall__right .wall__content,
.container__login.mode__signin .wall__right .image {
  transform: translateX(0px);
}

.container__login.mode__signin .wall__left {
  pointer-events: none;
}

.container__login.mode__signin .wall__right {
  pointer-events: all;
}

.container__login.mode__signin .forms {
  left: 25%;
}

.container__login.mode__signin form.form__sign-in {
  z-index: 1;
  opacity: 0;
}

.container__login.mode__signin form.form__sign-up {
  z-index: 2;
  opacity: 1;
}

/* styles for screen types */

@media (max-width: 870px) {
  .container__login {
    min-height: 800px;
    height: 100vh;
  }

  .container__login::before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 68%;
    transform: translateX(-50%);
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .forms {
    width: 100%;
    left: 50%;
    top: 95%;
    transform: translate(-50%, -100%);
  }

  .walls__container {

    z-index: 10;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .wall {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
  }

  .wall .wall__content {
    padding-right: 15%;
    transition: .9s .8s ease-in-out;
  }

  .wall h3 {
    font-size: 1.2rem;
  }

  .wall p {
    font-size: .8rem;
    padding: .5rem 0;
  }

  .wall .login__button {
    width: 110px;
    height: 35px;
    font-size: .8rem;
    margin-top: 0;
  }

  .image {
    width: 200px;
    transition: 0.9s 0.6s ease-in-out;
  }

  .wall__left {
    grid-row: 1/2;
  }

  .wall__right {
    grid-row: 3/4;
  }

  .wall__right .wall__content,
  .wall__right .image {
    transform: translateX(800px);
  }

  .container__login.mode__signin::before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container__login.mode__signin .wall__left .image,
  .container__login.mode__signin .wall__left .wall__content {
    transform: translateY(-300px);
  }

  .container__login.mode__signin .forms {
    top: 5%;
    transform: translate(-50%, -10%);
    left: 50%;
  }

  .forms form .form__field {
    margin: .5rem 0;
  }
}

@media (max-width: 570px) {
  .forms form {
    padding: 0 1.5rem;
    justify-content: flex-start;
  }

  .image {
    display: none;
  }

  .wall .wall__content {
    padding: .5rem 1rem;
  }

  .wall__content {
    margin-top: -3rem;
  }

  .container__login::before {
    bottom: 68%;
    left: 50%;
  }

  .container__login.mode__signin::before {
    bottom: 35%;
    left: 50%;
  }

  .forms form .title {
    font-size: 1.3rem;
  }

  .form__field input {
    font-size: 1rem;
  }

  .login__button {
    font-size: 1rem;
    width: 300px;
    height: 32px;
    margin-top: 2rem;
  }

  .forms form .form__field {
    max-width: 380px;
    width: 100%;
    height: 35px;
    border-radius: 35px;
    grid-template-columns: 15% 85%;
    padding: 0 .4rem;
  }
}
</style>