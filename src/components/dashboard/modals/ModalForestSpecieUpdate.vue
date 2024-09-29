<script setup>
import { watch, onMounted, ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { getFullImageUrl } from "@/helpers";

const modal = useModalStore();
const speciesStore = useEspeciesStore();

const formData = ref({
  code_specie: "",
  vernacularName: "",
  otherNames: "",
  scientificName: "",
  scientificNameAuthorship: "",
  kingdom: "",
  phylum: "",
  class: "",
  order: "",
  synonyms: "",
  family: "",
  genus: "",
  distribution: "",
  descriptionGeneral: "",
  habit: "",
  img_general: "",
  leaves: "",
  img_leafs: "",
  flowers: "",
  img_flowers: "",
  fruits: "",
  img_fruits: "",
  seeds: "",
  woodUses: "",
  nonTimberUsers: "",
  bloom: "",
  fructification: "",
  ecology: "",
  specificEpithet: "",
  infraspecificEpithet: "",
  taxonRank: "",
  taxon_key: "",
  img_seeds: "",
  img_stems: "",
  img_landscape_one: "",
  img_landscape_two: "",
  img_landscape_three: "",
});

async function forestSpecieUpdate() {
  speciesStore.updateForestSpecie(
    speciesStore.specieSelected[0].id,
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
  console.log('selectedForestSpecie ',selectedForestSpecie)
  if (selectedForestSpecie) {
    formData.value = {
      code_specie: selectedForestSpecie.code_specie || "",
      vernacularName: selectedForestSpecie.vernacularName || "",
      otherNames: selectedForestSpecie.otherNames || "",
      scientificName: selectedForestSpecie.scientificName || "",
      scientificNameAuthorship: selectedForestSpecie.scientificNameAuthorship || "",
      kingdom: selectedForestSpecie.kingdom || "",
      phylum: selectedForestSpecie.phylum || "",
      class: selectedForestSpecie.class || "",
      order: selectedForestSpecie.order || "",
      synonyms: selectedForestSpecie.synonyms || "",
      family: selectedForestSpecie.family || "",
      genus: selectedForestSpecie.genus || "",
      distribution: selectedForestSpecie.distribution || "",
      descriptionGeneral: selectedForestSpecie.descriptionGeneral || "",
      habit: selectedForestSpecie.habit || "",
      img_general: selectedForestSpecie.images[0].img_general || "",
      leaves: selectedForestSpecie.leaves || "",
      img_leafs: selectedForestSpecie.images[0].img_leafs || "",
      flowers: selectedForestSpecie.flowers || "",
      img_flowers: selectedForestSpecie.images[0].img_flowers || "",
      fruits: selectedForestSpecie.fruits || "",
      img_fruits: selectedForestSpecie.images[0].img_fruits || "",
      seeds: selectedForestSpecie.seeds || "",
      woodUses: selectedForestSpecie.woodUses || "",
      nonTimberUsers: selectedForestSpecie.nonTimberUsers || "",
      bloom: selectedForestSpecie.bloom || "",
      fructification: selectedForestSpecie.fructification || "",
      ecology: selectedForestSpecie.ecology || "",
      specificEpithet: selectedForestSpecie.specificEpithet || "",
      infraspecificEpithet: selectedForestSpecie.infraspecificEpithet || "",
      taxonRank: selectedForestSpecie.taxonRank || "",
      taxon_key: selectedForestSpecie.taxon_key || "",
      img_seeds: selectedForestSpecie.img_seeds || "",
      img_stems: selectedForestSpecie.img_stems || "",
      img_landscape_one: selectedForestSpecie.images[0].img_landscape_one || "",
      img_landscape_two: selectedForestSpecie.images[0].img_landscape_two || "",
      img_landscape_three: selectedForestSpecie.images[0].img_landscape_three || "",
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
          <img v-if="formData.img_general" :src="getFullImageUrl(formData.img_general)" alt="imagen___especie" />
        </div>
        <h4 class="modal__titulo">
          {{ speciesStore.species[0].vernacularName }}
        </h4>
        <p class="modal__titulo">
          {{ speciesStore.species[0].scientificName + " " + speciesStore.species[0].scientificNameAuthorship }}
        </p>

        <p class="modal__titulo">
          Código especie:
          <span class="card__dato">
            {{ speciesStore.species[0].code_specie }}
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
                <label for="codigo" class="formulario__label">Código especie:</label>
                <input v-model="formData.code_specie" id="codigo" type="text" class="formulario__input" required />
              </div>
              <div class="formulario__campo">
                <label for="comun" class="formulario__label">Nombre Común:</label>
                <input v-model="formData.vernacularName" id="comun" type="text" class="formulario__input" required />
              </div>
              <div class="formulario__campo">
                <label for="cientifico" class="formulario__label">Nombre científico:</label>
                <input v-model="formData.scientificName" id="cientifico" type="text" class="formulario__input"
                  required />
              </div>
              <div class="formulario__campo">
                <label for="autor_cientifico" class="formulario__label">Autor Nombre científico:</label>
                <input v-model="formData.scientificNameAuthorship" id="autor_cientifico" type="text" class="formulario__input"
                  required />
              </div>
              <div class="formulario__campo">
                <label for="otros" class="formulario__label">Otros Nombres:</label>
                <input v-model="formData.otherNames" id="otros" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="sinonimos" class="formulario__label">Sinónimos:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.synonyms" id="sinonimos" type="text"
                  class="formulario__textarea"></textarea>
              </div>
              <div class="formulario__campo">
                <label for="family" class="formulario__label">Familia:</label>
                <input v-model="formData.family" id="family" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="description_general" class="formulario__label">Descripción General:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.descriptionGeneral" id="description_general" type="text"
                  class="formulario__textarea"></textarea>
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
                <label for="kingdom" class="formulario__label">Reino:</label>
                <input v-model="formData.kingdom" id="kingdom" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="phylum" class="formulario__label">Filo:</label>
                <input v-model="formData.phylum" id="phylum" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="class" class="formulario__label">Clase:</label>
                <input v-model="formData.class" id="class" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="order" class="formulario__label">Orden:</label>
                <input v-model="formData.order" id="order" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="genus" class="formulario__label">Genero:</label>
                <input v-model="formData.genus" id="genus" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="distribucion" class="formulario__label">Distribución:</label>
                <input v-model="formData.distribution" id="distribucion" type="text" class="formulario__input" />
              </div>
              <div class="formulario__campo">
                <label for="habito" class="formulario__label">Hábito:</label>
                <input v-model="formData.habit" id="habito" type="text" class="formulario__input" />
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
                <label for="hojas" class="formulario__label">Información de las hojas:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.leaves" id="hojas" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info flor -->
              <div class="formulario__campo">
                <label for="flor" class="formulario__label">Información de la flor:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.flowers" id="flor" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info frutos -->
              <div class="formulario__campo">
                <label for="frutos" class="formulario__label">Información de los frutos:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.fruits" id="frutos" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info semillas -->
              <div class="formulario__campo">
                <label for="semillas" class="formulario__label">Información de las semillas:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.seeds" id="semillas" type="text" class="formulario__textarea"></textarea>
              </div>
            </div>
          </li>
        </ul>

        <!-- lista de otros datos -->
        <ul class="lista">
          <li class="opciones">
            <h2 class="card__titulo" @click="toggleDetalles('otros-datos')">
              Otros datos
            </h2>
            <div id="otros-datos" class="detalles">
              <!-- info usos maderables -->
              <div class="formulario__campo">
                <label for="woodUses" class="formulario__label">Usos maderables:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.woodUses" id="woodUses" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info usos no maderables -->
              <div class="formulario__campo">
                <label for="nonTimberUsers" class="formulario__label">Usos no maderables:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.nonTimberUsers" id="nonTimberUsers" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info floración -->
              <div class="formulario__campo">
                <label for="bloom" class="formulario__label">Floración:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.bloom" id="bloom" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info fructificación -->
              <div class="formulario__campo">
                <label for="fructification" class="formulario__label">Fructificación:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.fructification" id="fructification" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info ecologia -->
              <div class="formulario__campo">
                <label for="ecology" class="formulario__label">Ecologia:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.ecology" id="ecology" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info epiteto especifico -->
              <div class="formulario__campo">
                <label for="specificEpithet" class="formulario__label">Epíteto específico:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.specificEpithet" id="specificEpithet" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info epiteto infragenerico -->
              <div class="formulario__campo">
                <label for="infraspecificEpithet" class="formulario__label">Epíteto infragenérico:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.infraspecificEpithet" id="infraspecificEpithet" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info categoria del taxon -->
              <div class="formulario__campo">
                <label for="taxonRank" class="formulario__label">Categoría del taxón:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.taxonRank" id="taxonRank" type="text" class="formulario__textarea"></textarea>
              </div>
              <!-- info id gbif -->
              <div class="formulario__campo">
                <label for="taxon_key" class="formulario__label">Identificador GBIF:</label>
              </div>
              <div class="formulario__campo fomulario__campo--textarea">
                <textarea v-model="formData.taxon_key" id="taxon_key" type="text" class="formulario__textarea"></textarea>
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
                <div :class="{
    img__vertical: height > 420,
  }" class="galeria__imagen" v-if="formData.img_general">
                  <img @load="handleImageLoad" :src="getFullImageUrl(formData.img_general)" alt="imagen especie" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_leafs">
                  <img :src="getFullImageUrl(formData.img_leafs)" alt="imagen hojas" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_flowers">
                  <img :src="getFullImageUrl(formData.img_flowers)" alt="imagen flores" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_fruits">
                  <img :src="getFullImageUrl(formData.img_fruits)" alt="imagen frutos" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_seeds">
                  <img :src="getFullImageUrl(formData.img_seeds)" alt="imagen semillas" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_stems">
                  <img :src="getFullImageUrl(formData.img_stems)" alt="imagen tallo" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_landscape_one">
                  <img :src="getFullImageUrl(formData.img_landscape_one)" alt="imagen panoramica 1" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_landscape_two">
                  <img :src="getFullImageUrl(formData.img_landscape_two)" alt="imagen panoramica 2" />
                </div>
                <div class="galeria__imagen" v-if="formData.img_landscape_three">
                  <img :src="getFullImageUrl(formData.img_landscape_three)" alt="imagen panoramica 3" />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="formulario__botones">
          <button type="submit" class="button__save-specie"><svg style="width: 2rem;"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M7 19V13H17V19H19V7.82843L16.1716 5H5V19H7ZM4 3H17L21 7V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM9 15V19H15V15H9Z">
              </path>
            </svg></button>


          <div class="button__modal--close" @click="modal.handleClickModalForestSpecieUpdate()">
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

.modal__imagen img {
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
  justify-content: center;
  align-items: center;
  margin-top: 0rem;
  transition: all .3s ease-in-out;
}

.button__save-specie {
  background: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: .5rem;
  transition: all .3s ease-in-out;
  margin-top: 2rem;
}

.button__save-specie:hover {
  background: var(--primary);
  color: var(--blanco);
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
  max-height: 9500px;
  /* Ajusta la altura máxima según tus necesidades */
  transition: max-height 0.3s ease-in-out;
}

.galeria__grid {
  display: grid;
}

.galeria__imagen {
  width: 18rem;
}

.img__vertical {
  width: 18rem;
  height: 15rem;
  max-height: 15rem;
}

@media (min-width:768px) {
  .galeria__grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
  }

  .img__vertical {
    grid-column: 1/2;
    grid-row: 1/4;
  }
}
</style>