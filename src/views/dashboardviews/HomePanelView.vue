<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";

import { onMounted } from "vue";
import { useChartsStore } from "@/stores/dashboard/charts";
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";
import { useChartSamples } from "@/stores/dashboard/chartSamples";

import TotalSpeciesChart from "@/components/dashboard/TotalSpeciesChart.vue";
import CardsHome from "@/components/dashboard/CardsHome.vue";
import MunicipalitiesChart from "@/components/dashboard/MunicipalitiesChart.vue";
import DepartmentLocatesChart from "@/components/dashboard/DepartmentLocatesChart.vue";
import MunicipalitiesLocatesChart from "@/components/dashboard/MunicipalitiesLocatesChart.vue";
import DepartmentSamplesChart from "@/components/dashboard/DepartmentSamplesChart.vue";
import MunicipalitiesSamplesChart from "@/components/dashboard/MunicipalitiesSamplesChart.vue";
import PresenceMap from "@/components/dashboard/PresenceMap.vue";

const chartStore = useChartsStore();
const chartLocateStore = useChartLocateStore();
const chartSamples = useChartSamples();

//para asegurar que el panel cargue correctamente se recarga la página una vez entre al dashborad
onMounted(() => {
  const hasReloaded = localStorage.getItem("hasReloaded");
  if (!hasReloaded) {
    localStorage.setItem("hasReloaded", "true");
    window.location.reload();
  }
});
</script>
<template>
  <div>
    <h1 class="text-center py-8">
      Bienvenidos a <span class="text-green-700"> Sara </span>
    </h1>
  </div>
  
  <div>
    <CardsHome />
    
  </div>
  <hr />
  <div class="flex flex-col lg:flex-row justify-between gap-3">
    <div class="w-full lg:w-1/2">
      <h3 class="text-center mt-4">
        <font-awesome-icon :icon="['fas', 'chart-pie']" /> Graficos de procesos
        mensual
      </h3>
      <hr />
      <DepartmentLocatesChart
        v-if="chartLocateStore.departamentoTotal.length > 0"
      />
      <MunicipalitiesLocatesChart
        v-if="chartLocateStore.todosMunicipios.length > 0"
      />
    </div>
    <div class="w-full lg:w-1/2">
      <h3 class="text-center mt-4">
        <font-awesome-icon :icon="['fas', 'chart-pie']" /> Graficos de procesos
        Totales
      </h3>
      <hr />
      
      <TotalSpeciesChart v-if="chartStore.departamentos.length > 0" />
      <MunicipalitiesChart v-if="chartStore.municipios.length > 0" />
      <DepartmentSamplesChart
        v-if="chartSamples.totalDepartamentos.length > 0"
      />
      <MunicipalitiesSamplesChart
        v-if="chartSamples.CantidadMunicipio.length > 0"
      />

     
      
    </div>
    
  </div>
  <PresenceMap />
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>