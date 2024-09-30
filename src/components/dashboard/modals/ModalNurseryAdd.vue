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
  representante_legal: '',
  ubicacion: '',
  email: '',
  telefono: '',
  department: '',
  city: '',
  direccion: '',
  logo: '',
  active: 1,
  clase_vivero: '',
  vigencia_registro: '',
  tipo_registro: '',
  numero_registro_ica: ''
});

watch(() => nurseriesStore.userSelected, (newValue) => {
  console.log('newValue ', newValue)
  formData.value.representante_legal = newValue;
  formData.value = { ...formData.value };
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

const handleSubmit = () => {
  const fieldsToValidate = Object.entries(formData.value)
    .filter(([key]) => key !== 'logo')
    .map(([key, value]) => value);

  if (fieldsToValidate.some(value => value === "")) {
    error.value = "Hay campos vacíos";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }

  try {
    // Crear un objeto FormData para enviar el archivo correctamente
    const data = new FormData();
    data.append('nombre_vivero', formData.value.nombre_vivero);
    data.append('nit', formData.value.nit);
    data.append('representante_legal', formData.value.representante_legal);
    data.append('ubicacion', formData.value.ubicacion);
    data.append('email', formData.value.email);
    data.append('telefono', formData.value.telefono);
    data.append('department', formData.value.department);
    data.append('city', formData.value.city);
    data.append('direccion', formData.value.direccion);
    data.append('active', formData.value.active);

    // Asegúrate de agregar el archivo real (no la URL temporal)
    if (selectedFile.value) {
      data.append('logo', selectedFile.value);  // Agregar el archivo al FormData
    }

    // Enviar el FormData al store o directamente al backend
    nurseriesStore.createNursery(data);  // Asegúrate de que esta función acepte FormData

    resetForm();
    modal.handleClickModalNurseryAdd();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      alert(error.response.data.error);
    } else {
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

const fileInput = ref(null);
const selectedFile = ref(null);
const imagePreview = ref(null);

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;  // Guardamos el archivo para luego enviarlo
    imagePreview.value = URL.createObjectURL(file);  // Solo para previsualizar en el frontend
  }
}

function handleDrop(event) {
  const file = event.dataTransfer.files[0];
  if (file) {
    selectedFile.value = file;  // Guardamos el archivo para luego enviarlo
    imagePreview.value = URL.createObjectURL(file);  // Solo para previsualizar en el frontend
  }
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
            <label class="form__modal--label" for="class_nursery">Clase de vivero:</label>
            <select id="class_nursery" class="form__modal--input" v-model="formData.clase_vivero">
              <option value="">--Seleccione--</option>
              <option value="Forestal">Forestal</option>
              <option value="Mixto">Mixto</option>
              <option value="Ornamental">Ornamental</option>
              <option value="Frutal">Frutal</option>
              <option value="Cítricos">Cítricos</option>
            </select>
          </div>

          <div class="form__modal--field">
            <label class="form__modal--label" for="validity_register">¿Registro vigente?:</label>
            <select id="validity_register" class="form__modal--input" v-model="formData.vigencia_registro">
              <option value="">--Seleccione--</option>
              <option value="1">Si</option>
              <option value="0">No</option>
            </select>
          </div>

          <div class="form__modal--field" v-show="formData.vigencia_registro == 1">
            <label class="form__modal--label" for="type_register">Tipo de registro:</label>
            <select id="type_register" class="form__modal--input" v-model="formData.tipo_registro">
              <option value="">--Seleccione--</option>
              <option value="Productor">Productor</option>
              <option value="Distribuidor">Distribuidor</option>
              <option value="Comercializador">Comercializador</option>
              <option value="Productos de Plantulas">Productos de Plantulas</option>
              <option value="Productor y Distribuidor">Productor y Distribuidor</option>
              <option value="Productor y comercializador">Productor y comercializador</option>
              <option value="Distribuidor, Productor y Comercializador">Distribuidor, Productor y Comercializador</option>
            </select>
          </div>

          <div class="form__modal--field" v-show="formData.vigencia_registro == 1">
            <label class="form__modal--label">Número de registro ICA: </label>
            <input class="form__modal--input" type="number" v-model="formData.numero_registro_ica" />
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
              <option v-for="loc in locates.departments" :key="loc.id" :value="loc.id">
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

            <!-- Input oculto para cargar archivos -->
            <input
              class="form__modal--input file-input"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              ref="fileInput"
              hidden
            />

            <!-- Área personalizada para arrastrar y soltar -->
            <div
              class="file-drop-area"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <!-- Texto o imagen de fondo o previsualización de la imagen seleccionada -->
              <div class="file-img">
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Previsualización de la imagen"
                  class="upload-preview"
                />
                <img
                  v-else
                  class="upload-icon"
                  src="/icons/icon_upload_photo.png"
                  alt="Subir archivo"
                />
              </div>
              <span v-if="!imagePreview">Arrastra y suelta tu imagen aquí o haz clic para subir</span>
            </div>
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

.form__modal--field {
  position: relative;
  display: flex;
  flex-direction: column;
}

.file-drop-area {
  border: 2px dashed #cccccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #f9f9f9;
  position: relative;
  transition: background-color 0.3s;
}

.file-drop-area:hover {
  background-color: #f1f1f1;
}

.file-drop-area img.upload-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.file-drop-area span {
  font-size: 16px;
  color: #666;
}

.file-drop-area.dragover {
  border-color: #007bff;
}

.file-input {
  display: none; /* Ocultar el input original */
}

.file-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-preview {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>