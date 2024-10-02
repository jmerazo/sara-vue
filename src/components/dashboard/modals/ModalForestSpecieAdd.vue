<script setup>
import { ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { useToastStore } from '@/stores/toast';

const modal = useModalStore();
const speciesStore = useEspeciesStore();
const toast = useToastStore()

const formData = ref({
  code_specie: "",
  vernacularName: "",
  otherNames: "",
  scientificName: "",
  scientificNameAuthorship: "",
  kingdom: "",
  phylum: "",
  clas: "",
  order: "",
  family: "",
  genus: "",
  habit: "",
  descriptionGeneral: "",
  leaves: "",
  flowers: "",
  fruits: "",
  seeds: "",
  specificEpithet: "",
  infraspecificEpithet: "",
  taxonRank: "",
  taxon_key: "",
  imageInputGeneral: "",
  imageInputLeaf: "",
  imageInputFlower: "",
  imageInputFruit: "",
  imageInputSeed: "",
  imageInputStem: "",
  imageInputLandScapeOne: "",
  imageInputLandScapeTwo: "",
  imageInputLandScapeThree: "",
});

const imageInputGeneral = ref(null);
const imageInputLeaf = ref(null);
const imageInputFlower = ref(null);
const imageInputFruit = ref(null);
const imageInputSeed = ref(null);
const imageInputStem = ref(null);
const imageInputLandScapeOne = ref(null);
const imageInputLandScapeTwo = ref(null);
const imageInputLandScapeThree = ref(null);

const handleImageUpload = (event, fieldName) => {
  const file = event.target.files[0] || event.dataTransfer.files[0];
  if (file) {
    readAndSetImage(file, fieldName);
  }
};

const handleDrop = (event, fieldName) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    readAndSetImage(file, fieldName);
  }
};

const readAndSetImage = (file, fieldName) => {
  const reader = new FileReader();

  reader.onload = () => {
    formData.value[fieldName] = reader.result;
  };

  reader.readAsDataURL(file);
};

async function forestSpecieAdd() {
  try {
    const response = await speciesStore.addForestSpecie(formData.value);
    if (response.success) {
      toast.activateToast(response.message, 'success');
      resetForm();
      modal.handleClickModalForestSpecieAdd();
    } else {
      toast.activateToast(response.errors.code_specie[0] || 'Error al agregar la especie', 'error');
    }
  } catch (error) {
    toast.activateToast('Error al comunicarse con el servidor', 'error');
  }
}

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}

//mostrar u ocultar detalles de las listas
function toggleDetalles(idLista) {
  const detalles = document.getElementById(idLista);
  detalles.classList.toggle("visible");
}
</script>

