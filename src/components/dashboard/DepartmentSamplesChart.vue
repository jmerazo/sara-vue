<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { useChartSamples } from "@/stores/dashboard/chartSamples";

const chartStore = useChartSamples();

let labels = chartStore.departamentos;

const data = {
  labels: labels,
  datasets: [
    {
      
      data: chartStore.totalDepartamentos,
      backgroundColor: ["#f0a912", "#3bcb38"],
      fill: false,
      borderColor: ["#f0a912", "#3bcb38"],
      tension: 0.1,
    },
    
   
  ],
};

const config = {
  type: "doughnut",
  data: data,
  options: { responsive: true },
};

// Crear la gráfica en onMounted
let chartSamplesDepartment = null;

onMounted(() => {
  chartSamplesDepartment = new Chart(document.getElementById("chartSamplesDepartment"), config);
});


</script>
<template>
  <div class="p-4">
    <div class="card rounded-lg ">
      <div class="card-header bg-red-600 text-white text-lg p-3 rounded">
        <h1>Total de muestras tomadas por departamento </h1>
      </div>
      <div class="card-body p-5 bg-white shadow-md rounded-lg">
        <canvas
          style="
            min-height: 250px;
            height: 250px;
            max-height: 250px;
            max-width: 100%;
          "
          id="chartSamplesDepartment"
        ></canvas>
      </div>
    </div>
  </div>
</template>