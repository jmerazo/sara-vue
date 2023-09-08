<script setup>
import { ref, computed } from 'vue';
import APIService from '../services/APIService'

// Datos del formulario
const formData = ref({
  document_type: "Cédula de ciudadanía",
  document_number: "",
  nombres: "",
  apellidos: "",
  email: "",
  cellphone: "",
  profession: "",
  entity: "",
  reason: "",
  password: "",
  confirm_password: ""
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
  } catch (error) {
    console.log('Error al crear el usuario: ', error)
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

function checkEmail() {
  const email = formData.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById('email-error').style.display = 'block';
  } else {
    document.getElementById('email-error').style.display = 'none';
  }
}
</script>

<template>
    <div class="max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center">Formulario de Registro</h2>
      <form @submit.prevent="userCreate" class="space-y-4 mb-20 relative bg-white p-8 rounded-lg shadow-lg backdrop-blur-lg backdrop-opacity-50">
        <!-- Tipo de documento -->
        <div>
          <label for="document_type" class="block font-semibold mb-1">Tipo de documento</label>
          <select v-model="formData.document_type" id="document_type" class="w-full rounded-lg border px-4 py-2">
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
          <label for="nombres" class="block font-semibold mb-1">Nombres</label>
          <input v-model="formData.nombres" type="text" id="nombres" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Apellidos -->
        <div>
          <label for="apellidos" class="block font-semibold mb-1">Apellidos</label>
          <input v-model="formData.apellidos" type="text" id="apellidos" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Correo electrónico -->
        <div>
          <label for="email" class="block font-semibold mb-1">Correo electrónico</label>
          <input v-model="formData.email" type="email" id="email" class="w-full rounded-lg border px-4 py-2" @input="checkEmail">
          <span class="error-message" id="email-error" style="display:none;">El correo electrónico debe contener el símbolo '@'</span>
        </div>
          
        <!-- Celular -->
        <div>
          <label for="cellphone" class="block font-semibold mb-1">Celular</label>
          <input v-model="formData.cellphone" type="tel" id="cellphone" class="w-full rounded-lg border px-4 py-2" required>
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
          <input v-model="formData.entity" type="text" id="entity" class="w-full rounded-lg border px-4 py-2">
        </div>
  
        <!-- Motivo -->
        <div>
          <label for="reason" class="block font-semibold mb-1">Motivo</label>
          <input v-model="formData.reason" type="text" id="reason" class="w-full rounded-lg border px-4 py-2" required>
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
  
        <button type="submit" class="w-full bg-blue-500 text-white font-semibold rounded-lg py-2" @click.prevent="userCreate">
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
</style>