<template>
  <div class="modal" v-if="modal.modalForestSpecieAdd">
    <div class="modal__contenido">
      <div @click="modal.handleClickModalForestSpecieAdd(); resetForm()"
              class="button__modal--close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
      <!-- modal encabezado -->
      <div class="modal__encabezado">
        <div class="modal__imagen">
          <img src="/icons/icon-arbol.png" alt="modal-icono" />
        </div>
        <h4 class="modal__titulo">Crear nueva especie forestal</h4>
      </div>
      <hr />
      <!-- modal contenido -->
      <form @submit.prevent="forestSpecieAdd" class="formulario">
        <div class="formulario__campo">
          <label for="codigo" class="formulario__label">Código especie:</label>
          <input
            v-model="formData.code_specie"
            id="codigo"
            type="text"
            class="formulario__input"
            required
          />
        </div>
        <div class="formulario__campo">
          <label for="comun" class="formulario__label">Nombre Común:</label>
          <input
            v-model="formData.vernacularName"
            id="comun"
            type="text"
            class="formulario__input"
            required
          />
        </div>

        <div class="formulario__campo">
          <label for="otros" class="formulario__label">Otros Nombres:</label>
          <input
            v-model="formData.otherNames"
            id="otros"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="cientifico" class="formulario__label"
            >Nombre científico:</label
          >
          <input
            v-model="formData.scientificName"
            id="cientifico"
            type="text"
            class="formulario__input"
            required
          />
        </div>

        <div class="formulario__campo">
          <label for="autor_cientifico" class="formulario__label"
            >Nombre Autor:</label
          >
          <input
            v-model="formData.scientificNameAuthorship"
            id="autor_cientifico"
            type="text"
            class="formulario__input"
            required
          />
        </div>

        <div class="formulario__campo">
          <label for="familia" class="formulario__label">Familia:</label>
          <input
            v-model="formData.family"
            id="familia"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="kingdom" class="formulario__label">Reino:</label>
          <input
            v-model="formData.kingdom"
            id="kingdom"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="phylum" class="formulario__label">Filo:</label>
          <input
            v-model="formData.phylum"
            id="phylum"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="clas" class="formulario__label">Clase:</label>
          <input
            v-model="formData.clas"
            id="clas"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="order" class="formulario__label">Orden:</label>
          <input
            v-model="formData.order"
            id="order"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="genus" class="formulario__label">Genero:</label>
          <input
            v-model="formData.genus"
            id="genus"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="habit" class="formulario__label">Habito:</label>
          <select name="habit" id="habit" v-model="formData.habit" class="formulario__label">
            <option value="" disabled selected>-- Seleccione --</option>
            <option value="Árbol">Árbol</option>
            <option value="Palma">Palma</option>
          </select>
        </div>

        <div class="formulario__campo">
          <label for="descriptionGeneral" class="formulario__label"
            >Descripción general:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.descriptionGeneral"
            id="descriptionGeneral"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen general -->
        <div class="formulario__campo input__uploadImage">
          <label class="formulario__label" for="fileInputGeneral">Imagen especie:</label>
          <label
            for="fileInputGeneral"
            class="custom-file-upload"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
              <div
                v-if="!formData.imageInputGeneral"
                class="img__specieUploadPhoto"
              >
                <img
                  src="/icons/icon_upload_photo.png"
                  alt="Imagen de arrastre o clic"
                  style="width: 50px; height: auto; margin-bottom: 5px"
                />
                <p style="padding: 0; margin: 0">
                  Arrastra o selecciona un archivo
                </p>
              </div>
              <div
                v-if="formData.imageInputGeneral"
                class="img__specieUploadPhotoSelect"
              >
                <img
                  class="img_specie_selected"
                  :src="formData.imageInputGeneral"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
            <input
              id="fileInputGeneral"
              type="file"
              ref="imageInputGeneral"
              accept="image/*"
              @change="(e) => handleImageUpload(e, 'imageInputGeneral')"
              @drop.prevent="(e) => handleDrop(e, 'imageInputGeneral')"
            />
          </label>
        </div>
        <!-- fin imagen general -->
        <div class="formulario__campo">
          <label for="leaves" class="formulario__label"
            >Información de las hojas:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.leaves"
            id="leaves"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen hojas -->
        <div class="formulario__campo input__uploadImage">
          <label class="formulario__label" for="fileInputHojas"
            >Imagen hojas:</label
          >
          <label
            for="fileInputHojas"
            class="custom-file-upload"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
              <div
                v-if="!formData.imageInputLeaf"
                class="img__specieUploadPhoto"
              >
                <img
                  src="/icons/icon_upload_photo.png"
                  alt="Imagen de arrastre o clic"
                  style="width: 50px; height: auto; margin-bottom: 5px"
                />
                <p style="padding: 0; margin: 0">
                  Arrastra o selecciona un archivo
                </p>
              </div>
              <div
                v-if="formData.imageInputLeaf"
                class="img__specieUploadPhotoSelect"
              >
                <img
                  class="img_specie_selected"
                  :src="formData.imageInputLeaf"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
            <input
              id="fileInputHojas"
              type="file"
              ref="imageInputLeaf"
              accept="image/*"
              @change="(e) => handleImageUpload(e, 'imageInputLeaf')"
              @drop.prevent="(e) => handleDrop(e, 'imageInputLeaf')"
            />
          </label>
        </div>
        <!-- fin imagen hojas -->

        <div class="formulario__campo">
          <label for="flowers" class="formulario__label"
            >Información de la flor:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.flowers"
            id="flowers"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen flores -->
        <div class="formulario__campo input__uploadImage">
          <label for="fileInputFlores" class="formulario__label"
            >Imagen Flores:</label
          >
          <label
            for="fileInputFlores"
            class="custom-file-upload"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
              <div
                v-if="!formData.imageInputFlower"
                class="img__specieUploadPhoto"
              >
                <img
                  src="/icons/icon_upload_photo.png"
                  alt="Imagen de arrastre o clic"
                  style="width: 50px; height: auto; margin-bottom: 5px"
                />
                <p style="padding: 0; margin: 0">
                  Arrastra o selecciona un archivo
                </p>
              </div>
              <div
                v-if="formData.imageInputFlower"
                class="img__specieUploadPhotoSelect"
              >
                <img
                  class="img_specie_selected"
                  :src="formData.imageInputFlower"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
            <input
              id="fileInputFlores"
              type="file"
              ref="imageInputFlower"
              accept="image/*"
              @change="(e) => handleImageUpload(e, 'imageInputFlower')"
              @drop.prevent="(e) => handleDrop(e, 'imageInputFlower')"
            />
          </label>
        </div>
        <!-- fin imagen flores -->
        <div class="formulario__campo">
          <label for="fruits" class="formulario__label"
            >Información de los frutos:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.fruits"
            id="fruits"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen frutos -->
        <div class="formulario__campo input__uploadImage">
          <label for="fileInputFrutos" class="formulario__label"
            >Imagen Frutos:</label
          >
          <label
            for="fileInputFrutos"
            class="custom-file-upload"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
              <div
                v-if="!formData.imageInputFruit"
                class="img__specieUploadPhoto"
              >
                <img
                  src="/icons/icon_upload_photo.png"
                  alt="Imagen de arrastre o clic"
                  style="width: 50px; height: auto; margin-bottom: 5px"
                />
                <p style="padding: 0; margin: 0">
                  Arrastra o selecciona un archivo
                </p>
              </div>
              <div
                v-if="formData.imageInputFruit"
                class="img__specieUploadPhotoSelect"
              >
                <img
                  class="img_specie_selected"
                  :src="formData.imageInputFruit"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
            <input
              id="fileInputFrutos"
              type="file"
              ref="imageInputFruit"
              accept="image/*"
              @change="(e) => handleImageUpload(e, 'imageInputFruit')"
              @drop.prevent="(e) => handleDrop(e, 'imageInputFruit')"
            />
          </label>
        </div>
        <!-- fin imagen frutos -->
        <div class="formulario__campo">
          <label for="seeds" class="formulario__label"
            >Información de las semillas:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.seeds"
            id="seeds"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen semillas -->
        <div class="formulario__campo input__uploadImage">
          <label for="fileInputSemillas" class="formulario__label"
            >Imagen semillas:</label
          >
          <label
            for="fileInputSemillas"
            class="custom-file-upload"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
              <div
                v-if="!formData.imageInputSeed"
                class="img__specieUploadPhoto"
              >
                <img
                  src="/icons/icon_upload_photo.png"
                  alt="Imagen de arrastre o clic"
                  style="width: 50px; height: auto; margin-bottom: 5px"
                />
                <p style="padding: 0; margin: 0">
                  Arrastra o selecciona un archivo
                </p>
              </div>
              <div
                v-if="formData.imageInputSeed"
                class="img__specieUploadPhotoSelect"
              >
                <img
                  class="img_specie_selected"
                  :src="formData.imageInputSeed"
                  alt="Imagen seleccionada"
                />
              </div>
            </div>
            <input
              id="fileInputSemillas"
              type="file"
              ref="imageInputSeed"
              accept="image/*"
              @change="(e) => handleImageUpload(e, 'imageInputSeed')"
              @drop.prevent="(e) => handleDrop(e, 'imageInputSeed')"
            />
          </label>
        </div>

        <div class="formulario__campo">
          <label for="specificEpithet" class="formulario__label">Epíteto Específico:</label>
          <input
            v-model="formData.specificEpithet"
            id="specificEpithet"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="infraspecificEpithet" class="formulario__label">Epíteto Infragenérico:</label>
          <input
            v-model="formData.infraspecificEpithet"
            id="infraspecificEpithet"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="taxonRank" class="formulario__label">Categoría del Taxón:</label>
          <input
            v-model="formData.taxonRank"
            id="taxonRank"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="taxon_key" class="formulario__label">Identificador GBIF:</label>
          <input
            v-model="formData.taxon_key"
            id="taxon_key"
            type="text"
            class="formulario__input"
          />
        </div>
        <!-- fin imagen semillas -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('galeria')">
              Subir imagénes paisajísticas
            </h2>
            <div id="galeria" class="detalles">
              <!-- imagen paisajistica 1 -->
              <div class="formulario__campo input__uploadImage">
                <label for="fileInputP1" class="formulario__label"
                  >Imagen Paisajística 1:</label
                >
                <label
                  for="fileInputP1"
                  class="custom-file-upload"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <div
                    class="drop-area"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div
                      v-if="!formData.imageInputLandScapeOne"
                      class="img__specieUploadPhoto"
                    >
                      <img
                        src="/icons/icon_upload_photo.png"
                        alt="Imagen de arrastre o clic"
                        style="width: 50px; height: auto; margin-bottom: 5px"
                      />
                      <p style="padding: 0; margin: 0">
                        Arrastra o selecciona un archivo
                      </p>
                    </div>
                    <div
                      v-if="formData.imageInputLandScapeOne"
                      class="img__specieUploadPhotoSelect"
                    >
                      <img
                        class="img_specie_selected"
                        :src="formData.imageInputLandScapeOne"
                        alt="Imagen seleccionada"
                      />
                    </div>
                  </div>
                  <input
                    id="fileInputP1"
                    type="file"
                    ref="imageInputLandScapeOne"
                    accept="image/*"
                    @change="
                      (e) => handleImageUpload(e, 'imageInputLandScapeOne')
                    "
                    @drop.prevent="
                      (e) => handleDrop(e, 'imageInputLandScapeOne')
                    "
                  />
                </label>
              </div>
              <!-- fin imagen paisajistica 1 -->
              <!-- imagen paisajistica 2 -->
              <div class="formulario__campo input__uploadImage">
                <label for="fileInputP2" class="formulario__label"
                  >Imagen Paisajística 2:</label
                >
                <label
                  for="fileInputP2"
                  class="custom-file-upload"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <div
                    class="drop-area"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div
                      v-if="!formData.imageInputLandScapeTwo"
                      class="img__specieUploadPhoto"
                    >
                      <img
                        src="/icons/icon_upload_photo.png"
                        alt="Imagen de arrastre o clic"
                        style="width: 50px; height: auto; margin-bottom: 5px"
                      />
                      <p style="padding: 0; margin: 0">
                        Arrastra o selecciona un archivo
                      </p>
                    </div>
                    <div
                      v-if="formData.imageInputLandScapeTwo"
                      class="img__specieUploadPhotoSelect"
                    >
                      <img
                        class="img_specie_selected"
                        :src="formData.imageInputLandScapeTwo"
                        alt="Imagen seleccionada"
                      />
                    </div>
                  </div>
                  <input
                    id="fileInputP2"
                    type="file"
                    ref="imageInputLandScapeTwo"
                    accept="image/*"
                    @change="
                      (e) => handleImageUpload(e, 'imageInputLandScapeTwo')
                    "
                    @drop.prevent="
                      (e) => handleDrop(e, 'imageInputLandScapeTwo')
                    "
                  />
                </label>
              </div>
              <!-- fin imagen paisajistica 2 -->
              <!-- imagen paisajistica 3 -->
              <div class="formulario__campo input__uploadImage">
                <label for="fileInputP3" class="formulario__label"
                  >Imagen Paisajística 3:</label
                >
                <label
                  for="fileInputP3"
                  class="custom-file-upload"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <div
                    class="drop-area"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                  >
                    <div
                      v-if="!formData.imageInputLandScapeThree"
                      class="img__specieUploadPhoto"
                    >
                      <img
                        src="/icons/icon_upload_photo.png"
                        alt="Imagen de arrastre o clic"
                        style="width: 50px; height: auto; margin-bottom: 5px"
                      />
                      <p style="padding: 0; margin: 0">
                        Arrastra o selecciona un archivo
                      </p>
                    </div>
                    <div
                      v-if="formData.imageInputLandScapeThree"
                      class="img__specieUploadPhotoSelect"
                    >
                      <img
                        class="img_specie_selected"
                        :src="formData.imageInputLandScapeThree"
                        alt="Imagen seleccionada"
                      />
                    </div>
                  </div>
                  <input
                    id="fileInputP3"
                    type="file"
                    ref="imageInputLandScapeThree"
                    accept="image/*"
                    @change="
                      (e) => handleImageUpload(e, 'imageInputLandScapeThree')
                    "
                    @drop.prevent="
                      (e) => handleDrop(e, 'imageInputLandScapeThree')
                    "
                  />
                </label>
              </div>
              <!-- fin imagen paisajistica 3 -->
               <!-- imagen tallo -->
              <div class="formulario__campo input__uploadImage">
                <label for="fileInputTallo" class="formulario__label"
                  >Imagen paisajistica 4:</label
                >
                <label
                  for="fileInputTallo"
                  class="custom-file-upload"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
                    <div
                      v-if="!formData.imageInputStem"
                      class="img__specieUploadPhoto"
                    >
                      <img
                        src="/icons/icon_upload_photo.png"
                        alt="Imagen de arrastre o clic"
                        style="width: 50px; height: auto; margin-bottom: 5px"
                      />
                      <p style="padding: 0; margin: 0">
                        Arrastra o selecciona un archivo
                      </p>
                    </div>
                    <div
                      v-if="formData.imageInputStem"
                      class="img__specieUploadPhotoSelect"
                    >
                      <img
                        class="img_specie_selected"
                        :src="formData.imageInputStem"
                        alt="Imagen seleccionada"
                      />
                    </div>
                  </div>
                  <input
                    id="fileInputTallo"
                    type="file"
                    ref="imageInputStem"
                    accept="image/*"
                    @change="(e) => handleImageUpload(e, 'imageInputStem')"
                    @drop.prevent="(e) => handleDrop(e, 'imageInputStem')"
                  />
                </label>
              </div>
            </div>
          </li>
        </ul>

        <div class="formulario__botones">
          <button type="submit" class="formulario__boton">Guardar</button>
          <button
            @click="modal.handleClickModalForestSpecieAdd(); resetForm()"
            type="button"
            class="formulario__boton formulario__boton--cerrar"
          >
            Cerrar
          </button>
        </div>
      </form>
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
.modal__encabezado {
  display: flex;
  flex-direction: column;
}
.modal__imagen {
  width: 3rem;
  margin: 0 auto;
}
.modal__titulo {
  font-size: 0.95rem;
  margin: 0 auto;
  padding: 0;
  font-weight: 900;
}

