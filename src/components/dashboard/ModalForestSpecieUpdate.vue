<script setup>
import { watch, onMounted, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import api from '../../api/axios';

const modal = useModalStore();
const speciesStore = useEspeciesStore();

const getFullImageUrl = (relativePath) => {
  return `${api.defaults.baseURL}/${relativePath.replace(/\\/g, '/')}`;
};

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
  img_landscape_three: ""
});

async function forestSpecieUpdate() {
  speciesStore.updateForestSpecie(speciesStore.specieSelected[0].ShortcutID, formData.value);
  modal.handleClickModalForestSpecieUpdate()
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
      img_landscape_three: selectedForestSpecie.img_landscape_three || ""
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

watch(() => speciesStore.specieSelected, () => {
      initializeFormData();
    });
</script>

<template>
  <div class="modal" v-if="modal.modalForestSpecieUpdate">
    <div class="modal__contenido">
      <!-- <div class="modal__encabezado">
        <h2 class="modal__titulo">
          Especie: <span>{{ speciesStore.especies[0].nom_comunes }}</span>
          <hr />
          <p class="modal__subtitulo">Datos del candidato</p>
        </h2>
      </div> -->
      <!-- <Dialog
        as="div"
        class="relative z-10"
        @close="modal.handleClickModalUserUpdate()"
      > -->
      <div class="modal__flex">
        <div class="card">
          <p class="card__info">
            Nombre común:
            <span class="card__dato">
              {{ speciesStore.especies[0].nom_comunes }}
            </span><br>
            Nombre científico:
            <span class="card__dato">
              {{ speciesStore.especies[0].nombre_cientifico }}
            </span>           
          </p>

          <p class="card__info">
            Código especie:
            <span class="card__dato">
              {{ speciesStore.especies[0].cod_especie }}
            </span>
          </p>            
          <hr />

          <form @submit.prevent="forestSpecieUpdate">
            <div class="card__info_imgGeneral">
              <img class="img__specie__modal"  v-if="formData.img_general" :src="getFullImageUrl(formData.img_general)">
            </div>

            <div class="columns">
              <div class="column">
                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'list-ol']" /> 
                  <span class="card__dato"> Código especie: </span>
                  <input type="number" v-model="formData.cod_especie" required/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'signature']" /> 
                  <span class="card__dato"> Nombre común: </span>
                  <input type="text" v-model="formData.nom_comunes"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'signature']" /> 
                  <span class="card__dato"> Nombre científico: </span>
                  <input type="text" v-model="formData.nombre_cientifico"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'signature']" /> 
                  <span class="card__dato"> Otros nombres comunes: </span>
                  <input type="text" v-model="formData.otros_nombres"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fab', 'hashnode']" /> 
                  <span class="card__dato"> Sinonimos: </span>
                  <input type="text" v-model="formData.sinonimos"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fab', 'pagelines']" /> 
                  <span class="card__dato"> Familia: </span>
                  <input type="text" v-model="formData.familia"/>
                </p>
              </div>

              <div class="column">
                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'earth-americas']" /> 
                  <span class="card__dato"> Distribución: </span>
                  <input type="text" v-model="formData.distribucion"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'teeth']" /> 
                  <span class="card__dato"> Habito: </span>
                  <input type="text" v-model="formData.habito"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fab', 'envira']" /> 
                  <span class="card__dato"> Follaje: </span>
                  <input type="text" v-model="formData.follaje"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'tree']" /> 
                  <span class="card__dato"> Forma copa: </span>
                  <input type="text" v-model="formData.forma_copa"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'leaf']" /> 
                  <span class="card__dato"> Tipo de hoja: </span>
                  <input type="text" v-model="formData.tipo_hoja"/>
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'seedling']" /> 
                  <span class="card__dato"> Disposición de las hojas: </span>
                  <input type="text" v-model="formData.disposicion_hojas"/>
                </p>
              </div>                
            </div>

            <div class="columns_imgText">
              <div class="column_imgText">
                <p class="card__info">
                  <font-awesome-icon :icon="['fab', 'envira']" /> 
                  <span class="card__dato"> Información de las hojas: </span><br>
                  <textarea class="text__area" v-model="formData.hojas"></textarea>
                </p>

                <p class="card__info">
                  <img class="img__specie__modal" v-if="formData.img_leafs" :src="getFullImageUrl(formData.img_leafs)" >
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'spa']" /> 
                  <span class="card__dato"> Información de la flor: </span><br>
                  <textarea class="text__area" type="text" v-model="formData.flor"></textarea>
                </p>

                <p class="card__info">
                  <img class="img__specie__modal" v-if="formData.img_flowers" :src="getFullImageUrl(formData.img_flowers)" >
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fab', 'apple']" /> 
                  <span class="card__dato"> Información de los frutos: </span><br>
                  <textarea class="text__area" type="text" v-model="formData.frutos"></textarea>
                </p>

                <p class="card__info">
                  <img class="img__specie__modal" v-if="formData.img_fruits" :src="getFullImageUrl(formData.img_fruits)" >
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'seedling']" /> 
                  <span class="card__dato"> Información de las semillas: </span><br>
                  <textarea class="text__area" type="text" v-model="formData.semillas"></textarea>
                </p>

                <p class="card__info">
                  <img class="img__specie__modal" v-if="formData.img_seeds" :src="getFullImageUrl(formData.img_seeds)" >
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'ticket-simple']" /> 
                  <span class="card__dato"> Información del tallo: </span><br>
                  <textarea class="text__area" type="text" v-model="formData.tallo"></textarea>
                </p>

                <p class="card__info">
                  <img class="img__specie__modal" v-if="formData.img_stems" :src="getFullImageUrl(formData.img_stems)" >
                </p>

                <p class="card__info">
                  <font-awesome-icon :icon="['fas', 'mound']" /> 
                  <span class="card__dato"> Información de la raíz: </span><br>
                  <textarea class="text__area" type="text" v-model="formData.raiz"></textarea>
                </p>
              </div>
            </div>

            <p class="card__info">
              <img class="img__specie__modal" v-if="formData.img_landscape_one" :src="getFullImageUrl(formData.img_landscape_one)" >
            </p>

            <p class="card__info">
              <img class="img__specie__modal" v-if="formData.img_landscape_two" :src="getFullImageUrl(formData.img_landscape_two)" >
            </p>

            <p class="card__info">
              <img class="img__specie__modal" v-if="formData.img_landscape_three" :src="getFullImageUrl(formData.img_landscape_three)" >
            </p>

            <button
              type="submit"
              class="modal__boton"
            >
              Actualizar
            </button>
          </form>
          <hr />      
        </div>
      </div>

      <div class="modal__botones">
        <button
          type="button"
          class="modal__boton"
          @click="modal.handleClickModalForestSpecieUpdate()"
        >
          Cerrar
        </button>
      </div>
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
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 4rem;
}
@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 30%;
  }
}
.modal__titulo {
  font-size: 1rem;
  margin: 0 auto;
  padding: 0;
}
.modal__subtitulo {
  font-size: 1rem;
  margin: 0 auto;
}

