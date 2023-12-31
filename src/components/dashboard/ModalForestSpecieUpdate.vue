<script setup>
import { watch, onMounted, ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { getFullImageUrl } from "@/helpers";

const modal = useModalStore();
const speciesStore = useEspeciesStore();

const formData = ref({
  cod_especie: "",
  nom_comunes: "",
  otros_nombres: "",
  nombre_cientifico: "",
  img_general: "",
  sinonimos: "",
  familia: "",
  distribucion: "",
  habito: "",
  follaje: "",
  forma_copa: "",
  tipo_hoja: "",
  disposicion_hojas: "",
  hojas: "",
  img_leafs: "",
  flor: "",
  img_flowers: "",
  frutos: "",
  img_fruits: "",
  semillas: "",
  img_seeds: "",
  tallo: "",
  img_stems: "",
  raiz: "",
  img_landscape_one: "",
  img_landscape_two: "",
  img_landscape_three: "",
});

async function forestSpecieUpdate() {
  speciesStore.updateForestSpecie(
    speciesStore.specieSelected[0].ShortcutID,
    formData.value
  );
  modal.handleClickModalForestSpecieUpdate();
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
      img_general: selectedForestSpecie.img_general || "",
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
      img_leafs: selectedForestSpecie.img_leafs || "",
      flor: selectedForestSpecie.flor || "",
      img_flowers: selectedForestSpecie.img_flowers || "",
      frutos: selectedForestSpecie.frutos || "",
      img_fruits: selectedForestSpecie.img_fruits || "",
      semillas: selectedForestSpecie.semillas || "",
      img_seeds: selectedForestSpecie.img_seeds || "",
      tallo: selectedForestSpecie.tallo || "",
      img_stems: selectedForestSpecie.img_stems || "",
      raiz: selectedForestSpecie.raiz || "",
      img_landscape_one: selectedForestSpecie.img_landscape_one || "",
      img_landscape_two: selectedForestSpecie.img_landscape_two || "",
      img_landscape_three: selectedForestSpecie.img_landscape_three || "",
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

//conocer el tamaño de una imagen
const height = ref(0);
const handleImageLoad = (event) => {
  height.value = event.target.height;
  return console.log(height.value);
};
</script>

<template>
  <div class="modal" v-if="modal.modalForestSpecieUpdate">
    <div class="modal__contenido">
      <div class="modal__encabezado">
        <div class="modal__imagen">
          <img
            v-if="formData.img_general"
            :src="getFullImageUrl(formData.img_general)"
            alt="imagen___especie"
          />
        </div>
        <h4 class="modal__titulo">
          {{ speciesStore.especies[0].nom_comunes }}
        </h4>
        <p class="modal__titulo">
          {{ speciesStore.especies[0].nombre_cientifico }}
        </p>

        <p class="modal__titulo">
          Código especie:
          <span class="card__dato">
            {{ speciesStore.especies[0].cod_especie }}
          </span>
        </p>
      </div>
      <hr />

      <form @submit.prevent="forestSpecieUpdate" class="formulario">
        <p class="formulario__titulo texto__sara">
          Despligue la sección a editar
        </p>
        <!-- lista de informacion general -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('generales')">
              Información general
            </h2>
            <div id="generales" class="detalles">
              <div class="formulario__campo">
                <label for="comun" class="formulario__label"
                  >Nombre Común:</label
                >
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
                <label for="codigo" class="formulario__label"
                  >Código especie:</label
                >
                <input
                  v-model="formData.cod_especie"
                  id="codigo"
                  type="text"
                  class="formulario__input"
                  required
                />
              </div>
              <div class="formulario__campo">
                <label for="otros" class="formulario__label"
                  >Otros Nombres:</label
                >
                <input
                  v-model="formData.otros_nombres"
                  id="otros"
                  type="text"
                  class="formulario__input"
                />
              </div>
              <div class="formulario__campo">
                <label for="sinonimos" class="formulario__label"
                  >Sinónimos:</label
                >
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea
                  v-model="formData.sinonimos"
                  id="sinonimos"
                  type="text"
                  class="formulario__textarea"
                ></textarea>
              </div>
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
            </div>
          </li>
        </ul>
        <!-- lista de atributos -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('atributos')">
              Atributos
            </h2>
            <div id="atributos" class="detalles">
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
                <label for="forma-copa" class="formulario__label"
                  >Forma copa:</label
                >
                <input
                  v-model="formData.forma_copa"
                  id="foma-copa"
                  type="text"
                  class="formulario__input"
                />
              </div>
              <div class="formulario__campo">
                <label for="tipo-hoja" class="formulario__label"
                  >Tipo de hoja:</label
                >
                <input
                  v-model="formData.tipo_hoja"
                  id="tipo-hoja"
                  type="text"
                  class="formulario__input"
                />
              </div>
              <div class="formulario__campo">
                <label for="disposicion-hojas" class="formulario__label"
                  >Disposición de las hojas:</label
                >
                <input
                  v-model="formData.disposicion_hojas"
                  id="disposicion-hojas"
                  type="text"
                  class="formulario__input"
                />
              </div>
            </div>
          </li>
        </ul>
        <!-- lista de características -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('caracteristicas')">
              Características
            </h2>
            <div id="caracteristicas" class="detalles">
              <!-- info hojas -->
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
              <!-- info flor -->
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
              <!-- info frutos -->
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
              <!-- info semillas -->
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
              <!-- info tallo -->
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
              <!-- info raiz -->
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
            </div>
          </li>
        </ul>
        <!-- lista de galería -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('galeria')">
              Ver Galeria
            </h2>
            <div id="galeria" class="detalles">
              <div class="galeria__grid">
                <div
                  :class="{
                    img__vertical: height > 420,
                  }"
                  class="galeria__imagen"
                  v-if="formData.img_general"
                >
                  <img
                    @load="handleImageLoad"
                    :src="getFullImageUrl(formData.img_general)"
                    alt="imagen especie"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_leafs">
                  <img
                    :src="getFullImageUrl(formData.img_leafs)"
                    alt="imagen hojas"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_flowers">
                  <img
                    :src="getFullImageUrl(formData.img_flowers)"
                    alt="imagen flores"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_fruits">
                  <img
                    :src="getFullImageUrl(formData.img_fruits)"
                    alt="imagen frutos"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_seeds">
                  <img
                    :src="getFullImageUrl(formData.img_seeds)"
                    alt="imagen semillas"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_stems">
                  <img
                    :src="getFullImageUrl(formData.img_stems)"
                    alt="imagen tallo"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_landscape_one">
                  <img
                    :src="getFullImageUrl(formData.img_landscape_one)"
                    alt="imagen panoramica 1"
                  />
                </div>
                <div class="galeria__imagen" v-if="formData.img_landscape_two">
                  <img
                    :src="getFullImageUrl(formData.img_landscape_two)"
                    alt="imagen panoramica 2"
                  />
                </div>
                <div
                  class="galeria__imagen"
                  v-if="formData.img_landscape_three"
                >
                  <img
                    :src="getFullImageUrl(formData.img_landscape_three)"
                    alt="imagen panoramica 3"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="formulario__botones">
          <button type="submit" class="formulario__boton">Actualizar</button>
          <button
          type="button"
          class="formulario__boton formulario__boton--cerrar"
          @click="modal.handleClickModalForestSpecieUpdate()"
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
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
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
.modal__imagen img{
  width: 15rem;
  max-height: 17rem;
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
.formulario__boton:hover{
  background-color: var(--primary-hover);
}
.formulario__boton--cerrar:hover{
  background-color: var(--secondary-hover);
}
.alerta {
  background-color: var(--rojo);
}
/* card */
.card__titulo {
  font-size: 1rem;
  border: 1px solid var(--secondary);
  padding: 0.3rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  margin: 0.4rem 0;
  transition: background-color 0.3s ease;
}
.card__titulo:hover {
  background-color: var(--secondary);
  color: var(--blanco);
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

.galeria__grid {
  display: grid;
}
.galeria__imagen {
  width: 18rem;
}
.img__vertical{
  width: 18rem;
  height: 15rem;
  max-height: 15rem;
}
@media (min-width:768px){
  .galeria__grid{
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2,1fr);
    gap: 1rem;
  }
  .img__vertical{
    grid-column: 1/2;
    grid-row: 1/4;
  }
}
</style>

