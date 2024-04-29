<script setup>
import { onMounted} from "vue";
import Chart from "chart.js/auto";

import { useAverageSpecie } from "@/stores/average";


const averageStore = useAverageSpecie();

const labels = averageStore.etiquetas;

 
const customColors = [
  
  "rgb(75, 192, 192, 0.4)",
  "rgb(153, 102, 255, 0.4)",
];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Datos",
      backgroundColor: customColors,
      borderColor: customColors,
      data: averageStore.valores,
    },
  ],
};

const config= {
  type: "bar",
  data: data,
  options: { responsive: true },
};

onMounted(async () => {
  const barChart = new Chart(document.getElementById("barChart"), config); // Creamos el gráfico de barras
});
</script>

<template>
  <div v-if="averageStore.valores.length > 0">
    <canvas class="barras" id="barChart"></canvas> <!-- Agregamos un segundo canvas para el gráfico de barras -->
  </div>
</template>

<style scoped>
/* Estilos CSS si es necesario */

</style>