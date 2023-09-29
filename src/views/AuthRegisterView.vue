<script setup>
import { ref, computed } from 'vue';
import APIService from '../services/APIService'
import { useAuthToken } from '../stores/auth'

const locates = useAuthToken()

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
  password: "",
  confirm_password: "",
  department: '',
  city: ''
});

const filteredCities = computed(() => {
  const selectedDepartament = formData.value.department
  console.log(selectedDepartament)
  if (selectedDepartament) {    
    const filtered = locates.cities.filter(city => city.department_id === selectedDepartament);
    return filtered;
  }
  return [];
});

const profesiones = [
  "Estudiante",
  "Ingeniero",
  "Médico",
  "Abogado",
  "Diseñador",
  "Profesor",
  // Agrega más profesiones según sea necesario
];

function validateForm() {
  const formKeys = Object.keys(formData.value);
  for (const key of formKeys) {
    if (!formData.value[key]) {
      return false;
    }
  }
  return true;
}

const passwordsMatch = ref(true);
const passwordsMismatchMessage = ref('');
const passwordLengthMessage = ref('')

function validatePasswords() {
  return formData.value.password === formData.value.confirm_password;
}

function resetForm() {
  for (let key in formData.value) {
    formData.value[key] = "";
  }
}
// Función para enviar el formulario
async function userCreate() {
  if (!validatePasswords()) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (!validateForm()) {
    alert("Por favor complete todos los campos del formulario.");
    return;
  }

  try {
    console.log('User: ', formData.value)
    await APIService.createUsers(formData.value);
    resetForm();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert('Ocurrió un error al procesar la solicitud.');
    }
  }
  
};

function checkPasswordsMatch() {
  passwordsMatch.value = validatePasswords();
  if (!passwordsMatch.value) {
    passwordsMismatchMessage.value = "Las contraseñas no coinciden";
  } else {
    passwordsMismatchMessage.value = "";
  }
}

function validatePasswordLength() {
  if (formData.value.password.length < 6) {
    passwordLengthMessage.value = "La contraseña debe tener al menos 6 caracteres";
    return false;
  }
  passwordLengthMessage.value = "";
  return true;
}

function getSecurityLevel() {
  const password = formData.value.password;

  if (password.length < 6) {
    return "Bajo";
  }

  const containsLowerCase = /[a-z]/.test(password);
  const containsUpperCase = /[A-Z]/.test(password);
  const containsNumber = /\d/.test(password);
  const containsSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let level = 0;

  if (containsLowerCase) level++;
  if (containsUpperCase) level++;
  if (containsNumber) level++;
  if (containsSymbol) level++;

  if (level >= 3) {
    return "Alto";
  } else if (level === 2) {
    return "Medio";
  } else {
    return "Bajo";
  }
}

function getSecurityBarWidth() {
  const securityLevel = getSecurityLevel();

  if (securityLevel === 'Bajo') {
    return { percentage: '33%', level: 'low-security' };
  } else if (securityLevel === 'Medio') {
    return { percentage: '66%', level: 'medium-security' };
  } else {
    return { percentage: '100%', level: 'high-security' };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const sendData = document.getElementById("saveUser");

  sendData.addEventListener("click", validate);

  function validate(e) {
    e.preventDefault();

    const names = document.getElementById("names");
    const lastnames = document.getElementById("lastnames")
    const email = document.getElementById("email")
    const cellphone = document.getElementById("cellphone")
    const profession = document.getElementById("profession")
    const entity = document.getElementById("entity")
    const reason = document.getElementById("reason")
    const password = document.getElementById("password")

    let valido = true;

    const nameError = document.getElementById("nameError")

    if (!names.value) {
      nameError.classList.add("visible");
      names.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!lastnames.value) {
      nameError.classList.add("visible");
      lastnames.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!email.value) {
      nameError.classList.add("visible");
      email.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!cellphone.value) {
      nameError.classList.add("visible");
      cellphone.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!profession.value) {
      nameError.classList.add("visible");
      profession.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!entity.value) {
      nameError.classList.add("visible");
      entity.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!reason.value) {
      nameError.classList.add("visible");
      reason.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }

    if (!password.value) {
      nameError.classList.add("visible");
      password.classList.add("invalido");
      nameError.setAttribute("aria-hidden", false);
      nameError.setAttribute("aria-invalid", true);
    }
    
    return valido;
  }
});

function convertToUppercase() {
  const entityInput = document.getElementById('entity');
  entityInput.value = entityInput.value.toUpperCase();
}
</script>

