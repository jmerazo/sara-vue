<script setup>
import { ref } from 'vue';
import APIService from '../services/APIService'

// Datos del formulario
const formData = ref({
  document_type: "Cédula de ciudadanía",
  document_number: "",
  nombres: "",
  apellidos: "",
  correo: "",
  celular: "",
  profesion: "",
  entidad: "",
  motivo: "",
});

// Función para enviar el formulario
async function userCreate() {
  try {
    await APIService.createUsers(formData.value);
  } catch (error) {
    console.log('Error al crear el usuario: ', error)
  }
  
};
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
          <label for="correo" class="block font-semibold mb-1">Correo electrónico</label>
          <input v-model="formData.correo" type="email" id="correo" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Celular -->
        <div>
          <label for="celular" class="block font-semibold mb-1">Celular</label>
          <input v-model="formData.celular" type="tel" id="celular" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <!-- Profesión -->
        <div>
          <label for="profesion" class="block font-semibold mb-1">Profesión</label>
          <input v-model="formData.profesion" type="text" id="profesion" class="w-full rounded-lg border px-4 py-2">
        </div>
  
        <!-- Entidad -->
        <div>
          <label for="entidad" class="block font-semibold mb-1">Entidad</label>
          <input v-model="formData.entidad" type="text" id="entidad" class="w-full rounded-lg border px-4 py-2">
        </div>
  
        <!-- Motivo -->
        <div>
          <label for="motivo" class="block font-semibold mb-1">Motivo</label>
          <input v-model="formData.motivo" type="text" id="motivo" class="w-full rounded-lg border px-4 py-2" required>
        </div>
  
        <button type="submit" class="w-full bg-blue-500 text-white font-semibold rounded-lg py-2">
          Registrarse
        </button>
      </form>
    </div>
  </template>