<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
import { useChartsStore } from "@/stores/dashboard/charts";

const chartStore = useChartsStore();

$(function () {

    var areaChartData = {
    labels: chartStore.municipios,

    
    datasets: [
      
      {
        label: `Individuos evaluados`,
        backgroundColor: '#009200', //"#00a65a",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: chartStore.cantidadMunicipio,
      },
      
    ],
  };

  var barChartCanvas = $("#barChart").get(0).getContext("2d");
  var barChartData = $.extend(true, {}, areaChartData);
  var temp0 = areaChartData.datasets[0];
  // var temp1 = areaChartData.datasets[1];
  // var temp2 = areaChartData.datasets[2];

  barChartData.datasets[0] = temp0;
  // barChartData.datasets[1] = temp1;
  // barChartData.datasets[2] = temp2;

  var barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    datasetFill: false,
  };

  new Chart(barChartCanvas, {
    type: "bar",
    data: barChartData,
    options: barChartOptions,
  });
});
</script>
<template>
  <div class="col-md-12">
    <div class="card card-success">
      <div class="card-header">
        <h3 class="card-title">Especies evaluadas por municipio</h3>
        
      </div>
      <div class="card-body">
        <div class="chart">
          <canvas
            id="barChart"
            style="
              min-height: 250px;
              height: 250px;
              max-height: 250px;
              max-width: 100%;
            "
          ></canvas>
        </div>
      </div>
      <!-- /.card-body -->
    </div>
  </div>
</template>

<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>