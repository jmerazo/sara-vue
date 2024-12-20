<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { useToastStore } from '@/stores/toast';

const property = propertyStore();
const modal = useModalStore();
const species = useEspeciesStore();
const toast = useToastStore()

const error = ref("");

const formData = ref({
  expediente: '',
  resolucion: '',
  fecha_exp: '',
  ep_usuario: '',
  ep_predio: '',
  ep_especie: '',  
  tamano_UMF: '', // Árbol
  cantidad_autorizada: '', // Árbol
  cantidad_remanentes: '',
  cantidad_aprovechable: '',
  cant_monitoreos: '', // Árbol
  PCM: '',
  PRM: '',
  cantidad_placas: '', // Árbol  
});

onMounted(async () => {
  await species.loadAllSpecies();
});


const requiredFields = ['expediente', 'resolucion', 'ep_usuario', 'ep_predio', 'ep_especie'];

const searchQuery = ref('');
const selectedEspecieOption = ref('');

const filteredEspecies = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return species.species.filter(ef => {
    return (
      ef.code_specie?.toString().toLowerCase().includes(searchLower) ||
      ef.vernacularName?.toLowerCase().includes(searchLower) ||
      ef.nombre_cientifico?.toLowerCase().includes(searchLower)
    );
  });
});

watch(() => property.userPropertySelected, (newValue) => {
  formData.value.ep_usuario = newValue || '';
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
  property.userPropertySelected = '';
}

const handleSubmit = async () => {
  const areRequiredFieldsEmpty = requiredFields.some(field => formData.value[field] === '');
  console.log('data create ', formData.value)

  if (areRequiredFieldsEmpty) {
    error.value = 'Hay campos vacíos';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }

  const normalizeData = (data) => {
  const normalized = {};
    for (const key in data) {
      if (data[key] === '' || data[key] === null || data[key] === undefined) {
        normalized[key] = null; // Reemplaza valores vacíos con null
      } else {
        normalized[key] = data[key];
      }
    }
    return normalized;
  };

  const normalizedFormData = normalizeData(formData.value)

  try {
    const response = await property.createUsersProperty(normalizedFormData); // Espera la respuesta del store
    if (response.success) {
      resetForm();
      modal.handleClickModalAssignUserSpecies();
      toast.activateToast(response.msg, 'success'); // Muestra el mensaje del backend
    } else {
      toast.activateToast(response.msg, 'error'); // Muestra el mensaje de error
    }
  } catch (error) {
    toast.activateToast('Hubo un error en la asignación', 'error'); // Error no esperado
  }
};

const handlePropertyChange = async () => {
  if (formData.value.ep_usuario) {
    property.listPropertyId(property.userPropertySelected);
  }
}

const selectedEspecie = computed(() => {
  return species.species.find(e => e.code_specie === formData.value.ep_especie);
});

const isPalma = computed(() => {
  return selectedEspecie.value && selectedEspecie.value.habit === 'Palma';
});

function handleSelect(event) {
  selectedEspecieOption.value = event.target.value;

  const selectedOption = species.species.find(ef =>
    `${ef.code_specie} / ${ef.vernacularName} / ${ef.nombre_cientifico}` === selectedEspecieOption.value
  );

  if (selectedOption) {
    formData.value.ep_especie = selectedOption.code_specie;
  } else {
    formData.value.ep_especie = ''; // Reset if no match
  }
}

function updateSearchQuery(event) {
  searchQuery.value = event.target.value;
}

function handleCloseModal() {
  resetForm(); // Reinicia los datos del formulario
  modal.handleClickModalAssignUserSpecies(); // Cierra el modal
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
            <label class="form__modal--label">Expediente: </label>
            <input class="form__modal--input" type="text" v-model="formData.expediente" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Resolución: </label>
            <input class="form__modal--input" type="text" v-model="formData.resolucion" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Fecha: </label>
            <input class="form__modal--input" type="date" v-model="formData.fecha_exp" />
          </div>

          <div class="form__modal--field" style="display: none;">
            <label class="form__modal--label form_none" for="usuario">Nombre de usuario: </label>
            <input class="form__modal--input" type="text" v-model="formData.ep_usuario"
              :placeholder="property.userPropertySelected" />
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
            <label class="form__modal--label" for="especie_busqueda">Buscar especie:</label>
            <input
              type="text"
              class="form__modal--input"
              id="especie_busqueda"
              list="especieOptions"
              placeholder="Buscar..."
              @input="updateSearchQuery"
              @change="handleSelect"
            />
            <datalist id="especieOptions">
              <option
                v-for="ef in filteredEspecies"
                :key="ef.code_specie"
                :value="ef.code_specie + ' / ' + ef.vernacularName + ' / ' + ef.nombre_cientifico"
              >
              </option>
            </datalist>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Tamaño unidad de manejo forestal (Hectáreas): </label>
            <input class="form__modal--input" type="number" v-model="formData.tamano_UMF" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad autorizada: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_autorizada" />
          </div>

          <div v-if="isPalma" class="form__modal--field">
            <label class="form__modal--label">Cantidad de remanentes: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_remanentes" />
          </div>

          <div v-if="isPalma" class="form__modal--field">
            <label class="form__modal--label">Cantidad de individuos aprovechables: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_aprovechable" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad de individuos a monitorear: </label>
            <input class="form__modal--input" type="number" v-model="formData.cant_monitoreos" />
          </div>

          <div v-if="isPalma" class="form__modal--field">
            <label class="form__modal--label">Individuos cosechables para monitoreo: </label>
            <input class="form__modal--input" type="number" v-model="formData.PCM" />
          </div>

          <div v-if="isPalma" class="form__modal--field">
            <label class="form__modal--label">Individuos remanentes para monitoreo: </label>
            <input class="form__modal--input" type="number" v-model="formData.PRM" />
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label">Cantidad de placas: </label>
            <input class="form__modal--input" type="number" v-model="formData.cantidad_placas" />
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

            <div class="button__modal--close" @click="handleCloseModal()">
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