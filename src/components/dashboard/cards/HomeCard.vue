<script setup>
import { Icon } from '@iconify/vue';
import {useChartsStore} from '@/stores/dashboard/charts'
import {useEspeciesStore} from '@/stores/species'
const species = useEspeciesStore()
const charts = useChartsStore()

</script>
<template>
    <div>
        <div >

        <div class="m-2" v-if="charts.departamentos.length > 0">
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
        <div class="m-2" v-if="charts.municipios.length > 0">
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