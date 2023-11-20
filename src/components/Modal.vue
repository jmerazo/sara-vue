<script setup>
import {reactive, ref} from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {useModalStore} from '../stores/modal'
import { useEspeciesStore } from '../stores/species';
import { useConsultaStore } from '../stores/consulta';



const modal = useModalStore()
const especies = useEspeciesStore()
const consulta = useConsultaStore()

const imgDefault = ref('https://static.vecteezy.com/system/resources/previews/000/527/023/non_2x/tree-with-roots-vector.jpg')

const imagenModal = ref({
    imgEspecie:'https://static.vecteezy.com/system/resources/previews/000/527/023/non_2x/tree-with-roots-vector.jpg',
    imgHojas:'https://inaturalist-open-data.s3.amazonaws.com/photos/24715/large.jpg',
    imgTallo:'https://www.researchgate.net/profile/Gerardo-Robledo/publication/274314363/figure/fig1/AS:669424336007177@1536614607961/Figura-3-Tejidos-que-constituyen-el-tronco-de-un-arbol-corte-transversal-En-el-centro.jpg',
    imgFlores:'https://img.freepik.com/fotos-premium/flores-amarillas-arbol-hoja-perenne-cassia-isla_136404-734.jpg',
    imgFrutos:'https://img.freepik.com/fotos-premium/fruta-granada-madura-colgando-jardin-espacio-copiar_150101-4103.jpg',
    sinImagen: '/img/sin_imagen.jpg'
})

const cambiarImagenModal = (nuevaImagen)=>{
  if(nuevaImagen){
    imagenModal.value.imgEspecie = nuevaImagen
  }else{
    imagenModal.value.imgEspecie = imagenModal.value.sinImagen
  }
}

const consultar = (nombre_comun)=>{
  consulta.consulta.categoria = 'Nombre Común'
  consulta.consulta.vrBuscar = nombre_comun
  consulta.mostrarConsulta()
}
</script>

<template>
    <TransitionRoot as="template" :show="modal.modal" >
      <Dialog as="div" class="relative z-10" @close="modal.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-2 pt-2 pb-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 " >
                <div>
                  <div >
                    <!-- llenar la info dinámica -->
                    
                    <div class="flex flex-wrap justify-center gap-6 mt-3">

                      <img @click="cambiarImagenModal(imagenModal.imgHojas)" class="hover:scale-110 transition-transform hover:rotate-1 w-11 h-11"  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-leaves-plants-flaticons-lineal-color-flat-icons-2.png" alt="external-leaves-plants-flaticons-lineal-color-flat-icons-2"/>
                      <img @click="cambiarImagenModal(imagenModal.imgTallo)" class="hover:scale-110 transition-transform hover:rotate-1 w-11 h-11"  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-stem-plants-flaticons-lineal-color-flat-icons-2.png" alt="external-stem-plants-flaticons-lineal-color-flat-icons-2"/>
                      <img @click="cambiarImagenModal(imagenModal.imgFlores)" class="hover:scale-110 transition-transform hover:rotate-1 w-11 h-11"  src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons.png" alt="external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons"/>
                      <img @click="cambiarImagenModal(imagenModal.imgFrutos)" class="hover:scale-110 transition-transform hover:rotate-1 w-11 h-11" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-fruits-farm-flaticons-lineal-color-flat-icons-2.png" alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"/>

                    </div>

                    <img 
                      :src="imagenModal.imgEspecie" 
                      :alt="'imagen de ' + especies.especies.nom_comunes"
                      class="rounded-lg mx-auto position-absolute mt-5 mb-3 w-96 h-auto"
                      @click="cambiarImagenModal(imgDefault)"
                    >
                    <DialogTitle as="h4" @click="cambiarImagenModal(imgDefault)" class="text-gray-900 text-lg text-center font-extrabold ">
                       {{ especies.especie.nom_comunes }}
                    </DialogTitle>

                    <DialogTitle as="h3" class="text-gray-900 text-lg font-bold my-5">
                       Otros nombres
                    </DialogTitle>

                    <p class="   text-gray-600 font-bold">
                      {{ especies.especie.otros_nombres }}
                    </p>
                    <DialogTitle as="h3" class="text-gray-900 text-lg font-bold my-5">
                       Sinónimos
                    </DialogTitle>

                    <p class="   text-gray-600 font-bold">
                      {{ especies.especie.sinonimos }}
                    </p>
                  </div>
                </div>
                <div class="mt-8 sm:mt-6 flex justify-between gap-4">

                    <button
                        type="button"
                        class="shadow p-1  w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                        @click="modal.handleClickModal(),cambiarImagenModal(imgDefault)"
                    >
                        Cerrar
                    </button>
                    <button
                        type="button"
                        class="shadow p-1  w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
                        @click="consultar(especies.especie.nom_comunes)"
                        
                    >
                       Ver Descripción completa
                    </button>
                </div> 
                
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>