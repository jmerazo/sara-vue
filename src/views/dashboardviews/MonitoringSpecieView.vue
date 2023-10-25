<script setup>
import {ref} from 'vue'
import Alerta from '@/components/dashboard/Alert.vue';
import { useConsultaStore } from "@/stores/consulta";


const consulta = useConsultaStore();

const fechaInicial = ref('')
const fechaFinal = ref('')
const error = ref('')

const limpiar = ()=>{
  fechaInicial.value = '';
  fechaFinal.value = '';
  consulta.limpiarFiltroFecha()
}

const consultarFechas = ()=>{
  if(!fechaFinal.value || !fechaInicial.value){
    
    error.value = 'Debe ingresar un rango de fechas'
    setTimeout(()=>{
            error.value = ''
        },3000)
    return
  }
  if(fechaInicial.value > fechaFinal.value){
    error.value = 'La fecha inicial no puede ser mayor a la fecha final'
    setTimeout(()=>{
            error.value = ''
        },3000)
    return
  }
  consulta.filtrarFecha(fechaInicial.value, fechaFinal.value)
}
</script>

<template>
  <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">
    Monitoreos de la especie {{ consulta.nombreEspecie }}
  </h1>
  <div class="flex flex-col items-center mt-5">
    <label class="p-3 text-lg font-bold rounded-lg mx-3 w-1/3 lg:w-auto">
      Filtrar por fecha de monitoreos
    </label>
    <div class="flex mt-5 mb-5 space-x-2">
      <div>
        <label class="p-3 text-lg font-bold rounded-lg mx-3"
          >Fecha inicial</label
        >
        <input
          class="p-3 rounded-lg lg:w-3/4 sm:w-full border-2 border-gray-500 py-2 px-4 font-extrabold"
          type="date"
          v-model="fechaInicial"
        />
      </div>
      <div>
        <label class="p-3 text-lg font-bold rounded-lg mx-3">Fecha final</label>
        <input
          class="p-3 rounded-lg lg:w-3/4 sm:w-full border-2 border-gray-500 py-2 px-4 font-extrabold"
          type="date"
          v-model="fechaFinal"
        />
      </div>
      <div class="lg:flex lg:items-center mt-5 ">
        <button
          @click="consultarFechas()" 
          class="bg-green-600 p-2 rounded-lg text-lg font-bold shadow-lg hover:bg-green-500 ">
          Filtrar fechas
        </button>
      </div>
      <div v-if="fechaInicial && fechaFinal" class="lg:flex lg:items-center mt-5 ">
        <button
          @click="limpiar" 
          class="bg-red-600 p-2 rounded-lg text-lg font-bold shadow-lg hover:bg-red-500 ">
          limpiar filtro
        </button>
      </div>
    </div>
  </div>
  <Alerta v-if="error">
    <p>{{ error }}</p>
  </Alerta>
  <hr />
  <table class="bg-slate-50 shadow-md border rounded-lg mx-auto mt-5">
    <thead>
      <tr>
        <th class="px-4 py-2 text-gray-600">Fecha monitoreo</th>
        <th class="px-4 py-2 text-gray-600">Altura total</th>
        <th class="px-4 py-2 text-gray-600">Altura comercial</th>
        <th class="px-4 py-2 text-gray-600">Follaje</th>
        <th class="px-4 py-2 text-gray-600">Tamaño follaje</th>
        

      </tr>
    </thead>
    <tbody>
      <tr v-for="monitoreo in consulta.displayedMonitoring" v-bind:key="monitoreo.IDmonitoreo">
        <td class="px-4 py-3 border">{{ monitoreo.fecha_monitoreo}}</td>
        <td class="px-4 py-3 border">{{ monitoreo.altura_total}}</td>
        <td class="px-4 py-3 border">{{ monitoreo.altura_comercial}}</td>
        <td class="px-4 py-3 border">{{ monitoreo.follaje}}</td>
        <td class="px-4 py-3 border">{{ monitoreo.follaje_porcentaje}}</td>
      </tr>
    </tbody>
  </table>
  <!-- paginador -->
  <div class="flex justify-center mt-5 mb-10">
      <button
        v-for="page in consulta.totalPages"
        :key="page"
        @click="consulta.changePage(page)"
        class="px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600"
        :class="{ 'bg-green-600': page === consulta.currentPage }"
      >
        {{ page }}
      </button>
    </div>

    <h1 v-if="consulta.monitoreosEspecie.length == 0" class="text-center font-bold text-2xl mt-5 mb-40">
      No hay monitoreos para la especie <span class="text-green-900">{{ consulta.nombreEspecie }}</span>
    </h1>
</template>

<style  scoped>
</style>