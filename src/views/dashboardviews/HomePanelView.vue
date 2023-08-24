<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
import TotalSpeciesChart from  '@/components/dashboard/TotalSpeciesChart.vue'
import SpeciesYearChart from '@/components/dashboard/SpeciesYearChart.vue'
/* import {useChartsStore} from '@/stores/dashboard/charts'
import { onMounted } from "vue";

const charts = useChartsStore()

onMounted(()=>{
  charts.chartDepartment()
  
}) */
</script>
<template>
  <div >
    <TotalSpeciesChart/>
    <SpeciesYearChart/>
  </div>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>