<template>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center">Formulario solicitud de Registro</h2>
      <form @submit.prevent="userCreate" class="space-y-4 mb-20 relative bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50">
        <!-- Tipo de documento -->
        <div>
          <label for="document_type" class="block font-semibold mb-1">Tipo de documento</label>
          <select v-model="formData.document_type" id="document_type" class="w-full rounded-lg border px-4 py-2" required>
            <option value="Cédula de ciudadanía">Cédula de ciudadanía</option>
            <option value="Tarjeta de identidad">Tarjeta de identidad</option>
            <option value="NIT">NIT</option>
            <option value="Cédula de extranjería">Cédula de extranjería</option>
          </select>
        </div>
  
        <!-- Número de documento -->
        <div>
          <label for="document_number" class="block font-semibold mb-1">Número de documento</label>
          <input v-model="formData.document_number" type="text" id="document_number" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Nombres -->
        <div>
          <label for="first_name" class="block font-semibold mb-1">Nombres</label>
          <input v-model="formData.first_name" type="text" id="first_name" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Apellidos -->
        <div>
          <label for="last_name" class="block font-semibold mb-1">Apellidos</label>
          <input v-model="formData.last_name" type="text" id="last_name" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Correo electrónico -->
        <div>
          <label for="email" class="block font-semibold mb-1">Correo electrónico</label>
          <input v-model="formData.email" type="email" id="email" class="w-full rounded-lg border px-4 py-2">
          <span class="error-message-email" id="email-error" style="color: red;">Por favor, ingresa un correo electrónico válido.</span>
        </div>

        <!-- Celular -->
        <div>
          <label for="cellphone" class="block font-semibold mb-1">Celular</label>
          <input v-model="formData.cellphone" type="number" id="cellphone" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Profesión -->
        <div>
          <label for="profession" class="block font-semibold mb-1">Profesión</label>
          <select v-model="formData.profession" id="profession" class="w-full rounded-lg border px-4 py-2">
            <option value="">Selecciona una profesión</option>
            <option v-for="profesion in profesiones" :value="profesion" :key="profesion">{{ profesion }}</option>
          </select>
        </div>
  
        <!-- Entidad -->
        <div>
          <label for="entity" class="block font-semibold mb-1">Entidad</label>
          <input v-model="formData.entity" type="text" id="entity" class="w-full rounded-lg border px-4 py-2" @input="convertToUppercase">
        </div>
  
        <!-- Motivo -->
        <div>
          <label for="reason" class="block font-semibold mb-1">Motivo solicitud</label>
          <textarea v-model="formData.reason" id="reason" class="w-full rounded-lg border px-4 py-2" required></textarea>
        </div>

        <div>
          <label class="block font-bold" for="parametro">Departamento</label>
          <select
            id="department"
            class="w-full rounded-lg border px-4 py-2"
            v-model="formData.department"
          >
            <option value="" disabled selected>Seleccione un departamento...</option>
            <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
              {{ loc.name }}
            </option>
          </select>
        </div>

        <div v-if="filteredCities.length">
          <label class="block font-bold" for="parametro">Ciudad</label>
          <select
            id="city"
            class="w-full rounded-lg border px-4 py-2"
            v-model="formData.city"
          >
            <option value="" disabled selected>Seleccione una ciudad...</option>
            <option v-for="city in filteredCities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <div :class="{'error': !passwordsMatch}">
          <label for="password" class="block font-semibold mb-1">Contraseña</label>
          <input v-model="formData.password" @input="checkPasswordsMatch" type="password" @blur="validatePasswordLength" id="password" :class="{'valid': passwordsMatch, 'invalid': !passwordsMatch}" class="w-full rounded-lg border px-4 py-2" required>
        </div>

        <!-- Confirmar Contraseña -->
        <div :class="{'error': !passwordsMatch}">
          <label for="confirm_password" class="block font-semibold mb-1">Confirmar Contraseña</label>
          <input v-model="formData.confirm_password" @input="checkPasswordsMatch" type="password" id="confirm_password" :class="{'valid': passwordsMatch, 'invalid': !passwordsMatch}" class="w-full rounded-lg border px-4 py-2" required>
          <span class="text-red-500 text-sm" v-if="passwordsMismatchMessage">{{ passwordsMismatchMessage }}</span>
        </div>

        <div>
          <span class="text-red-500 text-sm" v-if="passwordLengthMessage">{{ passwordLengthMessage }}</span>
        </div>

        <div v-if="formData.password != ''">
          <p v-if="formData.password.length >= 6">Nivel de Seguridad: {{ getSecurityLevel() }}</p>
          <div :style="{ width: getSecurityBarWidth().percentage }" :class="getSecurityBarWidth().level" class="security-bar"></div>
        </div>

        <span role="alert" id="nameError" aria-hidden="true">
          Ingrese todos los datos, por favor
        </span>
  
        <button id="saveUser" type="submit" class="w-full bg-blue-500 text-white font-semibold rounded-lg py-2" @click.prevent="userCreate">
          Registrarse
        </button>
      </form>
    </div>
</template>

<style scoped>
.error {
  border-color: red;
}

.valid {
  border-color: green;
}

.invalid {
  border-color: red;
}.security-bar {
  height: 10px;
  width: 100%;
  border-radius: 20px;
  background-color: #ccc; /* Color de fondo predeterminado */
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
  border-color: #EF4444;
}

.error-message {
  color: #EF4444;
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
}
</style>