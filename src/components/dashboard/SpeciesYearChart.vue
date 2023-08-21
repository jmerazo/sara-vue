<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
$(function () {

    var areaChartData = {
    labels: [
      "Enero 213",
      "Febrero 167",
      "Marzo 132",
      "Abril 178",
      "Mayo 212",
      "Junio 147",
      "Julio 217",
      "Agosto 265",
      "Septiembre 318",
      "Octubre 312",
      "Noviembre 341",
      "Diciembre 231",
    ],
    datasets: [
      {
        label: "Cauca 712",
        backgroundColor: "#f56954",
        borderColor: "rgba(60,141,188,0.8)",
        pointRadius: false,
        pointColor: "#3b8bba",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: [28, 48, 40, 19, 86, 27, 90, 86, 27, 80, 65, 59],
      },
      {
        label: "Putumayo 825",
        backgroundColor: "#00a65a",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40, 48, 40, 19, 86, 34],
      },
      {
        label: "Amazonas 587",
        backgroundColor: "#f39c12",
        borderColor: "rgba(210, 214, 222, 1)",
        pointRadius: false,
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c7d1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [40, 16, 60, 50, 23, 76, 69, 40, 19, 86, 65, 5],
      },
    ],
  };

  var barChartCanvas = $("#barChart").get(0).getContext("2d");
  var barChartData = $.extend(true, {}, areaChartData);
  var temp0 = areaChartData.datasets[0];
  var temp1 = areaChartData.datasets[1];
  var temp2 = areaChartData.datasets[2];

  barChartData.datasets[0] = temp1;
  barChartData.datasets[1] = temp0;
  barChartData.datasets[2] = temp2;

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
        <h3 class="card-title">Especies consultadas por año actual (2023)</h3>
        
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