<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { propertyStore } from "../../../stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const property = propertyStore();
const modal = useModalStore();
const user = useUsersStore();

const formData = ref({
    p_user: '',
    nombre_predio: '',
    p_departamento: '',
    p_municipio: ''
});

watch(() => property.userSelected, (newValue) => {
  formData.value.p_user = newValue;
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
    property.createProperty(formData.value);
    resetForm();
    modal.handleClickModalPropertyAdd();
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
  const { p_departamento } = formData.value;

  if (p_departamento) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === p_departamento
    );
    return filtered;
  }
  return [];
});

// Observa los cambios en la evaluación y actualiza formData.evaluacion
/* watch(nombre_predio, (nuevoValor) => {
    formData.value.nombre_predio = nuevoValor;
}); */
</script>

<template>
    <div class="modal" v-if="modal.modalPropertyAdd">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Registrar nuevo predio</span>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-section data__evaluation">
                        <input class="txt__none" type="text" v-model="formData.p_user" :placeholder="property.userSelected">
                        <label>Nombre del predio: </label><input type="text" v-model="formData.nombre_predio">
                        <label class="formulario__label" for="departamento">Departamento:</label>
                        <select
                            id="departamento"
                            class="formulario__input formulario__input--selectc"
                            v-model="formData.p_departamento"
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
                        <select id="municipio" class="formulario__input formulario__input--select" v-model="formData.p_municipio" v-show="filteredCities.length">
                            <option value="">-- Seleccione--</option>
                            <option
                            v-for="city in filteredCities"
                            :key="city.id"
                            :value="city.id"
                            >
                            {{ city.name }}
                            </option>
                        </select>
                    </div>
                    
                    <div class="formulario__botones">
                        <button type="submit" class="formulario__boton">Guardar</button>
                        <button
                            @click="modal.handleClickModalPropertyAdd()"
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

.txt__none{
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
  