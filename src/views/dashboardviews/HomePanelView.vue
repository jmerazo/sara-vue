<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";

import { onMounted } from 'vue';
import {useChartsStore} from '@/stores/dashboard/charts'

import TotalSpeciesChart from  '@/components/dashboard/TotalSpeciesChart.vue'
import SpepeciesYearChart from  '@/components/dashboard/SpeciesYearChart.vue'
import CardsHome from "@/components/dashboard/CardsHome.vue";
import MunicipalitiesChart from "@/components/dashboard/MunicipalitiesChart.vue";



const chartStore = useChartsStore();

//para asegurar que el panel cargue correctamente se recarga la página una vez entre al dashborad
onMounted(() => {
  const hasReloaded = localStorage.getItem('hasReloaded');
  if (!hasReloaded) {
    localStorage.setItem('hasReloaded', 'true');
    window.location.reload();
  }
});
</script>
<template>
  <div >
   <h1 class="text-center py-8 ">Bienvenidos a <span class="text-green-700"> Sara </span></h1>
  </div>
  <div>
    <CardsHome/>
    
  </div>
  <div >
    <TotalSpeciesChart v-if="chartStore.departamentos.length > 0"/>
    <!-- <SpepeciesYearChart v-if="chartStore.municipios.length > 0 "/> -->
    <MunicipalitiesChart v-if="chartStore.municipios.length > 0 " />
  </div>
 
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>