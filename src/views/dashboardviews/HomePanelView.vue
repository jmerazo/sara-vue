<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
$(function () {
  var donutChartCanvas = $("#donutChart").get(0).getContext("2d");
  var valorRamdon = 20;
  var donutData = {
    labels: [`Caquetá ${valorRamdon}`, "Putumayo", "Amazonía"],
    datasets: [
      {
        data: [700, 500, 400],
        backgroundColor: ["#f56954", "#00a65a", "#f39c12"],
      },
    ],
  };
  
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  new Chart(donutChartCanvas, {
    type: "doughnut",
    data: donutData,
    options: donutOptions,
  });
});
</script>
<template>
  <div class="p-4 mt-10">
    <!-- DONUT CHART -->
    <div class="card card-success">
      <div class="card-header">
        <h3 class="card-title">
          Registro de especies amazónicas por departamento
        </h3>
      </div>
      <div class="card-body">
        <canvas
          id="donutChart"
          style="
            min-height: 250px;
            height: 250px;
            max-height: 250px;
            max-width: 100%;
          "
        ></canvas>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>