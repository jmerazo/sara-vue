<script setup>
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter} from "vue-router";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { useModalStore } from "../stores/modal";
import { useConsultaStore } from "../stores/consulta";

const route = useRoute();
const modal = useModalStore();
const consulta = useConsultaStore();

const paginaInicio = computed(() => route.name === "home");
const router = useRouter()

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};

const irFamilias = ()=>{
  router.push('/familias')
}
</script>

<template>
  <TransitionRoot as="template" :show="modal.modalFamily">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modal.handleClickModalFamily()"
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

                  <DialogTitle
                    as="h4"
                    class="text-gray-900 text-lg text-center font-extrabold"
                  >
                    {{ consulta.strFamilia }}
                  </DialogTitle>
                  <DialogTitle
                    as="h3"
                    class="text-gray-900 text-lg font-bold my-5"
                  >
                    La familia {{ consulta.strFamilia }} cuenta con las
                    siguientes especies:
                  </DialogTitle>
                  <!-- iterar las especies -->
                  <div
                    class="bg-green-100 rounded-lg shadow-lg"
                  >
                    <!-- tabla -->
                  <table 
                    class="w-full"
                    v-for="especie in consulta.familia"
                    :key="especie.familia"
                  >
                    <tr>
                      <td class="w-3/5 p-4">
                        <p class="font-bold">
                          {{ especie.nom_comunes }} -
                          {{ especie.nombre_cientifico }}
                        </p>
                      </td>
                      <td class="w-1/4 p-4">
                        <button
                          class="w-full p-1 bg-white hover:bg-green-700 hover:text-white text-black font-bold  rounded-lg"
                          @click="consultar(especie.nom_comunes),modal.handleClickModalFamily()"
                        >
                          Ver información
                        </button>
                      </td>
                    </tr>
                  </table>
                  <!-- fin de la tabla -->
                  </div>
                  
                </div>
              </div>
              <div class="mt-8 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                  @click="modal.handleClickModalFamily()"
                >
                  Cerrar
                </button>
                <button
                  v-if="paginaInicio"
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
                  @click="irFamilias(), modal.handleClickModalFamily()"
                >
                  Ver Todas las Familias
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>