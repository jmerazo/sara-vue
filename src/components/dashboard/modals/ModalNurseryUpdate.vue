<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";
import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();

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
  active: ''
});

const initializeFormData = () => {
  const selectedNursery = nurseriesStore.nurserySelected[0]; // Asegúrate de que propertySelected sea un objeto correcto
  if (selectedNursery) {
    formData.value = {
      nombre_vivero: selectedNursery.nombre_vivero || "",
      representante_legal_id: selectedNursery.representante_legal_id || "",
      nit: selectedNursery.nit || "",
      ubicacion: selectedNursery.ubicacion || "",
      email: selectedNursery.email || "",
      telefono: selectedNursery.telefono || "",
      department: "",
      city: "",
      direccion: selectedNursery.direccion || "",
      logo: selectedNursery.logo || "",
      active: selectedNursery.activo || "",
    };
  } else {
    // Asegúrate de resetear el formData si no hay propiedad seleccionada
    formData.value = {
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
      active: ''
    };
  }
};

async function nurseryUpdate() {
  await nurseriesStore.updateNursery(nurseriesStore.nurseryUpdateSelected[0].id, formData.value);
  modal.handleClickModalNurseryUpdate();
}

watch(
  () => nurseriesStore.nurseryUpdateSelected,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      initializeFormData();
    }
  },
  { immediate: true } // Esto asegura que initializeFormData se llame inmediatamente
);

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

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

// Si necesitas inicializar datos al montar el componente
onMounted(() => {
  initializeFormData();
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
  <div class="modal" v-if="modal.modalNurseryUpdate">
    <div class="modal__contenido">
      <div class="form__modal--content">

        <h3 class="form__modal--title">Actualizar datos vivero</h3>
        <hr>
        <form class="form__modal" @submit.prevent="nurseryUpdate">

          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Nombre de vivero: </label>
            <input class="form__modal--input" type="text" v-model="formData.nombre_vivero">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label" for="usuario">Representante legal: </label>
            <input class="form__modal--input" type="text" v-model="formData.representante_legal_id">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label" for="nit">Nit: </label>
            <input class="form__modal--input" type="text" v-model="formData.nit">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label">Ubicación: </label>
            <input class="form__modal--input" type="text" v-model="formData.ubicacion">
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Email: </label>
            <input class="form__modal--input" type="text" v-model="formData.email">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label">Celular: </label>
            <input class="form__modal--input" type="text" v-model="formData.telefono">
          </div>


          <div class="form__modal--field">
            <label class="form__modal--label" for="departamento">Departamento:</label>
            <select class="form__modal--input" id="departamento" v-model="formData.department">
              <option value="">--Seleccione--</option>
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
                {{ loc.name }}
              </option>
            </select>
          </div>


          <div class="form__modal--field">
            <!-- ciudad -->
            <label class="formulario__label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
            <select class="form__modal--input"  id="municipio" v-model="formData.city"
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


          <div style="display: none;" class="form__modal--field">
            <label  class="form__modal--label">Logo: </label>
            <input class="form__modal--input" type="text" v-model="formData.logo">
          </div>

          <div class="form__modal--buttons">
            <button type="submit" class="form__modal--save"><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>


            
            <div class="button__modal--close" @click="modal.handleClickModalNurseryUpdate()">
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

</style>