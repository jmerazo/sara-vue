<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { propertyStore } from "@/stores/dashboard/property";
import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { useToastStore } from '@/stores/toast';
import SvgIcon from "@/assets/SvgIcon.vue";
import LoadingData from "@/components/shared/LoadingData.vue";

// ==================================================
// 1. Declaraciones e importaciones
// ==================================================
const property = propertyStore();
const modal = useModalStore();
const species = useEspeciesStore();
const toast = useToastStore();

// Estado para el select de expediente y errores
const records = ref([]);
const selectedExpedienteId = ref('');
const error = ref("");

// Objeto reactivo con los datos del formulario
const formData = ref({
  expediente: '',
  code_expediente: '',
  ep_especie: '',  
  ep_predio: '', // ID del predio
  ep_usuario: '', // ID del usuario
  cantidad_autorizada: '', // Árbol
  cantidad_remanentes: '',
  cantidad_aprovechable: '',
  CM: '', // Árbol
  RM: '',
  cantidad_placas: '', // Árbol  
});

// Campos requeridos para validar antes de enviar
const requiredFields = ['expediente', 'resolucion', 'ep_usuario'];

// Variables para búsqueda de especies
const searchQuery = ref('');
const selectedEspecieOption = ref('');

// ==================================================
// 2. Computed Properties
// ==================================================
const filteredEspecies = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return species.species.filter(ef =>
    ef.code_specie?.toString().toLowerCase().includes(searchLower) ||
    ef.vernacularName?.toLowerCase().includes(searchLower) ||
    ef.nombre_cientifico?.toLowerCase().includes(searchLower)
  );
});

const selectedEspecie = computed(() =>
  species.species.find(e => e.code_specie === formData.value.ep_especie)
);

const isPalma = computed(() =>
  selectedEspecie.value && selectedEspecie.value.habit === 'Palma'
);

// ==================================================
// 3. Funciones de uso común
// ==================================================

// Función para normalizar datos (convierte valores vacíos a null)
const normalizeData = (data) => {
  const normalized = {};
  for (const key in data) {
    normalized[key] = (data[key] === '' || data[key] === null || data[key] === undefined)
                        ? null
                        : data[key];
  }
  return normalized;
};

// Reinicia el formulario y variables relacionadas
function resetForm() {
  Object.keys(formData.value).forEach(key => formData.value[key] = "");
  selectedExpedienteId.value = "";
  property.userPropertySelected = '';
}

// Calcula los campos derivados a partir de "cantidad_autorizada" y "CM"
const recalcValues = () => {
  const cantidadAutorizada = parseFloat(formData.value.cantidad_autorizada) || 0;
  const cm = parseFloat(formData.value.CM) || 0;
  
  const remanentes = Math.floor(cantidadAutorizada * 0.30);
  const aprovechable = cantidadAutorizada - remanentes;
  const cantidadPlacas = remanentes + cm;
  
  formData.value.cantidad_remanentes = remanentes;
  formData.value.cantidad_aprovechable = aprovechable;
  formData.value.cantidad_placas = cantidadPlacas;
};

// Maneja el envío del formulario
const handleSubmit = async () => {
  // Validación de campos requeridos
  const areRequiredFieldsEmpty = requiredFields.some(field => formData.value[field] === '');
  console.log('data create ', formData.value);

  if (areRequiredFieldsEmpty) {
    error.value = 'Hay campos vacíos';
    setTimeout(() => { error.value = ''; }, 3000);
    return;
  }

  const normalizedFormData = normalizeData(formData.value);

  try {
    const response = await property.createSpeciesRecord(normalizedFormData);
    if (response.success) {
      resetForm();
      modal.handleClickModalAssignUserSpecies();
      toast.activateToast(response.msg, 'success');
    } else {
      toast.activateToast(response.msg, 'error');
    }
  } catch (err) {
    toast.activateToast('Hubo un error en la asignación', 'error');
  }
};

// Maneja la búsqueda de registros (expediente) según el usuario seleccionado
const handleRecordChange = async () => {
  if (!property.userPropertySelected) {
    console.warn("Debe seleccionar una propiedad válida.");
    return;
  }
  try {
    const response = await property.propertyRecordSearch(property.userPropertySelected);
    console.log('response ', response);
    records.value = (response.length === 0)
      ? [{ id: null, expediente: "No hay datos disponibles" }]
      : response;
  } catch (err) {
    console.error("Error al realizar la consulta:", err);
    records.value = [{ id: null, expediente: "Error al cargar datos" }];
  }
};

// Actualiza la especie seleccionada a partir del valor ingresado en el input
function handleSelect(event) {
  selectedEspecieOption.value = event.target.value;
  const selectedOption = species.species.find(ef =>
    `${ef.code_specie} / ${ef.vernacularName} / ${ef.nombre_cientifico}` === selectedEspecieOption.value
  );
  formData.value.ep_especie = selectedOption ? selectedOption.code_specie : '';
}

