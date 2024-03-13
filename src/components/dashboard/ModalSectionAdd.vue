<script setup>
import { watch, onMounted, ref } from "vue";

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
  fontStyle: "",
  fontSize: "",
  textColor: "#000000",
  textAlignment: "",
});

async function sectionAdd() {

    const styles = {
        fontStyle: formData.value.fontStyle,
        fontSize: formData.value.fontSize + 'px', // Asegúrate de agregar 'px' para tamaños
        color: formData.value.textColor,
        textAlign: formData.value.textAlignment,
        // ...otros estilos...
    };

    const dataToSend = {
        page_id: formData.value.page_id,
        section_title: formData.value.section_title,
        content: formData.value.content,
        image: formData.value.image,
        order: formData.value.order,
        content_type: formData.value.content_type,
        styles: styles // Envía esto como una cadena JSON al backend
    };

    pageStore.addSection(dataToSend);
    modal.handleClickModalSectionAdd();
}
</script>

<template>
     <div class="modal" v-if="modal.modalSectionAdd">
    <div class="modal__contenido">
      <!-- modal encabezado -->
      <div class="modal__encabezado">
        <div class="modal__imagen">
          <img src="/icons/icon-design-page.png" alt="modal-icono" />
        </div>
        <h4 class="modal__titulo">Crear nueva página</h4>
      </div>
      <hr />
      <!-- modal contenido -->
      <form @submit.prevent="sectionAdd" class="formulario">
        <div class="formulario__campo">
          <label for="codigo" class="formulario__label">Vista</label>
          <select v-model="formData.router" id="fontStyle" class="formulario__input">
                <option value="" selected disabled>Seleccionar una opción...</option>
                <option value="home">Inicio</option>
                <option value="family">Familias</option>
                <option value="glosary">Glosario</option>
                <option value="aboutus">Acerca de nosotros</option>
            </select>
        </div>
        <div class="formulario__campo">
          <label for="comun" class="formulario__label">Título de la sección</label>
          <input
            v-model="formData.section_title"
            id="comun"
            type="text"
            class="formulario__input"
            required
          />
        </div>
        <div class="formulario__campo">
            <label for="fontStyle" class="formulario__label">Estilo de Fuente</label>
            <select v-model="formData.fontStyle" id="fontStyle" class="formulario__input">
                <option value="" selected disabled>Seleccionar una opción...</option>
                <option value="normal">Normal</option>
                <option value="italic">Cursiva</option>
                <option value="bold">Negrita</option>
            </select>
        </div>
        <div class="formulario__campo">
            <label for="fontSize" class="formulario__label">Tamaño de Fuente</label>
            <input type="number" v-model="formData.fontSize" id="fontSize" class="formulario__input" />
        </div>
        <div class="formulario__campo">
            <label for="textColor" class="formulario__label">Color de Texto</label>
            <input type="color" v-model="formData.textColor" id="textColor" class="formulario__input" />
        </div>

        <div class="formulario__campo">
            <label for="textAlignment" class="formulario__label">Alineación del Texto</label>
            <select v-model="formData.textAlignment" id="textAlignment" class="formulario__input">
                <option value="" selected disabled>Seleccionar una opción...</option>
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
                <option value="justify">Justificado</option>
            </select>
        </div>

        <div class="formulario__botones">
          <button type="submit" class="formulario__boton">Guardar</button>
          <button
            @click="modal.handleClickModalPageAdd()"
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