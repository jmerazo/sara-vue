<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref, watch } from "vue";
import { useChartLocateStore } from "@/stores/dashboard/chartLocate";

const chartStore = useChartLocateStore();

let labels = chartStore.chartMunicipios;

const data = {
  labels: labels,
  datasets: [
    {
      label: "muestras realizadas",
      data: chartStore.chartRealizados,
      backgroundColor: "rgb(26, 188, 156)",
      fill: false,
      borderColor: "rgb(26, 188, 156)",
      tension: 0.1,
    },
    {
      label: "muestras por evaluar",
      data: chartStore.chartPendientes,
      backgroundColor: "rgb(255, 0, 0)",
      fill: false,
      borderColor: "rgb(255, 0, 0)",
      tension: 0.1,
    },
    {
      label: "Total muestras del mes",
      data: chartStore.chartTotales,
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
  options: { responsive: true },
};

// Crear la gráfica en onMounted
let barChart = null;

onMounted(() => {
  barChart = new Chart(document.getElementById("barChart"), config);
});

// Usar watch para actualizar la gráfica cuando chartStore.chartMunicipios cambie
watch(
  () => chartStore.chartMunicipios,
  () => {
    if (barChart) {
      // Destruir la gráfica existente antes de crear una nueva
      barChart.destroy();
    }
    labels = chartStore.chartMunicipios;
    data.labels = labels;
    
    data.datasets = [
      {
        label: "muestras realizadas",
        data: chartStore.chartRealizados,
        backgroundColor: "rgb(26, 188, 156)",
        fill: false,
        borderColor: "rgb(26, 188, 156)",
        tension: 0.1,
      },
      {
        label: "muestras por evaluar",
        data: chartStore.chartPendientes,
        backgroundColor: "rgb(255, 0, 0)",
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
      {
        label: "Total muestras del mes",
        data: chartStore.chartTotales,
        backgroundColor: "rgb(44, 62, 80)",
        fill: false,
        borderColor: "rgb(44, 62, 80)",
        tension: 0.1,
      },
    ];
    // Crear una nueva gráfica con los datos actualizados
    barChart = new Chart(document.getElementById("barChart"), config);
  }
);
</script>
<template>
  <div class="card">
    <div class="card-header bg-orange-600 text-white text-lg p-3">
      <h1>Especies evaluadas del mes actual</h1>
      <hr />
      <div >
        <span><font-awesome-icon :icon="['fas', 'arrow-down-short-wide']" /> Filtrar </span>
        <select
          class="rounded-lg text-black font-bold px-1 mt-3"
          aria-label="Filtrar por"
          @change="chartStore.listar($event.target.value)"
        >
          <option selected :value="null">Todos</option>
          <option
            class="font-bold"
            v-for="(departamento, index) in chartStore.departamentos"
            :key="index"
            :value="index"
          >
            {{ departamento }}
          </option>
        </select>
      </div>
    </div>
    <div class="card-body p-5">
      <canvas
        style="
          min-height: 250px;
          height: 350px;
          max-height: 350px;
          max-width: 100%;
        "
        id="barChart"
      ></canvas>
    </div>
  </div>
</template>
