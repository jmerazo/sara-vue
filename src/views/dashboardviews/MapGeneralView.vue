<script setup>
import { onMounted, ref } from 'vue';
import RenderGeo from '../../components/RenderGeoMap.vue'
import { useGeoCandidateTrees } from '../../stores/candidate'

const geoStore = useGeoCandidateTrees();
const filteredData = ref([]);

async function filterGeo(data) {
  return await data.map(item => ({
    lon: item.lon,
    lat: item.lat,
    nombre_comun: item.nom_comunes,
    codigo: item.codigo,
    numero_placa: item.numero_placa,
    nombre_cientifico: item.nombre_cientifico,
    vereda: item.vereda,
    coordenadas: item.coordenadas,
    nombre_del_predio: item.nombre_del_predio,
    resultado: item.resultado
  }));
}

onMounted(async () => {
  await geoStore.fetchData();
  filteredData.value = await filterGeo(geoStore.geoCandidateData);
  /* console.log('filteredData: ', filteredData.value) */
});
</script>

<template>
    <div class="shadow-lg bg-gray-50 p-2 rounded-lg mb-5">
        <div class="text-center">
            <h1 class="font-bold text-lg my-auto mb-3">MAPA GENERAL DE LAS ESPECIES FORESTALES</h1>
        </div>
        <template v-if="filteredData && filteredData.length > 0">
            <RenderGeo :filteredData="filteredData" />
        </template>
    </div>   
</template>