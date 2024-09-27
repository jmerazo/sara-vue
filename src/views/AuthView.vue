<script setup>
import { ref, computed, onMounted } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";
import { useAuthTokenStore } from "@/stores/auth";
import { useUsersStore } from "@/stores/users"
import { locatesColombia } from "@/stores/locates"
import { useRouter } from "vue-router";
import { useToast } from "../helpers/ToastManagement";
import LoadingData from "@/components/shared/LoadingData.vue";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const locates = locatesColombia();
const store = useAuthTokenStore();
const usersStore = useUsersStore();
const router = useRouter();
const { addToast } = useToast();
const auth = getAuth();

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

const email = ref("");
const password = ref("");
const error = ref(null);
const isRequest = ref(false);
const isRequestOAuth2 = ref(true);

const handleLoginFirebase = async () => {
  try {
    await recaptchaLoaded();
    const recaptchaToken = await executeRecaptcha('login');
    const response = await store.loginFirebase(email.value, password.value, recaptchaToken);

    if (response.success) {
      router.push({
        name: "home-panel",
      });
    } else {
      addToast(`Usuario: ${email.value} o credenciales inválidas`, {
        type: 'warning',
        duration: 4000
      });
    }
  } catch (e) {
    addToast(e, {
      type: 'error',
      duration: 4000
    });
  }
};

const formData = ref({
  uuid_firebase: "NA",
  document_type: "Cédula de ciudadanía",
  document_number: "",
  first_name: "",
  last_name: "",
  email: "",
  cellphone: "",
  password: "",
  confirm_password: "",
  department: "",
  city: "",
});

function changeForm() {
  isRequest.value = !isRequest.value;
  return isRequest.value;
}

const filteredCities = computed(() => {
  const { department } = formData.value;
  if (department) {
    return locates.cities.filter(city => city.department === department);
  }
  return [];
});

async function sendData(e) {
  e.preventDefault();

  if (isRequest.value) {
    if (Object.values(formData.value).includes('')) {
      showLoginError('Todos los campos son obligatorios');
      return;
    }
    if (formData.value.password !== formData.value.confirm_password) {
      showLoginError('Las contraseñas no coinciden');
      return;
    }
    try {
      const recaptchaToken = await executeRecaptcha('register');
      const response = await usersStore.registerUser({ ...formData.value, recaptcha_token: recaptchaToken });
      console.log('response ', response)
      resetForm();
      if(response.status === 201){
        addToast('Registro social exitoso. Por favor, complete su perfil.', { type: 'success', duration: 4000 });
        router.push({ name: "signUpSuccess" });
      }
    } catch (error) {
      console.log(error);
      addToast('Error en el registro', { type: 'error', duration: 4000 });
    }
  } else {
    if (email.value === '' || password.value === '') {
      showLoginError('Todos los campos son obligatorios');
      return;
    }
    handleLoginFirebase();
  }
}

async function handleSocialRegister(provider) {
  try {
    let authProvider;
    switch (provider) {
      case 'google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'microsoft':
        authProvider = new OAuthProvider('microsoft.com');
        break;
      default:
        throw new Error('Proveedor no soportado');
    }

    const result = await signInWithPopup(auth, authProvider);
    const user = result.user;

    // Preparar datos para el registro social
    const socialUserData = {
      email: user.email,
      first_name: user.displayName?.split(' ')[0] || '',
      last_name: user.displayName?.split(' ').slice(1).join(' ') || '',
      uuid_firebase: user.uid,
      provider: provider,
      is_social_auth: true,
      department: 0,
      city: 1128
    };

    // Enviar datos directamente al backend
    try {
      const response = await usersStore.registerUser(socialUserData);
      console.log('response view register ', response)
      if(response.status === 201){
        addToast('Registro social exitoso. Por favor, complete su perfil.', { type: 'success', duration: 4000 });
        router.push({ name: "signUpSuccess" });
      }
    } catch (error) {
      addToast('Error en el registro con red social', { type: 'error', duration: 4000 });
    }
  } catch (error) {
    addToast('Error en la autenticación con red social', { type: 'error', duration: 4000 });
  }
}

function resetForm() {
  Object.keys(formData.value).forEach((key) => {
    formData.value[key] = "";
  });
}

function showLoginError(message) {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000);
}
</script>

