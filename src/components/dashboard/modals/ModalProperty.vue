<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { locatesColombia } from "@/stores/locates";
import { useToastStore } from '@/stores/toast';
import LoadingData from "@/components/shared/LoadingData.vue";

const locates = locatesColombia();
const property = propertyStore();
const modal = useModalStore();
const toast = useToastStore()

const error = ref("");

//logic for the general component
const isEdit = computed(()=>{
  return modal.isEdit
})

const initializeFormData = () => {
  const selectedProperty = property.propertySelected[0];
  if (selectedProperty) {
    formData.value.nombre_predio = selectedProperty.nombre_predio || "";
    formData.value.p_departamento = selectedProperty.p_departamento || "";
    formData.value.p_municipio = selectedProperty.p_municipio || "";
    formData.value.p_user = property.userSelected || '';
  } else {
    resetForm();
  }
};

//logic to create a new property
const formData = ref({
  p_user: '',
  nombre_predio: '',
  p_departamento: '',
  p_municipio: '',
  corregimiento: '',
  vereda: ''
});

watch(() => property.userSelected, (newValue) => {
  if (newValue && newValue !== '') {
    formData.value.p_user = newValue;
  }
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
  property.userSelected = '';
}

const newProperty = async () => {
  try {
    const response = await property.createProperty(formData.value);
    if (response.success) {
      resetForm();
      modal.handleClickModalProperty(false);
      toast.activateToast(response.msg, 'success'); // Muestra el mensaje del backend
    } else {
      toast.activateToast(response.msg, 'error'); // Muestra el mensaje de error
    }
  } catch (error) {
    toast.activateToast('Hubo un error al agregar el predio', 'error'); // Error no esperado
  }
}

//logic to update a property
async function propertyUpdate() {
  await property.updateProperty(property.propertySelected[0].id, formData.value);
  resetForm();
  modal.handleClickModalProperty(false);
}

watch(
  () => property.propertySelected,
  (newValue, oldValue) => {
    // Sólo ejecutar initializeFormData si isEdit es true
    if (isEdit.value && newValue !== oldValue) {
      initializeFormData();
    }
  },
  { immediate: false } // Evitar la ejecución inmediata si no la necesitas
);

const handleSubmit = () => {
  if (Object.values(formData.value).some(value => value === "")) {
    error.value = "Hay campos vacíos";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

  //validate for the action create or update
  if (isEdit.value) {
    propertyUpdate();
  }else{
    newProperty();
  }
};

const filteredCities = computed(() => {
  const { p_departamento } = formData.value;
  
  if (p_departamento) {
    const filtered = locates.cities.filter(
      (city) => city.department === p_departamento
    );
    return filtered;
  }
  return [];
});

onMounted(() => {
  initializeFormData();
});
</script>

<template>
  <div class="modal" v-if="modal.modalProperty">
    <div class="modal__contenido">
      <div class="form__modal--content">
        <div>
          <LoadingData v-if="property.loading" />
        </div>

        <h3 class="form__modal--title">{{ isEdit ? 'Actualizar predio' : 'Registrar nuevo predio' }}</h3>
        <hr>
        <form class="form__modal" @submit.prevent="handleSubmit">

          <div class="form__modal--field">
            <label class="form__modal--label">Nombre del predio: </label>
            <input class="form__modal--input" type="text" v-model="formData.nombre_predio" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="departamento">Departamento:</label>
            <select id="departamento" class="form__modal--input" v-model="formData.p_departamento">
              <option value="">--Seleccione--</option>
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.id">
                {{ loc.name }}
              </option>
            </select>
          </div>

          <!-- ciudad -->
          <div class="form__modal--field">
            <label class="form__modal--label" for="municipio" v-show="filteredCities.length">Ciudad:</label>
            <select id="municipio" class="form__modal--input" v-model="formData.p_municipio" v-show="filteredCities.length">
              <option value="">-- Seleccione--</option>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>

          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Corregimiento: </label>
            <input class="form__modal--input" type="text" v-model="formData.corregimiento" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Vereda: </label>
            <input class="form__modal--input" type="text" v-model="formData.vereda" />
          </div>

          <p class="msg__error" v-if="error">
            {{ error }}
          </p>

          <div class="form__modal--buttons">
            <button type="submit" class="form__modal--save" :disabled="property.loading"><svg style="width: 2rem;"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
                </path>
              </svg></button>

            <div class="button__modal--close" @click="modal.handleClickModalProperty(false), resetForm()">
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