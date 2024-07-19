<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { locatesColombia } from "@/stores/locates";
import { useEspeciesStore } from "@/stores/species"

const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();
const especies = useEspeciesStore();

const formData = ref({
  vivero: '',
  especie_forestal: '',
  tipo_venta: '',
  unidad_medida: '',
  cantidad_stock: '',
  ventas_realizadas: '',
  observaciones: '',
  activo: 1
});

watch(() => nurseriesStore.selectedNurseryAssign, (newValue) => {
  formData.value.vivero = newValue;
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  try {
    nurseriesStore.AssignSpecieNursery(formData.value);
    resetForm();
    modal.handleClickModalNurseryAssignSpecie();
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
</script>

<template>
  <div class="modal" v-if="modal.modalNurseryAssignSpecie">
    <div class="modal__contenido">
      <div class="form__modal--content">

        <h3 class="form__modal--title">Asignar especie a vivero</h3>
        <hr>
        <form @submit.prevent="handleSubmit" class="form__modal">

          <div style="display: none;" class="form__modal--field">
            <label class="form__modal--label" for="usuario">Vivero: </label>
            <input class="form__modal--input"  type="text" v-model="formData.vivero"
              :placeholder="nurseriesStore.selectedNurseryAssign">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Especie forestal: </label>
            <select id="especie_forestal" class="form__modal--input"
              v-model="formData.especie_forestal">
              <option value="">--Seleccione--</option>
              <option v-for="ef in especies.especies" :key="ef.ShortcutID" :value="ef.cod_especie">
                {{ ef.cod_especie + " / " + ef.nom_comunes + " / " + ef.nombre_cientifico }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Tipo de venta: </label>
            <select id="especie_forestal" class="form__modal--input"
              v-model="formData.tipo_venta">
              <option value="" disabled>--Seleccione--</option>
              <option value="Semillas">Semillas</option>
              <option value="Plantulas">Plantulas</option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Unidad de medida: </label>
            <select id="especie_forestal" class="form__modal--input"
              v-model="formData.unidad_medida">
              <option value="" disabled>--Seleccione--</option>
              <option value="Kilogramo">Kilogramo</option>
              <option value="Gramos">Gramos</option>
              <option value="Gramos">No aplica</option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad disponible: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_stock">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" >Ventas realizadas: </label>
            <input class="form__modal--input" type="text" v-model="formData.ventas_realizadas">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Observaciones: </label>
            <input class="form__modal--input" type="text" v-model="formData.observaciones">
          </div>

          <div class="form__modal--buttons">
            <button type="submit" class="form__modal--save"><svg style="width: 2rem;" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div class="button__modal--close" @click="modal.handleClickModalNurseryAssignSpecie()">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.data__evaluation,
.data__ubication,
.data__candidate,
.data__items {
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