<template>
  <div class="container__login" :class="{ 'mode__signin': isRequest }">
    <div class="login__content">

      <div class="forms">
        <div class="loading__auth" :class="{ active: store.loading }">
          <LoadingData v-if="store.loading" />
        </div>

        <!-- form to sign int -->
        <form class="form__sign-in" @submit.prevent="sendData">
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
          <input type="submit" value="Ingresar" class="login__button solid">
        </form>

        <!-- form to sign out -->
        <form class="form__sign-up">
          <h2 class="title">Solicitar ingreso</h2>

          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="formData.document_number" placeholder="No. Identificación">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="formData.first_name" placeholder="Nombres">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="formData.last_name" placeholder="Apellidos">
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z">
                </path>
              </svg>
            </div>

            <input type="text" v-model="formData.cellphone" placeholder="Celular">
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
                  d="M4 6.14286V18.9669L9.06476 16.7963L15.0648 19.7963L20 17.6812V4.85714L21.303 4.2987C21.5569 4.18992 21.8508 4.30749 21.9596 4.56131C21.9862 4.62355 22 4.69056 22 4.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V7L4 6.14286ZM16.2426 11.2426L12 15.4853L7.75736 11.2426C5.41421 8.89949 5.41421 5.10051 7.75736 2.75736C10.1005 0.414214 13.8995 0.414214 16.2426 2.75736C18.5858 5.10051 18.5858 8.89949 16.2426 11.2426ZM12 12.6569L14.8284 9.82843C16.3905 8.26633 16.3905 5.73367 14.8284 4.17157C13.2663 2.60948 10.7337 2.60948 9.17157 4.17157C7.60948 5.73367 7.60948 8.26633 9.17157 9.82843L12 12.6569Z">
                </path>
              </svg>
            </div>
            <select v-model="formData.department" style="color: gray;" name="department" id="department">
              <option value="">--Departamento--</option>
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
                {{ loc.name }}
              </option>
            </select>
            <!-- <input type="text" v-model="formData.department" placeholder="Departamento"> -->
          </div>
          <div class="form__field">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z">
                </path>
              </svg>
            </div>
            <select :disabled="filteredCities.length === 0" v-model="formData.city" style="color: gray;" name="city"
              id="city">
              <option value="">--Ciudad--</option>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
            <!-- <input type="text" v-model="formData.city" placeholder="Ciudad"> -->
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
            <input type="password" v-model="formData.confirm_password" placeholder="Confirmar Contraseña">
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <input @click="sendData" type="submit" value="Enviar" class="login__button solid">

          <div class="content__registerOauth2">
            <p>Registrarse con: </p>
            <div class="logos__container">

              <div class="logo" @click="handleSocialRegister('google')">
                <img src="/icons/google.png" class="logos__oauth2">
              </div>

              <div class="logo" @click="handleSocialRegister('microsoft')">
                <img src="/icons/outlook.png" class="logos__oauth2">
              </div>

            </div>
          </div>
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

.content__registerOauth2 {
  margin: 1rem 0 3rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.content__registerOauth2 p {
  text-align: center;
  margin: 0;
  font-weight: bold;
  color: var(--gris);
}

.logos__container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.logos__container .logo {
  transition: all .3s ease-in-out;
}

.logos__container .logo:hover {
  transform: scale(1.2);
}

.logos__oauth2 {
  width: 2rem;
  margin: 0 0.5rem;
  background-color: transparent;
  /* Asegura que el fondo sea transparente */
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

.loading__auth {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo semi-transparente */
  z-index: 10;
  /* Asegura que esté por encima del formulario */
}

.loading__auth {
  /* ... otros estilos ... */
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  pointer-events: none;
}

.loading__auth.active {
  opacity: 1;
  pointer-events: auto;
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

.form__field input,
.form__field select {
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
    min-height: 1000px;
    height: 100vh;
  }

  .container__login::before {
    width: 1500px;
    height: 1500px;
    left: 30%;
    bottom: 63%;
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
    margin-bottom: -2rem;
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
    bottom: 22%;
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
    padding: 2rem 1.5rem;
  }

  .image {
    display: none;
  }

  .container__login.mode__signin .walls__container {
    margin-top: 2.7rem;
  }

  .wall .wall__content {
    padding:.5rem 1rem;

  }

  .wall__content {
    margin-top: -7rem;
  }

  .container__login::before {
    bottom: 73%;
    left: 50%;
  }

  .container__login.mode__signin::before {
    bottom: 25%;
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