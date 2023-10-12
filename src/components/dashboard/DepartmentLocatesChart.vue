<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";

const chartStore = useChartLocateStore();

let labels = chartStore.departamentos;

const data = {
  labels: labels,
  datasets: [
    {
      label: "Monitoreos realizados",
      data: chartStore.departamentoRealizados,
      backgroundColor: "rgb(26, 188, 156)",
      fill: false,
      borderColor: "rgb(26, 188, 156)",
      tension: 0.1,
    },
    {
      label: "Monitoreos Pendientes",
      data: chartStore.departamentoPendientes,
      backgroundColor: "rgb(255, 0, 0)",
      fill: false,
      borderColor: "rgb(255, 0, 0)",
      tension: 0.1,
    },
    {
      label: "Total Monitoreos esperados",
      data: chartStore.departamentoTotal,
      backgroundColor: "rgb(44, 62, 80)",
      fill: false,
      borderColor: "rgb(44, 62, 80)",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: { responsive: true,indexAxis: 'y' },
};

// Crear la gráfica en onMounted
let barChartDep = null;

onMounted(() => {
  barChartDep = new Chart(document.getElementById("barChartDep"), config);
});


</script>
<template>
  <div class="p-4">
    <div class="card">
      <div class="card-header bg-orange-600 text-white text-lg p-3 rounded">
        <h1>Monitoreos del mes actual por departamento </h1>
      </div>
      <div class="card-body p-5 bg-white shadow-md rounded-lg">
        <canvas
          style="
            min-height: 250px;
            height: 250px;
            max-height: 250px;
            max-width: 100%;
          "
          id="barChartDep"
        ></canvas>
      </div>
    </div>
  </div>
</template>