.modal__flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal__boton {
  font-weight: 700;
  color: var(--blanco);
  background-color: var(--secondary);
  width: 95%;
  border-radius: 5px;
  margin-top: 2rem;
  padding: 0.4rem;
  transition: background-color 0.3s ease;
}
.modal__boton:hover {
  background-color: var(--secondary-hover);
}
/* card modal */
.card {
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.card__info {
  font-size: 0.8rem;
  margin: 0.2rem;
  padding: 0;
  break-inside: avoid;
}

.card__dato {
  font-weight: 700;
}
.card__dato--resultado {
  color: var(--primary);
}
.card:first-of-type {
  margin-top: 2rem;
}

.img__specie__dg {
  text-align: center;
  vertical-align: middle;
}

/* Estilos para columnas */
.columns {
  display: flex;
  gap: 20px; /* Espacio entre las columnas */
  justify-content: left;
  align-items: left;
}

.column {
  flex: 1; /* Ocupar el espacio disponible en la columna */
}

/* Estilos para alinear el texto a la izquierda */
.column .card__info {
  text-align: left;
}

.card__info_imgGeneral {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Si quieres aplicar bordes o ajustes adicionales al contenedor de la imagen, puedes hacerlo aquí */
}

.img__specie__modal {
  border-radius: 15px;
  max-height: 200px;
  width: auto;
  /* Asegúrate de que la imagen no exceda los límites del contenedor */
  object-fit: contain; /* o object-fit: cover; dependiendo del comportamiento que desees */
  margin-top: 10px;
  margin-bottom: 10px;
  display: block; 
}

.columns_imgText {
  column-count: 2; /* Dividir en dos columnas */
  column-gap: 10px; /* Espacio entre las columnas, puedes ajustarlo según tu diseño */
}

.column_imgText {
  display: inline-block; /* Garantiza que las columnas ocupen solo el espacio necesario */
  width: 100%; /* Ajusta el ancho según tu diseño */
}

.text__area {
  width: 16rem; /* Ancho máximo del textarea */
  height: auto; /* Altura automática según el contenido */
  overflow: hidden; /* Oculta el contenido que excede el tamaño del textarea */
}

</style>

