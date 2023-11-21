<script setup>
import { registerables } from "chart.js";
import { ref, computed } from "vue";
import APIService from "../services/APIService";
import { useAuthToken } from "../stores/auth";

const locates = useAuthToken();

// Datos del formulario
const formData = ref({
  document_type: "Cédula de ciudadanía",
  document_number: "",
  first_name: "",
  last_name: "",
  email: "",
  cellphone: "",
  profession: "",
  entity: "",
  reason: "",
  password:"123456789",
  confirm_password: "123456789",
  department: "",
  city: "",
});



const error = ref("");
const exito = ref(false)

const profesiones = [
  "Estudiante",
  "Ingeniero",
  "Médico",
  "Abogado",
  "Diseñador",
  "Profesor",
  // Agrega más profesiones según sea necesario
];

const filteredCities = computed(() => {
  const { department } = formData.value;

  if (department) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === department
    );
    return filtered;
  }
  return [];
});

function validarCampos(obj) {
  return Object.values(obj).some((value) => value === "");
}

// function confirmarPassword() {
//   const { password, confirm_password } = formData.value;
//   return password === confirm_password;
// }

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

function validatePasswords() {
  return formData.value.password === formData.value.confirm_password;
}


// Función para enviar el formulario
async function userCreate() {

  if (validarCampos(formData.value)) {
    mostrarError("Llene todos los campos") ;
    return;
  }

  // if (!confirmarPassword()) {
  //   mostrarError("Las contraseñas no coinciden");
  //   return;
  // }


  try {
    await APIService.createUsers(formData.value);
    resetForm();
    exito.value = true
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
}



function convertToUppercase(event) {
  const inputElement = event.target;
  inputElement.value = inputElement.value.toUpperCase();
}

const mostrarError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = null;
  }, 3000); // El mensaje de error desaparecerá después de 3 segundos
};

</script>

<template>
  <div class="contenedor">
    <div class="solicitud__header">
      <h2 class="solicitud__heading">Solicitud de registro</h2>
    </div>

    <main v-if="!exito" class="solicitud__contenido">
      <form @submit.prevent="userCreate" class="formulario">
        <p class="formulario__icono">
          <font-awesome-icon :icon="['fas', 'clipboard-user']" />
        </p>
        <div class="formulario__grid">
          <div class="formulario__columna">
            <fieldset class="formulario__seccion">
              <legend>Datos personales</legend>
              <!-- tipo id -->
              <label for="document_type" class="formulario__label"
                >Tipo de documento:</label
              >
              <select
                v-model="formData.document_type"
                id="document_type"
                class="formulario__input formulario__input--select"
                required
              >
                <option value="Cédula de ciudadanía">
                  Cédula de ciudadanía
                </option>
                <option value="Tarjeta de identidad">
                  Tarjeta de identidad
                </option>
                <option value="NIT">NIT</option>
                <option value="Cédula de extranjería">
                  Cédula de extranjería
                </option>
              </select>
              <label for="document_number" class="formulario__label"
                >Número de documento </label
              >
              <input
                v-model="formData.document_number"
                type="number"
                id="document_number"
                class="formulario__input"
                placeholder="Número sin puntos"
                required
              />
              <!-- nombres -->
              <label for="first_name" class="formulario__label">Nombres:</label>
              <input
                v-model="formData.first_name"
                type="text"
                id="first_name"
                class="formulario__input mayus"
                required
                @input="convertToUppercase"
              />
              <!-- Apellidos -->
              <label for="last_name" class="formulario__label">Apellidos:</label>
              <input
                v-model="formData.last_name"
                type="text"
                id="last_name"
                class="formulario__input mayus"
                @input="convertToUppercase"
                required
              />
              <!-- Correo electrónico -->
              <label for="email" class="formulario__label"
                >Correo electrónico:</label
              >
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="formulario__input"
              />
              <!-- Celular -->
              <label for="cellphone" class="formulario__label">Celular:</label>
              <input
                v-model="formData.cellphone"
                type="tel"
                id="cellphone"
                class="formulario__input"
                placeholder="Celular sin espacios"
                required
              />
            </fieldset>
          </div>
          <div class="formulario__columna">
            <fieldset class="formulario__seccion">
              <legend>Datos Laborales</legend>
              <!-- Profesión -->
              <label for="profession" class="formulario__label"
                >Profesión:</label
              >
              <select
                v-model="formData.profession"
                id="profession"
                class="formulario__input formulario__input--select"
              >
                <option value="">--seleccione--</option>
                <option
                  v-for="profesion in profesiones"
                  :value="profesion"
                  :key="profesion"
                >
                  {{ profesion }}
                </option>
              </select>
              <!-- Entidad -->
              <label for="entity" class="formulario__label">Entidad:</label>
              <input
                v-model="formData.entity"
                type="text"
                class="formulario__input mayus"
                @input="convertToUppercase"
              />
              <!-- departamento -->
              <label class="formulario__label" for="parametro"
                >Departamento:</label
              >
              <select
                id="department"
                class="formulario__input formulario__input--select"
                v-model="formData.department"
              >
                <option value="">--seleccione--</option>
                <option
                  v-for="loc in locates.departments"
                  :key="loc.id"
                  :value="loc.code"
                >
                  {{ loc.name }}
                </option>
              </select>
              <!-- ciudad -->
              <div v-if="filteredCities.length">
                <label class="formulario__label" for="parametro">Ciudad:</label>
                <select
                  id="city"
                  class="formulario__input formulario__input--select"
                  v-model="formData.city"
                >
                  <option value="" disabled selected>--seleccione--</option>
                  <option
                    v-for="city in filteredCities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
              <!-- Motivo -->
              <label for="reason" class="formulario__label"
                >Motivo solicitud:</label
              >
              <textarea
                v-model="formData.reason"
                id="reason"
                class="formulario__input formulario__input--area"
                required
              ></textarea>
            </fieldset>
          </div>
          <div class="formulario__columna ocultar">
            <fieldset
              class="formulario__seccion"
            >
              <legend>Definir seguridad</legend>
              <!-- contraseña -->
              <label for="password" class="formulario__label">Crear Contraseña</label>
              <input
                type="password"
                id="password"
                class="formulario__input formulario__input--select"
                required
              />
              <!-- Confirmar Contraseña -->
              <div>
                <label for="confirm_password" class="formulario__label"
                  >Confirmar Contraseña</label
                >
                <input
                  type="password"
                  id="confirm_password"
                  class="formulario__input formulario__input--select"
                  required
                />
              </div>
            </fieldset>
          </div>
        </div>

        <input
          id="saveUser"
          type="submit"
          class="formulario__boton"
          @click.prevent="userCreate"
          :class="{ show: error }"
          :value="error ? error : 'Registrarse'"
        />
      </form>
    </main>
    <div class="respuesta" v-if="exito">
      <p class="respuesta__icono"><font-awesome-icon :icon="['fas', 'clipboard-check']" /></p>
      <p class="respuesta__info">la solicitud ha sido enviada exitosamente</p>
      <p class="respuesta__info">Espare en su <span>Email</span> una repuesta en los siguietnes días</p>
    </div>
  </div>