/* formulario  */
.formulario__campo {
  margin-bottom: 0.5rem;
  margin: 0 auto;
}
.fomulario__campo--textarea {
  border: 1px solid var(--primary);
  width: 98%;
  border-radius: 5px;
}
.formulario__label {
  margin: 0.5rem auto 0 auto;
  width: 97%;
  display: block;
  text-align: left;
  font-weight: 700;
  font-size: 0.8rem;
}
.formulario__select,
.formulario__input {
  border: 1px solid var(--primary);
  border-radius: 5px;
  width: 97%;
  font-size: 0.9rem;
  padding: 0.3rem;
}
.formulario__textarea {
  border: none;
  font-size: 0.9rem;
  width: 97%;
  height: 3rem;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
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
.alerta {
  background-color: var(--rojo);
}
/* Estilos para ocultar el input de archivo */
#fileInputGeneral {
  display: none;
}
#fileInputHojas {
  display: none;
}
#fileInputFlores {
  display: none;
}
#fileInputFrutos {
  display: none;
}
#fileInputTallo {
  display: none;
}
#fileInputSemillas {
  display: none;
}
#fileInputP1 {
  display: none;
}
#fileInputP2 {
  display: none;
}
#fileInputP3 {
  display: none;
}

/* lista y opciones */
.lista {
  list-style: none;
  padding: 0;
  margin: 0;
}
.opciones {
  border-radius: 5px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}
.detalles {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.detalles.visible {
  max-height: 9500px; /* Ajusta la altura máxima según tus necesidades */
  transition: max-height 0.3s ease-in-out;
}
.card__titulo {
  font-size: 1rem;
  border: 1px solid var(--secondary);
  padding: 0.3rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  margin: 1rem 0 0.4rem 0;
  transition: background-color 0.3s ease;
}
.card__titulo:hover {
  background-color: var(--secondary);
  color: var(--blanco);
}
/* Estilos para el diseño personalizado del input de archivo */
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px; /* Altura deseada */
}

.drop-area img {
  margin-bottom: 10px;
}
.input__uploadImage {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.img_specie_selected {
  max-height: 8rem;
  width: auto;
  margin-top: 0.5rem;
}

.img__specieUploadPhotoSelect {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.img__specieUploadPhoto {
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>