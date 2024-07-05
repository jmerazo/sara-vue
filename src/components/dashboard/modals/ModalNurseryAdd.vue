<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();
const user = useUsersStore();

const formData = ref({
    nombre_vivero: '',
    nit: '',
    representante_legal_id: '',
    ubicacion: '',
    email: '',
    telefono: '',
    department: '',
    city: '',
    direccion: '',
    logo: '',
    active: 1
});

watch(() => nurseriesStore.userSelected, (newValue) => {
  formData.value.representante_legal_id = newValue;
});

/* onMounted(() => {
  const hoy = new Date();
  formData.value.fecha_evaluacion = hoy.toISOString().split('T')[0];
}); */

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {  
  try {
    nurseriesStore.createNursery(formData.value);
    resetForm();
    modal.handleClickModalNurseryAdd();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      // Si hay un mensaje de error en la respuesta, lo puedes mostrar
      alert(error.response.data.error);
    } else {
      // En caso de un error inesperado
      alert("Ocurrió un error al procesar la solicitud.");
    }
  }
};

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

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    formData.value.ubicacion = `${latitude}, ${longitude}`
  }, function(error) {
    console.error("Error obteniendo la ubicación: ", error);
  });
} else {
  console.log("Geolocalización no está disponible en tu navegador");
}

// Observa los cambios en la evaluación y actualiza formData.evaluacion
/* watch(nombre_predio, (nuevoValor) => {
    formData.value.nombre_predio = nuevoValor;
}); */
</script>

<template>
    <div class="modal" v-if="modal.modalNurseryAdd">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Registrar nuevo vivero</span>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-section data__evaluation">
                        <label class="formulario__label" for="usuario">Nombre de vivero: </label>
                        <input type="text" v-model="formData.nombre_vivero">
                        <label class="formulario__label text__noview" for="usuario">Representante legal: </label>
                        <input class="text__noview" type="text" v-model="formData.representante_legal_id" :placeholder="nurseriesStore.userSelected">
                        <label>Nit: </label><input type="text" v-model="formData.nit">
                        <label>Ubicación: </label><input type="text" v-model="formData.ubicacion">
                        <label>Email: </label><input type="text" v-model="formData.email">
                        <label>Celular: </label><input type="text" v-model="formData.telefono">
                        <label class="formulario__label" for="departamento">Departamento:</label>
                        <select
                            id="departamento"
                            class="formulario__input formulario__input--selectc"
                            v-model="formData.department"
                        >
                            <option value="">--Seleccione--</option>
                            <option
                            v-for="loc in locates.departments"
                            :key="loc.id"
                            :value="loc.code"
                            >
                            {{ loc.name }}
                            </option>
                        </select>
                        <!-- ciudad -->
                        <label class="formulario__label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
                        <select id="municipio" class="formulario__input formulario__input--select" v-model="formData.city" v-show="filteredCities.length">
                            <option value="">-- Seleccione--</option>
                            <option
                            v-for="city in filteredCities"
                            :key="city.id"
                            :value="city.id"
                            >
                            {{ city.name }}
                            </option>
                        </select>
                        <label>Dirección: </label><input type="text" v-model="formData.direccion">
                        <label>Logo: </label><input type="text" v-model="formData.logo">
                    </div>
                    
                    <div class="formulario__botones">
                        <button type="submit" class="formulario__boton">Guardar</button>
                        <button
                            @click="modal.handleClickModalNurseryAdd()"
                            type="button"
                            class="formulario__boton formulario__boton--cerrar"
                        >
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
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
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

.text__noview {
  display: none;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}
@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}

.form__addCandidate {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.title__addCandidate {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.data__evaluation, .data__ubication, .data__candidate, .data__items {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

label {
  margin-bottom: 5px;
  display: block;
}

input[type="text"], 
input[type="number"], 
input[type="email"], 
input[type="tel"], 
input[type="date"], 
select, 
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

/* button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
} */

.formulario__botones {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1.3rem 0 0 0;
}

.formulario__boton {
  border-radius: 5px;
  font-weight: 700;
  padding: 0.3rem;
  font-size: 1rem;
  color: var(--blanco);
  background-color: var(--primary);
}
.formulario__boton--cerrar {
  background-color: var(--secondary);
}
.formulario__boton:hover {
  background-color: var(--primary-hover);
}
.formulario__boton--cerrar:hover {
  background-color: var(--secondary-hover);
}
</style>
  