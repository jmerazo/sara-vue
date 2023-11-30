<script setup>
import { ref } from "vue";
import barProgress from "./barProgress.vue";
import { useChartsStore } from "@/stores/dashboard/charts";

const chartStore = useChartsStore();

const colores = ref([
  "#6e9167",
  "#ffdd8c",
  "#ff8030",
  "#f2a297",
  "#f4436f",
  "#700808",
  "#4180ab",
  "#8ab3cf",
  "#23998e",
  "#0c31f5",
  "#3bcb38",
  "#e81cdb",
  "#816817",
  "#f0a912",
  "#efab45",
  "#67ef89",
  "#cd23ab",
  "#12ffc0",
  "#6e9167",
  "#ffdd8c",
  "#ff8030",
  "#f2a297",
  "#f4436f",
  "#700808",
  "#4180ab",
  "#8ab3cf",
  "#23998e",
  "#0c31f5",
  "#3bcb38",
  "#e81cdb",
  "#816817",
  "#f0a912",
  "#efab45",
  "#67ef89",
  "#cd23ab",
  "#12ffc0",
]);
//chartStore.municipios
const totalMunicipios = chartStore.totalMunicipios

</script>
<template>
  <div class="contenedor">
    <!-- <h1>Monitoreos por municipio <span>{{ chartStore.totalMunicipios }}</span></h1> -->
    <div class="barras">
      <barProgress
        v-for="(municipio,index) in chartStore.municipios" :key="municipio.municipio"
        :municipio="municipio"
        :color="colores[index]"
        :totalMunicipios="totalMunicipios"
        :cantidadMunicipio="chartStore.cantidadMunicipio[index]"
      > </barProgress>
    </div>
  </div>
</template>

<style scoped>
.barras {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
}
@media (min-width: 768px) {
  .barras {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 2rem;
  }
}
.contenedor {
  background-color: var(--blanco);
}
</style>