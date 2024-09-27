<script setup>
import { watch, computed, ref } from "vue";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { locatesColombia } from "@/stores/locates";
import APIService from "@/services/APIService";
import { useRouter } from "vue-router";
import { useToast } from '../../../helpers/ToastManagement';

const router = useRouter();
const locates = locatesColombia();
const modal = useModalStore();
const usersStore = useUsersStore();
const error = ref('')
const { addToast } = useToast();

const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);

const formData = ref({
  document_type: "",
  document_number: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirm_password: "",
  cellphone: "",
  rol: "",
  department: "",
  city: "",
});

const filteredCities = computed(() => {
  const selectedDepartament = formData.value.department;
  if (selectedDepartament) {
    const filtered = locates.cities.filter(
      (city) => city.department === selectedDepartament
    );
    return filtered;
  }
  return [];
});

async function userAdd() {
  if (!validateForm()) {
    error.value = 'Hay campos vacíos'
    setTimeout(() => {
      error.value = ''
    }, 3000)
    return;
  }

  try {
    const response = await usersStore.createUser(formData.value);
    console.log('response add ', response);

    if (response.status === 201) {
      addToast(response.msg, { 
        type: 'success', 
        duration: 3000 
      });
      modal.handleClickModalUserAdd();
    }
  } catch (error) {
    console.log('error ', error)
    // Mostrar el mensaje de error en el toast
    if (error.message) {
      addToast(error.message, { 
        type: 'error',
        duration: 3000
      });
    } else {
      addToast("Ocurrió un error al procesar la solicitud.", { 
        type: 'error',
        duration: 3000
      });
    }
  }
}

function validateForm() {
  const formKeys = Object.keys(formData.value);
  for (const key of formKeys) {
    if (!formData.value[key]) {
      return false;
    }
  }
  return true;
}

function validatePasswords() {
  return formData.value.password === formData.value.confirm_password;
}

const mostrarError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 8000); // El mensaje de error desaparecerá después de 3 segundos
};

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}

function toggleConfirmPasswordVisibility() {
  confirmPasswordVisible.value = !confirmPasswordVisible.value;
}

const passwordMatchClass = computed(() => {
  if (formData.value.password === '' || formData.value.confirm_password === '') {
    return '';
  }
  return formData.value.password === formData.value.confirm_password ? 'match' : 'mismatch';
});

watch([() => formData.value.password, () => formData.value.confirm_password], () => {
  if (!validatePasswords()) {
    mostrarError('Las contraseñas no coinciden');
  } else {
    error.value = null;
  }
});
</script>

