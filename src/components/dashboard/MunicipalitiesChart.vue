<script setup>
import "@/adminlte/plugins/chart/Chart.min.js";
import { useChartsStore } from "@/stores/dashboard/charts";

const chartStore = useChartsStore();

$(function () {
    var areaChartCanvas = $('#pieChart').get(0).getContext('2d')

    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var donutChartCanvas = $('#pieChart').get(0).getContext('2d')
    var donutData        = {
      labels: chartStore.municipios,
      datasets: [
        {
          data: chartStore.cantidadMunicipio,
          backgroundColor: [
            '#6e9167', '#ffdd8c', '#ff8030', '#f2a297', '#f4436f', '#700808',
            '#4180ab', '#8ab3cf', '#23998e', '#0c31f5', '#3bcb38', '#e81cdb',
            '#816817', '#f0a912', '#efab45', '#67ef89', '#cd23ab', '#12ffc0'
            ]
        }
      ]
    }
    var donutOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }
   

    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieData        = donutData;
    var pieOptions     = {
      maintainAspectRatio : false,
      responsive : true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(pieChartCanvas, {
      type: 'pie',
      data: pieData,
      options: pieOptions
    })

    
  })
</script>
<template>
  <!-- PIE CHART -->
  <div class="card card-danger">
    <div class="card-header">
      <h3 class="card-title">Especies evaluadas por municipio</h3>

        
    </div>
    <div class="card-body">
      <canvas
        id="pieChart"
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
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>