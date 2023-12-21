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
      <div class="modal__encabezado">
        <h2 class="modal__titulo">
          Especie: <span>{{ speciesStore.especies[0].nom_comunes }}</span>
          <hr />
          <p class="modal__subtitulo">Datos del candidato</p>
        </h2>
      </div>
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
            </span>
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
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal"  v-if="formData.img_general" :src="getFullImageUrl(formData.img_general)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'list-ol']" /> <span class="font-bold"> Código especie: </span>
              <input type="number" class="w-80" v-model="formData.cod_especie" required/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'signature']" /> <span class="font-bold"> Nombre común: </span>
              <input type="text" class="w-80" v-model="formData.nom_comunes"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'signature']" /> <span class="font-bold"> Nombre científico: </span>
              <input type="text" class="w-80" v-model="formData.nombre_cientifico"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'signature']" /> <span class="font-bold"> Otros nombres comunes: </span>
              <input type="text" class="w-80" v-model="formData.otros_nombres"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fab', 'hashnode']" /> <span class="font-bold"> Sinonimos: </span>
              <input type="text" class="w-80" v-model="formData.sinonimos"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fab', 'pagelines']" /> <span class="font-bold"> Familia: </span>
              <input type="text" class="w-80" v-model="formData.familia"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'earth-americas']" /> <span class="font-bold"> Distribución: </span>
              <input type="text" class="w-80" v-model="formData.distribucion"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'teeth']" /> <span class="font-bold"> Habito: </span>
              <input type="text" class="w-80" v-model="formData.habito"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fab', 'envira']" /> <span class="font-bold"> Follaje: </span>
              <input type="text" class="w-80" v-model="formData.follaje"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'tree']" /> <span class="font-bold"> Forma copa: </span>
              <input type="text" class="w-80" v-model="formData.forma_copa"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'leaf']" /> <span class="font-bold"> Tipo de hoja: </span>
              <input type="text" class="w-80" v-model="formData.tipo_hoja"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'seedling']" /> <span class="font-bold"> Disposición de las hojas: </span>
              <input type="text" class="w-80" v-model="formData.disposicion_hojas"/>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fab', 'envira']" /> <span class="font-bold"> Información de las hojas: </span>
              <textarea class="w-full auto-resize-textarea" v-model="formData.hojas"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_leafs" :src="getFullImageUrl(formData.img_leafs)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'spa']" /> <span class="font-bold"> Información de la flor: </span>
              <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.flor"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_flowers" :src="getFullImageUrl(formData.img_flowers)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fab', 'apple']" /> <span class="font-bold"> Información de los frutos: </span>
              <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.frutos"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_fruits" :src="getFullImageUrl(formData.img_fruits)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'seedling']" /> <span class="font-bold"> Información de las semillas: </span>
              <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.semillas"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_seeds" :src="getFullImageUrl(formData.img_seeds)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'ticket-simple']" /> <span class="font-bold"> Información del tallo: </span>
              <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.tallo"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_stems" :src="getFullImageUrl(formData.img_stems)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
              <font-awesome-icon :icon="['fas', 'mound']" /> <span class="font-bold"> Información de la raíz: </span>
              <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.raiz"></textarea>
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_landscape_one" :src="getFullImageUrl(formData.img_landscape_one)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_landscape_two" :src="getFullImageUrl(formData.img_landscape_two)" >
            </DialogTitle>
            <DialogTitle as="h3" class="text-gray-900 text-lg my-5 img__specie__dg">
              <img class="img__specie__modal" v-if="formData.img_landscape_three" :src="getFullImageUrl(formData.img_landscape_three)" >
            </DialogTitle>
            <button
              type="submit"
              class="shadow p-1 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
            >
              Actualizar
            </button>
          </form>
          <hr />
      
        </div>
      </div>
      <div class="mt-8 sm:mt-6 flex justify-between gap-4">
        <button
          type="button"
          class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
          @click="modal.handleClickModalForestSpecieUpdate()"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .auto-resize-textarea {
    overflow: hidden;
  }

  .img__specie__modal {
    border-radius: 15px;
    max-height: 200px;
    width: auto;
  }

  .img__specie__dg {
    text-align: center;
    vertical-align: middle;
  }
</style>

