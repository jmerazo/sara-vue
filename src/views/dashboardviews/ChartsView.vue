<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
import TotalSpeciesChart from  '@/components/dashboard/TotalSpeciesChart.vue'
import SpepeciesYearChart from  '@/components/dashboard/SpeciesYearChart.vue'
import {useChartsStore} from '@/stores/dashboard/charts'
import { computed,ref } from "vue";

const chartStore = useChartsStore();

</script>
<template>
    <div>
        <h1>Información gradicada del trabajo de campo</h1>
    </div>
  <div >
    <TotalSpeciesChart v-if="chartStore.departamentos.length > 0"/>
    <SpepeciesYearChart/>
  </div>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>