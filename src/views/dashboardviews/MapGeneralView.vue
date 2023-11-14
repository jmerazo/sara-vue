<script setup>
import { onMounted, ref } from 'vue';
import RenderGeo from '../../components/RenderGeoMap.vue'
import { useGeoCandidateTrees } from '../../stores/candidate'
import { useEspeciesStore } from '../../stores/species'

const geoStore = useGeoCandidateTrees();

const especies = useEspeciesStore();
const codeFind = ref();

onMounted(async () => {
  await geoStore.fetchData();
});

const filterGeoData = () => {
  console.log('code view to find: ', codeFind.value)
  geoStore.filterGeo(codeFind.value)
}
</script>

<template>
    <div class="shadow-lg bg-gray-50 p-2 rounded-lg mb-5">
        <div class="text-center">
            <h1 class="font-bold text-lg my-auto mb-3">MAPA GENERAL DE LAS ESPECIES FORESTALES</h1>
        </div>
        <div class="space-y-4">
          <label class="block text-black uppercase font-bold " for="parametro"><font-awesome-icon :icon="['fas', 'filter']" class="mr-2 ml-2" />Filtrar especie</label>
          
          <select id="especie" class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold"
            @change="filterGeoData"
            v-model="codeFind"
          >            
            <option value="" selected disabled> Seleccione una especie... </option>
            <option v-for="especie in especies.especies" :key="especie.cod_especie" :value="especie.cod_especie"> {{ especie.nom_comunes + "    |   " + especie.nombre_cientifico }}</option>
          </select>
        </div>
        <RenderGeo />
    </div>   
</template>