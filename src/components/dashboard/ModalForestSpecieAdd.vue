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
  imageInputLandScapeThree: ""
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
  console.log('fieldName: ',event, fieldName)
  let imageInput;

  // Selecciona el campo de entrada de imagen según el nombre del campo
  switch (fieldName) {
    case 'imageInputGeneral':
      imageInput = imageInputGeneral.value;
      console.log('imageInputGeneral: ', imageInput)
      break;
    case 'imageInputLeaf':
      imageInput = imageInputLeaf.value;
      break;
    case 'imageInputFlower':
      imageInput = imageInputFlower.value;
      break;
    case 'imageInputFruit':
      imageInput = imageInputFruit.value;
      break;
    case 'imageInputSeed':
      imageInput = imageInputSeed.value;
      break;
    case 'imageInputStem':
      imageInput = imageInputStem.value;
      break;
    case 'imageInputLandScapeOne':
      imageInput = imageInputLandScapeOne.value;
      break;
    case 'imageInputLandScapeTwo':
      imageInput = imageInputLandScapeTwo.value;
      break;
    case 'imageInputLandScapeThree':
      imageInput = imageInputLandScapeThree.value;
      break;
  }

  if (imageInput) {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      formData.value[fieldName] = e.target.result; // Almacena la imagen en el campo correspondiente del formulario
    };

    reader.readAsDataURL(file);
  }
};

async function forestSpecieAdd() {
  speciesStore.addForestSpecie(formData.value);
  console.log('formData: ', formData.value)
  modal.handleClickModalForestSpecieAdd()
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
      raiz: selectedForestSpecie.raiz || ""
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
  <TransitionRoot as="template" :show="modal.modalForestSpecieAdd">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modal.handleClickModalForestSpecieAdd()"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-2 pt-2 pb-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
            >
              <div>
                <div>
                  <!-- llenar la info dinámica -->

                  <div class="flex flex-wrap justify-center gap-6 mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-16 h-16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    
                  </div>

                  <DialogTitle
                    as="h4"
                    class="text-gray-900 text-lg text-center font-extrabold"
                  >

                  </DialogTitle>
                  <DialogTitle
                    as="h4"
                    class="text-gray-900 text-lg text-center font-extrabold mb-5"
                  >
                  </DialogTitle>
                  <hr />
                  <form @submit.prevent="forestSpecieAdd">
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
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen especie: </span><br>
                    <input type="file" ref="imageInputGeneral" accept="image/*" @change="e => handleImageUpload(e, 'imageInputGeneral')" />
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
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <label for="imageInputLeaf" class="file-input-label">
                      <img src="ruta-a-tu-icono.png" alt="Cargar imagen" class="upload-icon">
                      <span class="font-bold">Imagen de las hojas</span>
                    </label>
                    <input type="file" id="imageInputLeaf" ref="imageInputLeaf" accept="image/*" @change="handleImageUpload" style="display: none;" />
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'spa']" /> <span class="font-bold"> Información de la flor: </span>
                    <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.flor"></textarea>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen de las flores: </span><br>
                    <input type="file" ref="imageInputFlower" accept="image/*" @change="handleImageUpload(e, 'imageInputFlower')" />
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fab', 'apple']" /> <span class="font-bold"> Información de los frutos: </span>
                    <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.frutos"></textarea>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen de los frutos: </span><br>
                    <input type="file" ref="imageInputFruit" accept="image/*" @change="handleImageUpload(e, 'imageInputFruit')" />
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'seedling']" /> <span class="font-bold"> Información de las semillas: </span>
                    <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.semillas"></textarea>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen de las semillas: </span><br>
                    <input type="file" ref="imageInputSeed" accept="image/*" @change="handleImageUpload(e, 'imageInputSeed')" />
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'ticket-simple']" /> <span class="font-bold"> Información del tallo: </span>
                    <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.tallo"></textarea>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen del tallo: </span><br>
                    <input type="file" ref="imageInputStem" accept="image/*" @change="handleImageUpload(e, 'imageInputStem')" />
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'mound']" /> <span class="font-bold"> Información de la raíz: </span>
                    <textarea type="text" class="w-full auto-resize-textarea" v-model="formData.raiz"></textarea>
                  </DialogTitle>

                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen paisajística[1]: </span><br>
                    <input type="file" ref="imageInputLandScapeOne" accept="image/*" @change="handleImageUpload(e, 'imageInputLandScapeOne')" />
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen paisajística[2]: </span><br>
                    <input type="file" ref="imageInputLandScapeTwo" accept="image/*" @change="handleImageUpload(e, 'imageInputLandScapeTwo')" />
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'image']" /> <span class="font-bold"> Imagen paisajística[3]: </span><br>
                    <input type="file" ref="imageInputLandScapeThree" accept="image/*" @change="handleImageUpload(e, 'imageInputLandScapeThree')" />
                  </DialogTitle>

                  <button
                    type="submit"
                    class="shadow p-1 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
                  >
                    Guardar
                  </button>
                </form>
                  <hr />
              
                </div>
              </div>
              <div class="mt-8 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                  @click="modal.handleClickModalForestSpecieAdd()"
                >
                  Cerrar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style>
.auto-resize-textarea {
  overflow: hidden;
}

.file-input-label {
  display: inline-block;
  background-color: #0074d9;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.file-input-label:hover {
  background-color: #0056b3;
}

.upload-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 10px;
}

/* Ocultar el campo de entrada de archivo nativo */
input[type="file"] {
  display: none;
}

</style>
