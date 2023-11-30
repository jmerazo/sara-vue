<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
import { onMounted } from "vue";
import { useChartsStore } from "@/stores/dashboard/charts";
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";
import { useChartSamples } from "@/stores/dashboard/chartSamples";

import CardsHome from "@/components/dashboard/CardsHome.vue";
import PresenceMap from "@/components/dashboard/PresenceMap.vue";

//monitoreos mensual
import monthlyDepartmentMonitoring from "@/components/dashboard/charts/monthlyDepartmentMonitoring.vue";
import monthlyMunicipalMonitoring from "@/components/dashboard/charts/monthlyMunicipalMonitoring.vue";

import MunicipalitiesLocatesChart from "@/components/dashboard/MunicipalitiesLocatesChart.vue";

//muestras
import totalDepartmentSamples from "@/components/dashboard/charts/totalDepartmentSamples.vue";
import totalSamplesMunicipalities from "@/components/dashboard/charts/totalSamplesMunicipalities.vue";

//monitoreos
import totalDepartmentMonitoring from "@/components/dashboard/charts/totalDepartmentMonitoring.vue";
import totalMunicipalMonitoring from "@/components/dashboard/charts/totalMunicipalMonitoring.vue";

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
  <!-- graficos modificados -->

  <div class="graficos">
    <div class="grafico">
      <totalDepartmentMonitoring v-if="chartStore.departamentos.length > 0" />
      <totalMunicipalMonitoring v-if="chartStore.municipios.length > 0" />
    </div>

    <div class="grafico">
      <totalDepartmentSamples
        v-if="chartSamples.totalDepartamentos.length > 0"
      />
      <totalSamplesMunicipalities
        v-if="chartSamples.CantidadMunicipio.length > 0"
      />
    </div>
    <div class="grafico">
      <monthlyDepartmentMonitoring
        v-if="chartLocateStore.departamentoTotal.length > 0"
      />
      <monthlyMunicipalMonitoring
        v-if="chartLocateStore.todosMunicipios.length > 0"
      />
    </div>
  </div>

  <!-- fin graficos modificados -->
  <PresenceMap />
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");

.graficos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.grafico{
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>