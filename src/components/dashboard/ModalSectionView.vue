<script setup>
import { watch, onMounted, ref, computed } from "vue";
import { usePageContent } from "@/stores/page";
import { useModalStore } from "@/stores/modal";

const pageStore = usePageContent();
const modal = useModalStore();

const formData = ref({
  page_id: "",
  section_title: "",
  content: "",
  image: "",
  content_type: "",
  order: "",

  sectionTitleStyles: {
      fontStyle: "",
      fontSize: 12,
      textColor: "#000000",
      textAlignment: "",
  },
  contentStyles: {
      fontStyle: "",
      fontSize: 12,
      textColor: "#000000",
      textAlignment: "",
  },
});

const initializeFormData = () => {
  const selectedSection = pageStore.sectionSelectedView[0];
  console.log('selected section: ', selectedSection)
  if (selectedSection) {
    formData.value = {
      page_id: selectedSection.page_id || "",
      section_title: selectedSection.section_title || "",
      content: selectedSection.content || "",
      image: selectedSection.image || "",
      content_type: selectedSection.content_type || "",
      order: selectedSection.order || "",

      sectionTitleStyles: {
          fontStyle: selectedSection?.styles?.titleStyles?.fontStyle || "",
          fontSize: selectedSection?.styles?.titleStyles?.fontSize || 12,
          textColor: selectedSection?.styles?.titleStyles?.color || "#000000",
          textAlignment: selectedSection?.styles?.titleStyles?.textAlign || "",
      },
      contentStyles: {
          fontStyle: selectedSection?.styles?.contentStyles?.fontStyle || "",
          fontSize: selectedSection?.styles?.contentStyles?.fontSize || 12,
          textColor: selectedSection?.styles?.contentStyles?.color || "#000000",
          textAlignment: selectedSection?.styles?.contentStyles?.textAlign || "",
      }
    };
  }
};

watch(
  () => pageStore.sectionSelectedView,
  () => {
    initializeFormData();
  }
);

onMounted(() => {
  pageStore.pagesData();
});

const selectedPageTitle = computed(() => {
  const page = pages.value.find(p => p.id === formData.value.page_id);
  return page ? page.title : 'Ninguna página seleccionada';
});
</script>

<template>
     <div class="modal" v-if="modal.modalSectionView">
    <div class="modal__contenido">
      <!-- modal encabezado -->
      <div class="modal__encabezado">
        <div class="modal__imagen">
          <img src="/icons/icon-design-page.png" alt="modal-icono" />
        </div>
        <h4 class="modal__titulo">Vista sección</h4>
      </div>
      <hr />
      <!-- modal contenido -->
      <form @submit.prevent="sectionUpdated" class="formulario">
        <div class="formulario__campo">
          <label class="formulario__label" for="species">Página</label>
          <!--label>{{ formData.page_id}}</label-->
          <select class="formulario__input formulario__input--select"  v-model="formData.page_id" disabled>
            <option v-for="p in pageStore.pageData" :key="p.id" :value="p.id">
                {{ p.title }}
            </option>
          </select>        
        </div>
        
        <div class="formulario__campo">
          <label for="comun" class="formulario__label">Título de la sección</label>
          <label class="formulario__input">{{ formData.section_title }}</label>
        </div>

        <div class="formulario__campo">
            <label for="fontStyle" class="formulario__label">Estilo de Fuente</label>
            <label class="formulario__input">
                {{ formData.sectionTitleStyles.fontStyle || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
            <label for="fontSizeSlider" class="formulario__label">Tamaño de Fuente</label>
            <label class="formulario__input">{{ formData.sectionTitleStyles.fontSize  }}</label>
        </div>

        <div class="formulario__campo">
            <label for="textColor" class="formulario__label">Color de Texto</label>
            <input type="color" v-model="formData.sectionTitleStyles.textColor" id="textColor" class="formulario__input" disabled/>
        </div>

        <div class="formulario__campo">
            <label for="textAlignment" class="formulario__label">Alineación del Texto</label>
            <label class="formulario__input">
                {{ formData.sectionTitleStyles.textAlignment || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
          <label for="comun" class="formulario__label">Contenido</label>
            <textarea class="formulario__textarea" disabled>
                {{ formData.content || 'Sin información' }}
            </textarea>
        </div>

        <div class="formulario__campo">
            <label for="fontStyle" class="formulario__label">Estilo de Fuente</label>
            <label class="formulario__input">
                {{ formData.contentStyles.fontStyle || 'Sin información' }}
            </label>
        </div>
        <div class="formulario__campo">
            <label for="fontSizeSlider" class="formulario__label">Tamaño de Fuente</label>
            <label class="formulario__input">
                {{ formData.contentStyles.fontSize || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
            <label for="textColor" class="formulario__label">Color de Texto</label>
            <input type="color" v-model="formData.contentStyles.textColor" id="textColor" class="formulario__input" disabled/>
        </div>

        <div class="formulario__campo">
            <label for="textAlignment" class="formulario__label">Alineación del Texto</label>
            <label class="formulario__input">
                {{ formData.contentStyles.textAlignment || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
            <label for="comun" class="formulario__label">URL Imagen</label>
            <label class="formulario__input">
                {{ formData.image || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
            <label for="comun" class="formulario__label">Tipo de contenido</label>
            <label class="formulario__input">
                {{ formData.content_type || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__campo">
            <label for="comun" class="formulario__label">Order</label>
            <label class="formulario__input">
                {{ formData.order || 'Sin información' }}
            </label>
        </div>

        <div class="formulario__botones">
          <button
            @click="modal.handleClickModalSectionView()"
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
  width: 95%;
  text-align: left
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

.formulario__input {
  border: 1px solid var(--primary);
  margin-left: 0.5rem;
  text-align: left;
  border-radius: 5px;
  width: 97%;
  font-size: 0.9rem;
  padding: 0.3rem;
}
.formulario__textarea {
  border: 1px solid var(--primary);
  margin-left: 0.5rem;
  font-size: 0.9rem;
  width: 97%;
  height: 5rem;
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