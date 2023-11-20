<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

import { useModalStore } from "@/stores/modal";
import { useConsultaStore } from "@/stores/consulta";

const modal = useModalStore();
const consulta = useConsultaStore();



</script>

<template>
  <TransitionRoot as="template" :show="modal.modalInfoCandidate">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modal.handleClickModalInfoCandidate()"
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
                    class="text-gray-900 text-lg text-center font-extrabold mb-3"
                  >
                    Especie: {{ consulta.nombreEspecie }}
                  </DialogTitle>
                  <hr />
                  <DialogTitle
                    as="h3"
                    class="text-slate-700 font-bold my-5 text-center"
                  >
                    Datos del candidato
                  </DialogTitle>

                  <!-- iterar las especies -->

                  <div>
                    <div
                      class="bg-gray-100 rounded-lg shadow-lg p-2 flex gap-2 justify-evenly"
                    >
                      <div>
                        <p class="font-bold">
                          Dominancia:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.dominancia_if
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Forma Fuste:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.forma_fuste
                          }}</span>
                        </p>
                        
                        <p class="font-bold">
                          Estado copa:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.estado_copa
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Pocicion copa:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.posicion_copa
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Fitosanitario:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.fitosanitario
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Alt Bifurcacion:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.alt_bifurcacion
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Presencia:
                          <span class="text-slate-700">{{
                            consulta.infoCandidato.presencia
                          }}</span>
                        </p>
                      </div>

                      <div>
                        <p class="font-bold">
                          Altitud:
                          <span class="text-slate-700 mx-1">{{
                            consulta.infoCandidato.altitud
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Altura comercial:
                          <span class="text-slate-700 mx-1">{{
                            consulta.infoCandidato.altura_comercial
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Altura total:
                          <span class="text-slate-700 mx-1">{{
                            consulta.infoCandidato.altura_total
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Cobertura:
                          <span class="text-slate-700 mx-1">{{
                            consulta.infoCandidato.cobertura
                          }}</span>
                        </p>
                        <p class="font-bold">
                          Resultado:
                          <span class="text-green-800 mx-1">{{
                            consulta.infoCandidato.resultado
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="bg-gray-100 rounded-lg shadow-lg mt-2">
                      <p class="font-bold p-2 text-justify">
                        Evaluación: <span class="text-green-800">{{ consulta.infoCandidato.evaluacion }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-8 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                  @click="modal.handleClickModalInfoCandidate()"
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