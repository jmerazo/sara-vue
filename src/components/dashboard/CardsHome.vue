<script setup>
import { Icon } from '@iconify/vue';
import {useChartsStore} from '@/stores/dashboard/charts'
import {useUsersStore} from '@/stores/users'
import {useEspeciesStore} from '@/stores/species'
import {useChartSamples} from '@/stores/dashboard/chartSamples'

const species = useEspeciesStore()
const charts = useChartsStore()
const samples = useChartSamples()
const users = useUsersStore()

</script>
<template>
    <div>
        <div class="row">

        <div class="col-lg-3 col-xs-6" v-if="charts.departamentos.length > 0">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{ species.especiesOriginales.length }}</h3>

              <p>Total de Especies forestales</p>
            </div>
            <div class="icon">
              <Icon icon="ph:tree" />
            </div>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{ samples.totalMuestras }}</h3>
              <p>Total de muestras tomadas</p>
            </div>
            <div class="icon">
              <font-awesome-icon :icon="['fas', 'vial']" />
              <!-- <i class="ion ion-person-add"></i> -->
            </div>
            
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>{{ charts.totalDepartamentos }}</h3>
              <p>Total de monitoreos realizados</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
           
          </div>
        </div>
        <!-- ./col -->
        
        <div class="col-lg-3 col-xs-6" v-if="charts.municipios.length > 0">
          <!-- small box -->
          <div class="small-box bg-info">
            <div class="inner">
              <!-- <h3>53<sup style="font-size: 20px">%</sup></h3> -->
              <h3>{{ charts.municipios.length }}</h3>
              <p>Municipios partícipes</p>
            </div>
            <div class="icon">
              <Icon icon="mdi:home-city" />
            </div>
            
          </div>
        </div>
        <!-- ./col -->
      </div>
    </div>
</template>

<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/Ionicons/css/ionicons.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>