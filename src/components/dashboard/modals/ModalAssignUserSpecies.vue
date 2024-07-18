<script setup>
import { ref, watch } from 'vue';

import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species"


const property = propertyStore();
const modal = useModalStore();
const especies = useEspeciesStore();

const error = ref("");

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



function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  if(Object.values(formData.value).some(value => value ==='')){
    error.value = 'Hay campos vacíos'
    setTimeout(()=>{
      error.value = ''
    },3000)
    return
  }
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


</script>

<template>
  <div class="modal" v-if="modal.modalAssignUserSpecies">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <h3 class="form__modal--title">
          Asignar especie
        </h3>
        <hr>
        <form class="form__modal" @submit.prevent="handleSubmit">

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Especie forestal: </label>
            <select class="form__modal--input" id="especie_forestal"  v-model="formData.ep_especie_cod">
              <option value="">--Seleccione--</option>
              <option v-for="ef in especies.especies" :key="ef.ShortcutID" :value="ef.cod_especie">
                {{ ef.cod_especie + " / " + ef.nom_comunes + " / " + ef.nombre_cientifico }}
              </option>
            </select>
          </div>

          <div class="form__modal--field" style="display: none;">
            <label class="form__modal--label form_none" for="usuario">Nombre de usuario: </label>
            <input class="form__modal--input" type="text" v-model="formData.ep_usuario"
              :placeholder="property.userPropertySelected" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad de individuos: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_individuos" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad productiva: </label>
            <input class="form__modal--input" type="number" v-model="formData.cant_productiva" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad remanente: </label>
            <input class="form__modal--input" type="number" v-model="formData.cant_remanente" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="departamento">Predio:</label>
            <select id="departamento" class="form__modal--input" v-model="formData.ep_predio" @click="handlePropertyChange()">
              <option value="">--Seleccione--</option>
              <option v-for="p in property.propertyUser" :key="p.id" :value="p.id">
                {{ p.nombre_predio }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Expediente: </label>
            <input class="form__modal--input" type="text" v-model="formData.expediente" />
          </div>
          <p class="msg__error" v-if="error">
            {{ error }}
          </p>

          <div class="form__modal--buttons" :style="error ? 'margin-top: 1rem' : ''">
            <button class="form__modal--save" type="submit" ><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div class="button__modal--close" @click="() => { resetForm(); modal.handleClickModalAssignUserSpecies(); }">
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
.msg__error {
  padding: 0;
  margin: 0;
  text-align: center;
  border-left: 4px solid var(--rojo);
  padding-left: 2rem;
  color: var(--rojo);
}
/* content general */
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



</style>