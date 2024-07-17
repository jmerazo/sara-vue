<script setup>
import { onMounted } from "vue";
import Chart, { Legend, plugins } from "chart.js/auto";

import { useAverageSpecie } from "@/stores/average";


const averageStore = useAverageSpecie();

const customColors = ["rgb(75, 192, 192, 0.4)", "rgb(153, 102, 255, 0.4)"];

const data = {
  labels: ['Promedios'],
  datasets: [
    {
      label: "Promedio Total",
      backgroundColor: customColors[0],
      borderColor: customColors[0],
      data: [averageStore.valores[0]],
    },
    {
      label: "Promedio Fuste",
      backgroundColor: customColors[1],
      borderColor: customColors[1],
      data: [averageStore.valores[1]],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: { responsive: true },
};

onMounted(async () => {
  const barChart = new Chart(document.getElementById("barChart"), config);
});
</script>

<template>
  <div v-if="averageStore.valores.length > 0">
    <canvas class="barras" id="barChart"></canvas>
   
  </div>

</template>

<style scoped>

</style>