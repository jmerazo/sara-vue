<script setup>
import { ref, onMounted, onActivated, watch } from 'vue';
import { useConsultaStore } from '../stores/consulta';
import { useRouter } from "vue-router";
import { useGeoCandidateTrees } from '../stores/candidate'

import QuoteButton from '../components/QuoteButton.vue'
import PagesQueries from '../components/PagesQueries.vue';
import RenderGeo from '../components/RenderGeo.vue'

const especie = useConsultaStore()
const router = useRouter();
const geoStore = useGeoCandidateTrees();

console.log("geo", geoStore.geoCandidateData)
const codigo = especie.especie.cod_especie
console.log('codigo: ', codigo)
const filteredData = ref([]);

/* function orderGeo(codigo, data){
    console.log('codigo example: ', codigo)
    console.log('data example: ', data)
    return data.filter(item => item.codigo === codigo)
             .map(item => ({ lon: item.lon, lat: item.lat }));
}

const codeExample = '2769'
const dataGeo = [{'codigo': '2769', 'lat': 0.65413, 'lon': -76.71027}, {'codigo': '2769', 'lat': 0.65423, 'lon': -76.71018}, {'codigo': '4912', 'lat': 0.65401, 'lon': -76.70983}, {'codigo': '1189', 'lat': 0.635224, 'lon': -76.873469}, {'codigo': '2313', 'lat': 0.635252, 'lon': -76.873421}, {'codigo': '827', 'lat': 0.63531, 'lon': -76.87325}, {'codigo': '197', 'lat': 0.63535, 'lon': -76.87348}, {'codigo': '3244', 'lat': 0.63535, 'lon': -76.873741}, {'codigo': '605', 'lat': 0.635499, 'lon': -76.874022}, {'codigo': '3244', 'lat': 0.6355, 'lon': -76.873684}, {'codigo': '3346', 'lat': 0.63558, 'lon': -76.86891}, {'codigo': '3244', 'lat': 0.635473, 'lon': -76.873534}, {'codigo': '846', 'lat': 0.63538, 'lon': -76.873436}, {'codigo': '782', 'lat': 0.63567, 'lon': -76.87333}, {'codigo': '1897', 'lat': 0.63558, 'lon': -76.87315}, {'codigo': '1189', 'lat': 0.635494, 'lon': -76.87264}, {'codigo': '1189', 'lat': 0.635988, 'lon': -76.872022}, {'codigo': '5396', 'lat': 0.635513, 'lon': -76.873289}]
const dataOrder = orderGeo(codeExample, dataGeo)
console.log('data order: ', dataOrder) */

async function filterGeo(codigo, data) {
    console.log("codigo: ", codigo," data: ", data)
    return await data.filter(item => item.codigo === codigo)
             .map(item => ({ lon: item.lon, lat: item.lat }));
}

onMounted(async () => {
    filteredData.value  = await filterGeo(codigo, geoStore.geoCandidateData);
    console.log('FilteredData mounted: ', filteredData.value);
})
const {
    nom_comunes,
    nombre_cientifico,
    otros_nombres,
    familia,
    hojas,
    tipo_hoja,
    flor,
    frutos,
    semillas,
    tallo,
    follaje,
    forma_copa,
    disposicion_hojas,
    distribucion,
    habito,
    sinonimos
} = especie.especie

const scrollToTop = () => {
  // para cuando se consulta desde la vista Especies
  window.scrollTo(0, 0);
}
scrollToTop()
</script>
<template>
   <div v-if="nom_comunes">
    <QuoteButton></QuoteButton>
    <div class="md:flex mb-6 gap-4 p-4">
    
        <div class="w-3/4 rounded-lg shadow-lg  px-14">
            <h1 class="text-lg font-extrabold text-slate-900 mt-10">{{ nom_comunes }} - {{nombre_cientifico}}</h1>
            <h3 class="font-bold text-slate-500 ">Otros nombres: {{ otros_nombres }}</h3>
            <h3 class="font-bold text-slate-500 ">Familia: {{ familia }}</h3>
            <br>
            <img class="mb-10 h-72 rounded-lg" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
            <h4 class="font-bold">Distribución</h4>
            <p class="text-justify mb-4">{{ distribucion }}</p>

            <div class="flex gap-3 mt-10 ">
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
            </div>

            <div class="bg-gray-100 mt-10 rounded-lg p-3 shadow-lg space-y-3">
                <p class="font-bold">
                    Tipo hoja: <span class="font-normal">{{ tipo_hoja }}</span>
                </p>
                <p class="font-bold">
                    Disposición de hojas: <span class="font-normal">{{ disposicion_hojas }}</span>
                </p>
                <p class="font-bold">
                    Follaje: <span class="font-normal">{{ follaje }}</span>
                </p>
                <p class="font-bold">
                    Forma de la copa: <span class="font-normal">{{ forma_copa }}</span>
                </p>
                <p class="font-bold">
                    Hábito: <span class="font-normal">{{ habito }}</span>
                </p>
                <p class="font-bold">
                    Sinónimos: <span class="font-normal">{{ sinonimos }}</span>
                </p>

            </div>

            <p class="font-bold text-lg mt-10 mb-3">Triangulación</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/FisionomiaPNS.png/290px-FisionomiaPNS.png" alt="">

        </div>


        <div class="w-1/4 bg-green-200 rounded-lg shadow-lg p-4">
            <h1 class="text-lg font-extrabold text-slate-900">Información de la especie</h1>
            <hr>

            <h4 class="text-center font-bold mt-5 mb-2">Hojas</h4>
            <p class="text-justify">{{ hojas }}</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://inaturalist-open-data.s3.amazonaws.com/photos/24715/large.jpg" alt="">
            <hr>
            <h4 class="text-center font-bold mt-5 mb-2">Flores</h4>
            <p class="text-justify">{{ flor }}</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://img.freepik.com/fotos-premium/flores-amarillas-arbol-hoja-perenne-cassia-isla_136404-734.jpg" alt="">

            <h4 class="text-center font-bold mt-5 mb-2">Frutos</h4>
            <p class="text-justify">{{ frutos }}</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://img.freepik.com/fotos-premium/fruta-granada-madura-colgando-jardin-espacio-copiar_150101-4103.jpg" alt="">
        </div>
    </div>

    <RenderGeo :filteredData="filteredData"></RenderGeo>
    <PagesQueries></PagesQueries>    
   </div>
   <div v-else class="flex flex-col items-center justify-center h-80">
    <p class="text-center font-bold text-2xl">No se encontraron resultados</p>
    <button 
        type="button"
        class="bg-green-600 hover:bg-green-700 uppercase p-3 rounded-lg shadow-lg font-bold mt-5 mb-20 text-white"
        @click="router.push('/')"
    >
        volver al inicio
    </button>
   </div>
</template>