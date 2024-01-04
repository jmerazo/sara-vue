<script setup>
import { watch, onMounted, ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";

const modal = useModalStore();
const speciesStore = useEspeciesStore();

const formData = ref({
  cod_especie: "",
  nom_comunes: "",
  otros_nombres: "",
  nombre_cientifico: "",
  sinonimos: "",
  familia: "",
  distribucion: "",
  habito: "",
  follaje: "",
  forma_copa: "",
  tipo_hoja: "",
  disposicion_hojas: "",
  hojas: "",
  flor: "",
  frutos: "",
  semillas: "",
  tallo: "",
  raiz: "",
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
  speciesStore.addForestSpecie(formData.value);
  console.log("formData: ", formData.value);
  modal.handleClickModalForestSpecieAdd();
}

const adjustTextareaHeight = (event) => {
  const textarea = event.target;
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
};

const initializeFormData = () => {
  const selectedForestSpecie = speciesStore.specieSelected[0];
  if (selectedForestSpecie) {
    formData.value = {
      cod_especie: selectedForestSpecie.cod_especie || "",
      nom_comunes: selectedForestSpecie.nom_comunes || "",
      otros_nombres: selectedForestSpecie.otros_nombres || "",
      nombre_cientifico: selectedForestSpecie.nombre_cientifico || "",
      sinonimos: selectedForestSpecie.sinonimos || "",
      familia: selectedForestSpecie.familia || "",
      distribucion: selectedForestSpecie.distribucion || "",
      habito: selectedForestSpecie.habito || "",
      follaje: selectedForestSpecie.follaje || "",
      forma_copa: selectedForestSpecie.forma_copa || "",
      tipo_hoja: selectedForestSpecie.tipo_hoja || "",
      disposicion_hojas: selectedForestSpecie.disposicion_hojas || "",
      hojas: selectedForestSpecie.hojas || "",
      flor: selectedForestSpecie.flor || "",
      frutos: selectedForestSpecie.frutos || "",
      semillas: selectedForestSpecie.semillas || "",
      tallo: selectedForestSpecie.tallo || "",
      raiz: selectedForestSpecie.raiz || "",
    };
  }
};

onMounted(() => {
  // Ajusta la altura inicial de los textareas
  const textareas = document.querySelectorAll(".auto-resize-textarea");
  textareas.forEach((textarea) => {
    adjustTextareaHeight({ target: textarea });
  });
});

watch(
  () => speciesStore.specieSelected,
  () => {
    initializeFormData();
  }
);

//mostrar u ocultar detalles de las listas
function toggleDetalles(idLista) {
  const detalles = document.getElementById(idLista);
  detalles.classList.toggle("visible");
}
</script>

<template>
  <div class="modal" v-if="modal.modalForestSpecieAdd">
    <div class="modal__contenido">
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
            v-model="formData.cod_especie"
            id="codigo"
            type="text"
            class="formulario__input"
            required
          />
        </div>
        <div class="formulario__campo">
          <label for="comun" class="formulario__label">Nombre Común:</label>
          <input
            v-model="formData.nom_comunes"
            id="comun"
            type="text"
            class="formulario__input"
            required
          />
        </div>
        <div class="formulario__campo">
          <label for="cientifico" class="formulario__label"
            >Nombre científico:</label
          >
          <input
            v-model="formData.nombre_cientifico"
            id="cientifico"
            type="text"
            class="formulario__input"
            required
          />
        </div>

        <div class="formulario__campo">
          <label for="otros" class="formulario__label">Otros Nombres:</label>
          <input
            v-model="formData.otros_nombres"
            id="otros"
            type="text"
            class="formulario__input"
          />
        </div>
        <div class="formulario__campo">
          <label for="familia" class="formulario__label">Familia:</label>
          <input
            v-model="formData.familia"
            id="familia"
            type="text"
            class="formulario__input"
          />
        </div>
        <div class="formulario__campo">
          <label for="sinonimos" class="formulario__label">Sinónimos:</label>
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.sinonimos"
            id="sinonimos"
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
          <label for="distribucion" class="formulario__label"
            >Distribución:</label
          >
          <input
            v-model="formData.distribucion"
            id="distribucion"
            type="text"
            class="formulario__input"
          />
        </div>
        <div class="formulario__campo">
          <label for="habito" class="formulario__label">Hábito:</label>
          <input
            v-model="formData.habito"
            id="habito"
            type="text"
            class="formulario__input"
          />
        </div>
        <div class="formulario__campo">
          <label for="follaje" class="formulario__label">Follaje:</label>
          <input
            v-model="formData.follaje"
            id="follaje"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="forma-copa" class="formulario__label">Forma copa:</label>
          <input
            v-model="formData.forma_copa"
            id="foma-copa"
            type="text"
            class="formulario__input"
          />
        </div>
        <div class="formulario__campo">
          <label for="tipo-hoja" class="formulario__label">Tipo de hoja:</label>
          <input
            v-model="formData.tipo_hoja"
            id="tipo-hoja"
            type="text"
            class="formulario__input"
          />
        </div>

        <div class="formulario__campo">
          <label for="hojas" class="formulario__label"
            >Información de las hojas:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.hojas"
            id="hojas"
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
          <label for="flor" class="formulario__label"
            >Información de la flor:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.flor"
            id="flor"
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
          <label for="frutos" class="formulario__label"
            >Información de los frutos:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.frutos"
            id="frutos"
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
          <label for="semillas" class="formulario__label"
            >Información de las semillas:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.semillas"
            id="semillas"
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
        <!-- fin imagen semillas -->
        <div class="formulario__campo">
          <label for="tallo" class="formulario__label"
            >Información del tallo:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.tallo"
            id="tallo"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
        <!-- imagen tallo -->
        <div class="formulario__campo input__uploadImage">
          <label for="fileInputTallo" class="formulario__label"
            >Imagen tallo:</label
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
                  src="../../assets/prefabs/icon_upload_photo.png"
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
        <!-- fin imagen tallo -->
        <div class="formulario__campo">
          <label for="raiz" class="formulario__label"
            >Información de la raíz:</label
          >
        </div>
        <div class="formulario__campo fomulario__campo--textarea">
          <textarea
            v-model="formData.raiz"
            id="tallo"
            type="text"
            class="formulario__textarea"
          ></textarea>
        </div>
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
                        src="../../assets/prefabs/icon_upload_photo.png"
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
                        src="../../assets/prefabs/icon_upload_photo.png"
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
                        src="../../assets/prefabs/icon_upload_photo.png"
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
            </div>
          </li>
        </ul>

        <div class="formulario__botones">
          <button type="submit" class="formulario__boton">Guardar</button>
          <button
            @click="modal.handleClickModalForestSpecieAdd()"
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
  z-index: 2;
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