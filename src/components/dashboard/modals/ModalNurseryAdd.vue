<script setup>
import { ref, computed, watch } from 'vue';
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";

import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();
const error = ref("");

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



function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  if (Object.values(formData.value).some(value => value === "")) {
    error.value = "Hay campos vacíos";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

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
      (city) => city.department === department
    );
    return filtered;
  }
  return [];
});

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    formData.value.ubicacion = `${latitude}, ${longitude}`
  }, function (error) {
    console.error("Error obteniendo la ubicación: ", error);
  });
} else {
  console.log("Geolocalización no está disponible en tu navegador");
}

</script>

<template>
  <div class="modal" v-if="modal.modalNurseryAdd">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <h3 class="form__modal--title">Registrar nuevo vivero</h3>
        <hr>
        <form class="form__modal" @submit.prevent="handleSubmit">
          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Nombre de vivero: </label>
            <input class="form__modal--input" type="text" v-model="formData.nombre_vivero">
          </div>

          <div style="display: none;" class="form__modal--field">
            <label class="form__modal--label text__noview" for="usuario">Representante legal: </label>
            <input class="form__modal--input" type="text" v-model="formData.representante_legal_id"
              :placeholder="nurseriesStore.userSelected">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Nit: </label>
            <input class="form__modal--input" type="text" v-model="formData.nit" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Ubicación: </label>
            <input class="form__modal--input" type="text" v-model="formData.ubicacion" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Email: </label>
            <input class="form__modal--input" type="text" v-model="formData.email" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Celular: </label>
            <input class="form__modal--input" type="text" v-model="formData.telefono" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="departamento">Departamento:</label>
            <select id="departamento" class="form__modal--input" v-model="formData.department">
              <option value="">--Seleccione--</option>
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
                {{ loc.name }}
              </option>
            </select>
          </div>

          <div class="form__modal--field">
            <!-- ciudad -->
            <label class="form__modal--label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
            <select id="municipio" class="form__modal--input" v-model="formData.city"
              v-show="filteredCities.length">
              <option value="">-- Seleccione--</option>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label">Dirección: </label>
            <input class="form__modal--input" type="text" v-model="formData.direccion">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Logo: </label>
            <input class="form__modal--input" type="text" v-model="formData.logo">
          </div>

          <p class="msg__error" v-if="error">{{ error }}</p>

          <div class="formulario__botones">
            <button type="submit" class="button__user-nursery"><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div  class="button__modal--close" @click="modal.handleClickModalNurseryAdd()">
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