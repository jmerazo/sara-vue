<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthTokenStore } from "../../../stores/auth";
import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users"
import { useEspeciesStore } from "@/stores/species"

const locates = useAuthTokenStore();
const property = propertyStore();
const modal = useModalStore();
const user = useUsersStore();
const especies = useEspeciesStore();

const formData = ref({
    ep_especie_cod: '',
    ep_usuario: '',
    cantidad_individuos: '',
    cant_productiva: '',
    cant_remanente: '',
    ep_predio: '',
    expediente: ''
});

watch(() => property.userPropertySelected, (newValue) => {
  formData.value.ep_usuario = newValue;
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
    property.createUsersProperty(formData.value);
    resetForm();
    modal.handleClickModalAssignUserSpecies();
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

const handlePropertyChange = async () => {
  if (formData.value.ep_usuario) {
    property.listPropertyId(property.userPropertySelected);
  }
}

// Observa los cambios en la evaluación y actualiza formData.evaluacion
/* watch(nombre_predio, (nuevoValor) => {
    formData.value.nombre_predio = nuevoValor;
}); */
</script>

<template>
    <div class="modal" v-if="modal.modalAssignUserSpecies">
        <div class="modal__contenido">
            <div class="form__addCandidate">
                <div class="title__addCandidate">
                    <span>Asignar especie</span>
                </div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-section data__evaluation">
                        <label class="formulario__label" for="usuario">Especie forestal: </label>
                        <select
                            id="especie_forestal"
                            class="formulario__input formulario__input--selectc"
                            v-model="formData.ep_especie_cod"
                        >
                            <option value="">--Seleccione--</option>
                            <option
                            v-for="ef in especies.especies"
                            :key="ef.ShortcutID"
                            :value="ef.cod_especie"
                            >
                            {{ ef.cod_especie + " / " + ef.nom_comunes + " / " + ef.nombre_cientifico }}
                            </option>
                        </select>
                        <label class="formulario__label form_none" for="usuario">Nombre de usuario: </label><input class="form_none" type="text" v-model="formData.ep_usuario" :placeholder="property.userPropertySelected">
                        <label class="formulario__label">Cantidad de individuos: </label><input type="number" v-model="formData.cantidad_individuos">
                        <label class="formulario__label">Cantidad productiva: </label><input type="number" v-model="formData.cant_productiva">
                        <label class="formulario__label">Cantidad remanente: </label><input type="number" v-model="formData.cant_remanente">
                        <label class="formulario__label" for="departamento">Predio:</label>
                        <select
                            id="departamento"
                            class="formulario__input formulario__input--selectc"
                            v-model="formData.ep_predio"
                            @click="handlePropertyChange()"
                        >
                            <option value="">--Seleccione--</option>
                            <option
                            v-for="p in property.propertyUser"
                            :key="p.id"
                            :value="p.id"
                            >
                            {{ p.nombre_predio }}
                            </option>
                        </select>
                        <label class="formulario__label">Expediente: </label><input type="text" v-model="formData.expediente">             
                    </div>
                    
                    <div class="formulario__botones">
                        <button type="submit" class="formulario__boton">Guardar</button>
                        <button
                            @click="() => { resetForm(); modal.handleClickModalAssignUserSpecies(); }"
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

.form_none {
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
  