<template>
  <div class="modal" v-if="modal.modalUserAdd">
    <div class="modal__contenido">
      <div>

        <div>
          <div class="modal__encabezado">
            <div class="modal__imagen">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                </path>
              </svg>
            </div>
          </div>
          <hr />
          <form @submit.prevent="userAdd" class="form__modal">
            <div class="form__modal--field">
              <label class="form__modal--label" for="doctype">
                Tipo de
                documento :</label>
              <select name="doctype" id="doctype" class="form__modal--input" v-model="formData.document_type">
                <option value="null" selected disabled>
                  Seleccione un tipo de documento
                </option>
                <option value="Cédula de ciudadania">
                  Cédula de ciudadania
                </option>
                <option value="Número de identificación tributaria">
                  Número de identificación tributaria
                </option>
                <option value="Tarjeta de identidad">
                  Tarjeta de identidad
                </option>
              </select>
            </div>
            <div class="form__modal--field">
              <label for="identificacion" class="form__modal--label">Número de
                documento :</label>

              <input id="identificacion" type="number" class="form__modal--input" v-model="formData.document_number" />
              <!-- usersStore.userSelected[0].document_number -->
            </div>
            <div class="form__modal--field">
              <label for="nombres" class="form__modal--label">Nombres
                :</label>
              <input id="nombres" type="text" class="form__modal--input" v-model="formData.first_name" />
            </div>
            <div class="form__modal--field">
              <label for="apellidos" class="form__modal--label">Apellidos
                :</label>
              <input id="apellidos" type="text" class="form__modal--input" v-model="formData.last_name" />
            </div>
            <div class="form__modal--field">
              <label for="email" class="form__modal--label">Correo
                :</label>
              <input id="email" type="email" class="form__modal--input" v-model="formData.email" />
            </div>
            <div class="form__modal--field">
              <label for="contacto" class="form__modal--label">Celular
                :</label>
              <input id="contacto" type="number" class="form__modal--input" v-model="formData.cellphone" />
            </div>
            <div class="form__modal--field">
              <label for="rol" class="form__modal--label">Rol
                :</label>
              <select name="rol" id="rol" class="form__modal--input" v-model="formData.rol">
                <option value="" selected disabled>
                  Seleccione un rol...
                </option>
                <option v-for="r in usersStore.roles" :key="r.id" :value="r.id">
                  {{ r.name }}
                </option>
              </select>
            </div>
  
            <div class="form__modal--field">
              <label for="department" class="form__modal--label">Departamento
                :</label>
              <select name="department" id="department" class="form__modal--input" v-model="formData.department">
                <option value="null" selected disabled>
                  Seleccione un departamento...
                </option>
                <option v-for="loc in locates.departments" :key="loc.id" :value="loc.id">
                  {{ loc.name }}
                </option>
              </select>
            </div>
            <div class="form__modal--field" v-show="filteredCities.length">
              <label for="city" class="form__modal--label">Ciudad
                :</label>
              <select name="city" id="city" class="form__modal--input" v-model="formData.city">
                <option value="null" selected disabled>
                  Seleccione un municipio...
                </option>
                <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>

            <div class="form__modal--field" :class="passwordMatchClass">
              <label for="password" class="form__modal--label">Contraseña:</label>
              <div class="input-group">
                <input :type="passwordVisible ? 'text' : 'password'" class="form__modal--input" v-model="formData.password" />
                <button type="button" @click="togglePasswordVisibility">{{ passwordVisible ? 'Ocultar' : 'Mostrar' }}</button>
              </div>
            </div>

            <div class="form__modal--field" :class="passwordMatchClass">
              <label for="cpassword" class="form__modal--label">Confirmar Contraseña:</label>
              <div class="input-group">
                <input :type="confirmPasswordVisible ? 'text' : 'password'" class="form__modal--input" v-model="formData.confirm_password" />
                <button type="button" @click="toggleConfirmPasswordVisibility">{{ confirmPasswordVisible ? 'Ocultar' : 'Mostrar' }}</button>
              </div>
            </div>

            <p v-if="error" class="msg__error">{{ error }}</p>

            <div class="form__modal--buttons" :style="error ? 'margin-top: 0rem;' : ''">
              <button type="submit" class="form__modal--save">
                <svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                  </path>
                </svg>
              </button>
            </div>

            <div @click="modal.handleClickModalUserAdd()"
              class="button__modal--close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.msg__error {
  padding: 0;
  margin: 0;
  text-align: center;
  border-left: 4px solid var(--rojo);
  padding-left: 2rem;
  color: var(--rojo);
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group button {
  margin-left: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.match {
  border-color: green;
}

.mismatch {
  border-color: red;
}

/* styles generals */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}

@media (min-width: 1440px) {
  .modal__contenido {
    width: 30%;
  }
}

.modal__encabezado {
  display: flex;
  flex-direction: column;
}

.modal__imagen {
  width: 5rem;
  margin: 0 auto;
}

.modal__titulo {
  font-size: .95rem;
  margin: 0 auto;
  padding: 0;
  font-weight: 700;
}



.form__modal--buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 15%;
  margin: 0 auto;
  margin-top: 2.1rem;
}

@media (min-width: 768px) {
  .form__modal .form__modal--buttons {
    width: 10%;
  }
}

.button__user-delete:hover {
  background: var(--rojo);
  color: var(--blanco);
}


.alerta {
  background: var(--rojo);
}
</style>