// Actualiza la query de búsqueda
function updateSearchQuery(event) {
  searchQuery.value = event.target.value;
}

// Cierra el modal y resetea el formulario
function handleCloseModal() {
  resetForm();
  modal.handleClickModalAssignUserSpecies();
}

// ==================================================
// 4. Watchers y Hooks
// ==================================================

// Cargar especies una vez que se monta el componente
onMounted(async () => {
  await species.loadAllSpecies();
});

// Cuando cambia la propiedad seleccionada, se actualizan los registros
watch(
  () => property.userPropertySelected,
  async (newValue) => {
    if (newValue) await handleRecordChange();
  }
);

// Cuando cambia el select de expediente, actualiza formData con el registro correspondiente
watch(selectedExpedienteId, async (nuevoId) => {
  await nextTick();
  if (!nuevoId) return;

  const registroSeleccionado = records.value.find(record => String(record.id) === String(nuevoId));
  if (registroSeleccionado) {
    formData.value.expediente = registroSeleccionado.id || '';
    formData.value.code_expediente = registroSeleccionado.expediente || '';
    formData.value.ep_predio = registroSeleccionado.ep_predio_id || '';
    formData.value.ep_usuario = registroSeleccionado.ep_usuario_id || '';
    formData.value.ep_especie = registroSeleccionado.ep_especie || '';
    formData.value.cantidad_autorizada = registroSeleccionado.cantidad_autorizada || '';
    formData.value.cantidad_remanentes = registroSeleccionado.cantidad_remanentes || '';
    formData.value.cantidad_aprovechable = registroSeleccionado.cantidad_aprovechable || '';
    formData.value.CM = registroSeleccionado.CM || '';
    formData.value.RM = registroSeleccionado.RM || '';
    formData.value.cantidad_placas = registroSeleccionado.cantidad_placas || '';
  } else {
    console.warn("Registro no encontrado.");
  }
});

// Recalcular campos derivados cuando cambian "cantidad_autorizada" o "CM"
watch(
  [() => formData.value.cantidad_autorizada, () => formData.value.CM],
  recalcValues
);
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
          <!-- Campo expediente -->
          <div class="form__modal--field">
            <label class="form__modal--label">Expediente:</label>
            <select 
              name="expediente" 
              id="expediente" 
              class="form__modal--input" 
              v-model="selectedExpedienteId"
            >
              <option value="" selected disabled>
                Seleccione un expediente...
              </option>
              <option v-for="p in records" :key="p.id" :value="p.id">
                {{ p.expediente }}
              </option>
            </select>
          </div>

          <!-- Campo buscar especie -->
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
              ></option>
            </datalist>
          </div>

          <!-- Campos organizados en dos columnas -->
          <div class="fields-grid">
            <!-- Fila 1 -->
            <div class="form__modal--field">
              <label class="form__modal--label">Cantidad autorizada:</label>
              <input class="form__modal--input" type="number" v-model="formData.cantidad_autorizada" />
            </div>
            <div class="form__modal--field">
              <label class="form__modal--label">Cantidad de remanentes:</label>
              <input class="form__modal--input" type="number" v-model="formData.cantidad_remanentes" />
            </div>
            <!-- Fila 2 -->
            <div class="form__modal--field">
              <label class="form__modal--label">Cantidad de individuos aprovechables:</label>
              <input class="form__modal--input" type="number" v-model="formData.cantidad_aprovechable" />
            </div>
            <div class="form__modal--field">
              <label class="form__modal--label">Cantidad de individuos a monitorear (CM):</label>
              <input class="form__modal--input" type="number" v-model="formData.CM" />
            </div>
            <!-- Fila 3 -->
            <div class="form__modal--field">
              <label class="form__modal--label">Individuos remanentes para monitoreo (RM):</label>
              <input class="form__modal--input" type="number" v-model="formData.RM" />
            </div>
            <div class="form__modal--field">
              <label class="form__modal--label">Cantidad de placas:</label>
              <input class="form__modal--input" type="number" v-model="formData.cantidad_placas" />
            </div>
          </div>

          <!-- Mensaje de error -->
          <p class="msg__error" v-if="error">
            {{ error }}
          </p>
          <LoadingData v-if="property.loading" />

          <!-- Botones -->
          <div class="form__modal--buttons" :class="{ 'with-error': error }">
            <button class="form__modal--save" type="submit" :disabled="property.loading">
              <SvgIcon iconName="save" size="32" />
            </button>

            <div class="button__modal--close" @click="handleCloseModal()">
              <SvgIcon iconName="closeModal" size="32"/>
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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* Estilos del formulario */
.form__modal--content {
  text-align: left;
}

.form__modal--title {
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
}

hr {
  margin-bottom: 1.5rem;
}

/* Campo individual */
.form__modal--field {
  margin-bottom: 1rem;
}

.form__modal--label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.form__modal--input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Grid para campos en dos columnas */
.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 2rem;
  margin-bottom: 1rem;
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