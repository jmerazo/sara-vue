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
  <TransitionRoot as="template" :show="modal.modalCandidates">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modal.handleClickModalCandidate()"
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
              <div
                v-if="consulta.monitoreosCandidato.length === 0"
                class="card mt-5"
              >
                <h2 class="w-full text-center font-bold">
                  <font-awesome-icon :icon="['fas', 'circle-exclamation']" /> No
                  se han realizado monitoreos para este candidato
                </h2>
              </div>
              <div v-else>
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
                    class="text-gray-900 font-bold my-5 text-center"
                  >
                    Datos del monitoreo
                  </DialogTitle>

                  <!-- iterar las especies -->

                  <div>
                    <div>
                      <div
                        v-for="candidato in consulta.monitoreosCandidato"
                        :key="candidato.ShortcutIDEV"
                      >
                        <div class="bg-gray-100 rounded-lg shadow-lg mb-3">
                          <p class="font-bold text-center p-2 bg-gray-200">
                            Feha: {{ candidato.fecha_monitoreo }}
                          </p>
                          <div class="flex gap-2 justify-evenly p-3">
                            <div>
                              <p class="font-bold text-slate-700">
                                precipitacion: <span class="text-slate-900">{{ candidato.precipitacion }} </span>
                              </p>
                              <p class="font-bold text-slate-700">
                                temperatura: {{ candidato.temperatura }}
                              </p>
                              <p class="font-bold text-slate-700">
                                humedad: {{ candidato.humedad }}
                              </p>
                              <p class="font-bold text-slate-700">
                                cap: {{ candidato.ShortcutIDEV }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Altura comercial:
                                {{ candidato.altura_comercial }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Altura Total: {{ candidato.altura_total }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Eje X: {{ candidato.eje_x }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Eje y: {{ candidato.eje_y }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Eje Z: {{ candidato.eje_z }}
                              </p>
                            </div>

                            <div>
                              <p class="font-bold text-slate-700">
                                Fitosanitario: {{ candidato.fitosanitario }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Afectacion: {{ candidato.afectacion }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Follaje: {{ candidato.follaje }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Follaje porcentaje:
                                {{ candidato.follaje_porcentaje }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Observaciones flor:
                                {{ candidato.observaciones_flor }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Frutos verdes: {{ candidato.frutos_verdes }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Estado madurez: {{ candidato.estado_madurez }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Cantidad frutos: {{ candidato.cant_frutos }}
                              </p>
                              <p class="font-bold text-slate-700">
                                Medida - Peso frutos:
                                {{ candidato.medida_peso_frutos }}
                              </p>
                            </div>
                          </div>

                          <!-- desde aqui otra columna -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-8 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                  @click="modal.handleClickModalCandidate()"
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