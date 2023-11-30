<script setup>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"

import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { useChartSamples } from "@/stores/dashboard/chartSamples";

const chartStore = useChartSamples();




const colors = [
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
];

let labels = chartStore.municipios;

const data = {
  labels: labels,
  datasets: [
    {
      data: chartStore.CantidadMunicipio,
      backgroundColor: colors,
      fill: false,
      borderColor: colors,
      tension: 0.1,
    },
  ],
};

const config = {
  type: "pie",
  data: data,
  options: {
    responsive: true,
    layout: {
      padding: {
        bottom: 50, // Ajusta el espacio en la parte inferior según sea necesario
      },
    },
    plugins: {
      legend: {
        position: "bottom", // Mueve la leyenda a la parte inferior
        labels: {
          rotation: -45,
        },
      },
    },
    
  },
};

// Crear la gráfica en onMounted
let chartSamplesMunicipalities = null;

onMounted(() => {
  chartSamplesMunicipalities = new Chart(
    document.getElementById("chartSamplesMunicipalities"),
    config
  );
});


</script>
<template>
  <div class="grafico">
    <div class="card rounded-lg">
      <div class="card-header bg-red-600 text-white text-lg p-3 rounded">
        <h1>Total de muestras tomadas por Municipio</h1>
      </div>
      <div class="grafico__contenido">
        <canvas
          style="
            min-height: 250px;
            height: 250px;
            max-height: 250px;
            max-width: 100%;
          "
          id="chartSamplesMunicipalities"
        ></canvas>
      </div>
    </div>
  </div>


</template>
