<script setup>
import { ref } from "vue";
import { usePageContent } from "@/stores/page";
import { useModalStore } from "@/stores/modal";
import { useToastStore } from "@/stores/toast";
import SvgIcon from "@/assets/SvgIcon.vue";
import LoadingData from "@/components/shared/LoadingData.vue";

const pageStore = usePageContent();
const modal = useModalStore();
const toast = useToastStore();

const formData = ref({
  title: "",
  description: "",
  image: null
});

const previewImage = ref(null);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;

    // Generar vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function SliderImagesAdd() {
  try {
    const response = await pageStore.SliderImagesAdd(formData.value);
    if (response.success) {
      toast.activateToast(response.msg, "success");
      modal.handleClickModalSliderImagesAdd();
      resetForm(); 
    } else {
      toast.activateToast(response.msg, "error");
    }
  } catch (error) {
    toast.activateToast("Hubo un error al agregar la imagen", "error");
  }
}

function resetForm() {
  formData.value = {
    title: "",
    description: "",
    image: null,
  };
  previewImage.value = null;
}

function closeModal() {
  modal.handleClickModalSliderImagesAdd();
  resetForm();
}
</script>

<template>
  <div class="modal" v-if="modal.modalSliderImagesAdd">
    <div class="modal__contenido">
      <!-- Encabezado del modal -->
      <div class="modal__encabezado">
        <div class="modal__imagen">
          <SvgIcon iconName="image" size="50"/>
        </div>
        <h4 class="modal__titulo">Agregar nueva imagen</h4>
      </div>
      <hr />

      <!-- Formulario -->
      <form @submit.prevent="SliderImagesAdd" class="formulario">
        <!-- Campo para el título -->
        <div class="formulario__campo">
          <label for="title" class="formulario__label">Título</label>
          <input
            v-model="formData.title"
            id="title"
            type="text"
            class="formulario__input"
            required
          />
        </div>

        <!-- Campo para la descripción -->
        <div class="formulario__campo">
          <label for="description" class="formulario__label">Link</label>
          <input
            v-model="formData.description"
            id="description"
            class="formulario__input"
            rows="3"
          />
        </div>

        <!-- Zona para cargar imagen -->
        <div class="formulario__campo">
          <label class="formulario__label">Imagen</label>
          <div class="drop-area">
            <div v-if="!previewImage">
              <input
                id="image-upload"
                type="file"
                @change="handleImageUpload"
                accept="image/*"
                hidden
              />
              <label for="image-upload" class="custom-file-upload">
                <SvgIcon
                  iconName="imageUpload"
                  size="45"
                />
                Selecciona o arrastra una imagen aquí
              </label>
            </div>
            <div v-else class="preview-wrapper">
              <img :src="previewImage" alt="Vista previa" class="preview-image" />
            </div>
          </div>
        </div>

        <LoadingData v-if="pageStore.loading"/>

        <!-- Botones -->
        <div class="formulario__botones">
          <button type="submit" class="formulario__boton">Guardar</button>
          <button
            @click="closeModal()"
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
  font-weight: 700;
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

.drop-area {
  border: 2px dashed #ccc;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 8px;
  position: relative;
}

.drop-area:hover {
  background-color: #f9f9f9;
}

.custom-file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  cursor: pointer;
}

.preview-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px; /* Ajusta según sea necesario */
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Asegura que la imagen mantenga sus proporciones */
  border-radius: 8px;
}
</style>