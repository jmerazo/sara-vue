<script setup>
import { ref, onMounted, onActivated, watch } from 'vue';
import { useConsultaStore } from '../stores/consulta';
import { useRouter } from "vue-router";
import { useGeoCandidateTrees } from '../stores/candidate'
import { useAverageSpecie } from '../stores/average'
import * as d3 from 'd3'

import QuoteButton from '../components/QuoteButton.vue'
import PagesQueries from '../components/PagesQueries.vue';
import RenderGeo from '../components/RenderGeo.vue'

const especie = useConsultaStore()
const router = useRouter();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie()

console.log('average data: ', averageStore.averageCandidateData)
const codigo = especie.especie.cod_especie
console.log('codigo: ', codigo)
const filteredData = ref([]);
const totalHeightSpecie = ref(0)
const commercialHeightSpecie = ref(0)
const averageAltitude = ref(0)

async function filterGeo(codigo, data) {
    return await data.filter(item => item.codigo === codigo)
             .map(item => ({ lon: item.lon, lat: item.lat }));
}

async function filterDataAverage(codigo, data){
    const dataSpecieAverage = await data.filter(item => item.codigo === codigo)
    const countData = dataSpecieAverage.length;
    const totalHeightSpecie = dataSpecieAverage.reduce((sum, item) => sum + item.altura_total, 0) / countData;
    const commercialHeightSpecie = dataSpecieAverage.reduce((sum, item) => sum + item.altura_comercial, 0) / countData;
    const averageAltitude = dataSpecieAverage.reduce((sum, item) => sum + item.altitud, 0) / countData;

    const totalHeightSpecieRounded = Math.round(totalHeightSpecie);
    const commercialHeightSpecieRounded = Math.round(commercialHeightSpecie);
    const averageAltitudeRounded = Math.round(averageAltitude);
    console.log('totalHeightSpecie: ', totalHeightSpecieRounded, ' commercialHeightSpecie: ', commercialHeightSpecieRounded)

    return { totalHeightSpecie: totalHeightSpecieRounded, commercialHeightSpecie : commercialHeightSpecieRounded, averageAltitude : averageAltitudeRounded};
}

function createChart() {
  const data = [
    {
      name: "Altura",
      value: totalHeightSpecie.value,
    },
    {
      name: "Altura comercial",
      value: commercialHeightSpecie.value,
    },
    {
      name: "Altitud",
      value: averageAltitude.value,
    },
  ];

  const colors = d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 400;
  const height = 200;

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const chart = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  chart.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.value))
    .attr("fill", d => colors(d.name));

  chart.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.name) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .text(d => d.value);

  chart.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  chart.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));
}

onMounted(async () => {
    filteredData.value  = await filterGeo(codigo, geoStore.geoCandidateData);
    const { totalHeightSpecie: totalHeight, commercialHeightSpecie: commercialHeight, averageAltitude: average } = await filterDataAverage(codigo, averageStore.averageCandidateData);
    totalHeightSpecie.value = totalHeight;
    commercialHeightSpecie.value = commercialHeight;
    averageAltitude.value = average;
    /* console.log('FilteredData mounted: ', filteredData.value); */

    createChart();
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
            <div class="shadow-lg bg-gray-50 p-2 rounded-lg mb-5 mt-4">
                <span class="font-bold mb-5">Alturas y altitud promedio de la especie</span><br><br>
                <div v-if="!isNaN(Number(totalHeightSpecie)) || !isNaN(Number(commercialHeightSpecie)) || !isNaN(Number(averageAltitude))" id="chart"></div>
            </div>

            <div class="shadow-lg bg-gray-50 p-2 rounded-lg mb-5">
                <p class="font-bold text-lg mt-10 mb-3">Distribución región amazónica</p>
                <template v-if="filteredData.length > 0">
                    <RenderGeo :filteredData="filteredData" />
                </template>
            </div>            
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

<style>
.bar {
  fill: #262f21;
}
</style>