</template>

<style scoped>
.respuesta{
  background-color: var(--gris-claro);
  padding: 1rem;
  border-radius: 20px;
  margin-bottom: 4rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.respuesta__icono{
  font-size: 5rem;
  padding: 0;
  margin: 0;
  text-align: center;
  color: var(--primary);
}
.respuesta__info{
  font-weight: 700;
  text-align: center;
}
.respuesta__info span{
  color: var(--primary);
  border-bottom: 1px solid var(--primary);
}
.ocultar{
  display: none;
}
.solicitud__header {
  margin-top: 3rem;
}
.solicitud__heading {
  font-size: 1.6rem;
  margin: 2rem auto;
}
@media (min-width: 768px) {
  .solicitud__heading {
    font-size: 3rem;
  }
}
.solicitud__contenido {
  align-items: center;
  margin: 3rem auto;
}

@media (min-width: 768px) {
  .solicitud__contenido {
    margin: 5rem auto;
  }
}

/* formulario */
.formulario__icono {
  text-align: center;
  margin: 2rem 0;
  font-size: 4rem;
  color: var(--gris);
}

@media (min-width: 768px) {
  .formulario__icono {
    font-size: 5rem;
  }
}

.formulario {
  display: flex;
  flex-direction: column;
  background-color: var(--gris-claro);
  margin-bottom: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .formulario {
    margin: 0 auto;
  }
}

@media (min-width: 1200px) {
  .formulario {
    max-width: 50%;
  }
}
.formulario__seccion {
  margin: 0 1rem;
  border: 1px solid var(--gris);
  margin-bottom: 2rem;
}

.formulario__seccion:last-of-type {
  margin-bottom: 4rem;
}

.formulario legend {
  background-color: var(--primary);
  width: 100%;
  text-align: center;
  color: var(--blanco);
  text-transform: uppercase;
  font-weight: 900;
  padding: 0.5rem;
  margin-bottom: 3rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.formulario__label {
  display: block;
  font-weight: 700;
  text-align: center;
  margin: 0 0 5px 0;
}
.formulario__input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 88%;
  max-width: 90%;
  margin-bottom: 20px;
}
.formulario__input--select {
  text-align: center;
}
.formulario__span {
  color: red;
  text-align: center;
  margin: 0;
  padding: 0;
}
@media (min-width: 768px) {
  .formulario__input {
    max-width: unset;
    width: 95%;
    max-width: 95%;
  }
  .formulario__label{
    text-align: left;
  }
}
.formulario__input:focus {
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
.formulario__input--area {
  height: 5rem;
}
@media (min-width: 992px) {
  .formulario__input--area {
    height: 6rem;
  }
}
/* estilos anteriores */
/* .error {
  border-color: red;
}

.valid {
  border-color: green;
}

.invalid {
  border-color: red;
}
.security-bar {
  height: 10px;
  width: 100%;
  border-radius: 20px;
  background-color: #ccc; /* Color de fondo predeterminado 
}

.low-security {
  background-color: rgb(212, 74, 74);
}

.medium-security {
  background-color: rgb(230, 175, 74);
}

.high-security {
  background-color: rgb(169, 202, 169);
}
.border-red-500 {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  display: none;
}

.error-message-email {
  display: none;
}

.border-red-500 + .error-message {
  display: block;
}

#nameError {
  display: none;
  font-size: 0.8em;
}

#nameError.visible {
  display: block;
}

input.invalido {
  border-color: red;
} */
</style>