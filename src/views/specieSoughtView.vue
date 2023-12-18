<script setup>
import { ref, onMounted, computed } from "vue";
import { useConsultaStore } from "@/stores/consulta";
import { useRouter } from "vue-router";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useAverageSpecie } from "@/stores/average";
import { getFullImageUrl} from '@/helpers/'

import APIService from "@/services/APIService";
import * as d3 from "d3";

import QuoteButton from "@/components/QuoteButton.vue";
import PagesQueries from "@/components/PagesQueries.vue";
import RenderGeo from "@/components/RenderGeo.vue";

const especie = useConsultaStore();
const router = useRouter();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();

const dateNow = new Date();
const year = dateNow.getFullYear();
const month = dateNow.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
const day = dateNow.getDate();
const formatDate = `${day}-${month}-${year}`;

const codigo = especie.especie.cod_especie;
const name_specie = especie.especie.nom_comunes;
const filteredData = ref([]);
const totalHeightSpecie = ref(0);
const commercialHeightSpecie = ref(0);
const averageAltitude = ref(0);

async function downloadDataSpecie() {
  try {
    const response = await APIService.getDownloadDataSpecie(codigo);
    console.log("url data", response.headers);

    if (response.headers["content-type"] === "application/pdf") {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Obtén el nombre del archivo del encabezado Content-Disposition si está presente
      const contentDisposition = response.headers["content-disposition"];
      let fileName = name_specie + "_" + codigo + "_" + formatDate; // Nombre predeterminado

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch.length > 1) {
          fileName = fileNameMatch[1];
        }
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;

      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("La respuesta no es un archivo PDF.");
    }
  } catch (error) {
    console.error("Error al descargar el archivo PDF:", error);
    // Manejar errores si es necesario
  }
}

async function filterGeo(codigo, data) {
  return await data
    .filter((item) => item.codigo === codigo)
    .map((item) => ({ lon: item.lon, lat: item.lat }));
}

async function filterDataAverage(codigo, data) {
  const dataSpecieAverage = await data.filter((item) => item.codigo === codigo);
  const countData = dataSpecieAverage.length;
  const totalHeightSpecie =
    dataSpecieAverage.reduce((sum, item) => sum + item.altura_total, 0) /
    countData;
  const commercialHeightSpecie =
    dataSpecieAverage.reduce((sum, item) => sum + item.altura_comercial, 0) /
    countData;
  const averageAltitude =
    dataSpecieAverage.reduce((sum, item) => sum + item.altitud, 0) / countData;

  const totalHeightSpecieRounded = Math.round(totalHeightSpecie);
  const commercialHeightSpecieRounded = Math.round(commercialHeightSpecie);
  const averageAltitudeRounded = Math.round(averageAltitude);

  return {
    totalHeightSpecie: totalHeightSpecieRounded,
    commercialHeightSpecie: commercialHeightSpecieRounded,
    averageAltitude: averageAltitudeRounded,
  };
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

  const colors = d3
    .scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 400;
  const height = 200;

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const chart = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  chart
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - margin.bottom - y(d.value))
    .attr("fill", (d) => colors(d.name));

  chart
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => x(d.name) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .text((d) => d.value);

  chart
    .append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  chart
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y));
}

onMounted(async () => {
  await geoStore.fetchData(); // Llama a fetchData para cargar los datos
  filteredData.value = await filterGeo(codigo, geoStore.geoCandidateData);
  const {
    totalHeightSpecie: totalHeight,
    commercialHeightSpecie: commercialHeight,
    averageAltitude: average,
  } = await filterDataAverage(codigo, averageStore.averageCandidateData);
  totalHeightSpecie.value = totalHeight;
  commercialHeightSpecie.value = commercialHeight;
  averageAltitude.value = average;

  createChart();
});

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
  sinonimos,
  img_general,
  img_leafs,
  img_flowers,
  img_fruits,
  img_seeds,
  img_stem,
  img_landscape_one,
  img_landscape_two,
  img_landscape_three,

} = especie.especie;

const scrollToTop = () => {
  // para cuando se consulta desde la vista Especies
  window.scrollTo(0, 0);
};
scrollToTop();
</script>

<template>
  <div v-if="nom_comunes">
    <QuoteButton></QuoteButton>
    <div class="contenedor">
      <main class="contenido">
        <div class="contenido__grid">
          <div class="contenido__derecha-arriba">
            <div class="composicion__general">
              <!-- imagen principal -->
              <div class="imagen__principal">
                <img
                  :src="getFullImageUrl(img_general)"
                  alt="imagen principal"
                />
              </div>
              <!-- contenido header -->
              <div class="header">
                <h1 class="header__heading">
                  {{ nom_comunes }}
                </h1>
                <h1 class="header__heading header__heading--subtitulo">
                  {{ nombre_cientifico }}
                </h1>
                <h3 class="header__titulo">
                  <span>Otros nombres:</span> {{ otros_nombres }}
                </h3>
                <h3 class="header__titulo">
                  <span>Familia:</span> {{ familia }}
                </h3>
              </div>
              <!-- fin header -->
            </div>
            <!-- composicion fisica -->
            <div class="composicion__especie">
              <p class="composicion__dato">
                <span>Tipo hoja: </span>{{ tipo_hoja }}
              </p>
              <p class="composicion__dato">
                <span>Disposición de hojas: </span>{{ disposicion_hojas }}
              </p>
              <p class="composicion__dato">
                <span>Follaje: </span>{{ follaje }}
              </p>
              <p class="composicion__dato">
                <span>Forma de la copa: </span>{{ forma_copa }}
              </p>
              <p class="composicion__dato"><span>Hábito: </span>{{ habito }}</p>
            </div>
            <!-- fin composicion fisica -->
            <!-- especie -->
            <div class="especie">
              <!-- hojas -->
              <div class="especie__contenido">
                <div class="especie__imagen">
                  <img :src="getFullImageUrl(img_leafs)" alt="" />
                </div>
                <div class="especie__info">
                  <h4 class="especie__titulo">Hojas</h4>
                  <p class="especie__texto">{{ hojas }}</p>
                </div>
              </div>
              <!-- flores -->
              <div class="especie__contenido">
                <div class="especie__imagen">
                  <img :src="getFullImageUrl(img_flowers)" alt="" />
                </div>
                <div class="especie__info">
                  <h4 class="especie__titulo">Flores</h4>
                  <p class="especie__texto">{{ flor }}</p>
                </div>
              </div>
              <!-- frutos -->
              <div class="especie__contenido">
                <div class="especie__imagen">
                  <img
                    :src="getFullImageUrl(img_fruits)"
                    alt=""
                  />
                </div>
                <div class="especie__info">
                  <h4 class="especie__titulo">Frutos</h4>
                  <p class="especie__texto">{{ frutos }}</p>
                </div>
              </div>
            </div>
            <!-- sinonimos -->
            <div class="sinonimos">
              <p class="contenido__titulo sinonimos__titulo">Sinónimos:</p>
              <p class="contenido__texto sinonimos__texto">
                {{ sinonimos }}
              </p>
            </div>
          </div>
          <div class="contenido__izquierda-abajo">
            <!-- estadisticas -->
            <div class="estadistica">
              <div class="estadistica__contenido">
                <span class="estadistica__titulo"
                  >Alturas y altitud promedio de la especie</span
                >
                <div class="estadistica__grafico">
                  <div
                    class="grafico"
                    v-if="
                      !isNaN(Number(totalHeightSpecie)) ||
                      !isNaN(Number(commercialHeightSpecie)) ||
                      !isNaN(Number(averageAltitude))
                    "
                    id="chart"
                  ></div>
                </div>
              </div>
            </div>
            <!-- distribucion -->
            <div class="contenido__seccion">
              <h4 class="contenido__titulo">Distribución:</h4>
              <p class="contenido__texto">{{ distribucion }}</p>
            </div>
            <!-- mapa -->
            <div class="contenido__seccion">
              <div class="mapa">
                <p class="mapa__texto">Distribución región amazónica</p>
                <template v-if="filteredData.length > 0">
                  <RenderGeo :filteredData="filteredData" />
                </template>
              </div>
            </div>
            <!-- fin mapa -->
            <!-- galeria -->
            <section class="galeria">
              <h2 class="galeria__titulo">Galeria de la especie</h2>
              <div class="galeria__flex">
                <div class="galeria__imagen">
                  <img :src="getFullImageUrl(img_landscape_one)" alt="imagen galeria" />
                </div>
                <div class="galeria__imagen-flex">
                  <img :src="getFullImageUrl(img_landscape_two)" alt="imagen galeria" />
                  <img :src="getFullImageUrl(img_landscape_three)" alt="imagen galeria" />
                </div>
              </div>
            </section>
            <!-- fin garleria -->
          </div>
        </div>
      </main>
      <div class="descargas">
        <div class="descargas__boton">
          <a @click="downloadDataSpecie" download>
            <font-awesome-icon :icon="['fas', 'file-pdf']" />
            Exportar ficha técnica
          </a>
        </div>
      </div>
    </div>
  </div>
  <!-- no resultados -->
  <div v-else class="noResultados">
    <p class="noResultados__heading">No se encontraron resultados</p>
    <button type="button" class="noResultados__boton" @click="router.push('/')">
      Volver al inicio
    </button>
  </div>
  <PagesQueries></PagesQueries>
</template>

<style scoped>
/* header */
.header {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .header {
    margin-top: 5rem;
  }
}
.header__heading {
  font-size: 1.3rem;
  margin-bottom: 0;
  line-height: 0.8;
}
@media (min-width: 768px) {
  .header__heading {
    font-size: 1.5rem;
  }
}

.header__heading--subtitulo {
  font-size: 1rem;
  text-align: center;
  color: var(--gris);
  line-height: 1;
}
@media (min-width: 768px) {
  .header__heading--subtitulo {
    font-size: 1.1rem;
  }
}
.header__titulo {
  font-size: 0.9rem;
  text-align: center;
  color: var(--gris);
}
@media (min-width: 768px) {
  .header__titulo {
    font-size: 1rem;
  }
}
/* grid-flex */

.contenido__grid {
  display: flex;
  flex-direction: column;
}
@media (min-width: 800px) {
  .contenido__grid {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
    margin-top: 5rem;
  }
}
/* secciones */
.contenido__seccion {
  padding: 0;
  margin-bottom: 2rem;
}

.contenido__titulo {
  text-align: center;
  font-size: 1rem;
  padding: 0;
  margin: 0 0 0.5rem 0;
}
@media (min-width: 768px) {
  .contenido__titulo {
    margin: 0;
    padding: 0;
  }
}
.contenido__texto {
  font-size: 0.8rem;
  padding: 1rem;
  color: var(--negro);
}
@media (min-width: 768px) {
  .contenido__texto {
    font-size: 0.9rem;
  }
}
/* contenido especie (hojas, flores y frutos) */
.especie__contenido {
  background-color: var(--gris-claro);
  margin: 1rem 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

@media (min-width: 992px) {
  .especie__contenido {
    background-color: var(--blanco);
    border: 1px solid var(--primary);
  }
}

@media (min-width: 992px) {
  .especie__contenido {
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
  }
  .especie__imagen {
    width: 20rem;
  }
  .especie__info {
    display: flex;
    flex-direction: column;
  }
}

.especie__titulo {
  text-align: center;
  font-size: 1rem;
  line-height: 0.5;
}
.especie__texto {
  font-size: 0.8rem;
  color: var(--negro);
  font-weight: 500;
  text-align: center;
  padding: 0.5rem;
  margin: 0 0 0.5rem 0;
}
/* sinonimos */
.sinonimos {
  background-color: var(--gris-claro);
  padding: 1rem;
  margin-bottom: 2rem;
}
.sinonimos__titulo {
  padding: 0;
  margin: 0 0 0.2rem 0;
  font-weight: 700;
}
.sinonimos__texto {
  padding: 0 1rem;
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
}
/* composicion especie */
.composicion__general {
  margin-top: 2rem;
}
.composicion__especie {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--gris-claro);
  margin-bottom: 2rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.composicion__dato {
  margin: 0;
  padding: 1rem auto;
  color: var(--negro);
  font-size: 1rem;
}
.composicion__dato span {
  font-weight: 700;
  color: var(--gris);
}
@media (min-width: 992px) {
  .composicion__general {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
  }
}
/* estadistica */
.estadistica {
  margin-bottom: 2rem;
}
.estadistica__contenido {
  margin: 0 auto;
  text-align: center;
}
.estadistica__titulo {
  font-size: 1rem;
  font-weight: 700;
}
.estadistica__grafico {
  margin: 0 auto;
}

.grafico {
  max-width: 95% !important;
}
/* galeria */
.galeria {
  border: 1px solid var(--primary);
  background-color: var(--negro);
}
.galeria__flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.galeria__titulo {
  font-size: 1rem;
  text-align: center;
  color: var(--blanco);
}
.galeria__imagen-flex {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.mapa__texto {
  text-align: center;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  color: var(--gris);
  font-weight: 700;
}
/* descargas */
.descargas {
  margin-top: 3rem;
  width: 100%;
}
.descargas__boton {
  width: 70%;
  margin: 0 auto;
  background-color: var(--primary);
  font-weight: 700;
  padding: 0.3rem;
  font-size: 1rem;
  text-align: center;
  border-radius: 5px;
}
.descargas__boton a {
  color: var(--blanco);
}
.descargas__boton:hover {
  background-color: var(--primary-hover);
}
/* no resultados */
.noResultados {
  background-color: var(--gris-claro);
  width: 80%;
  margin: 5rem auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.4);
}

@media (min-width: 992px) {
  .noResultados {
    width: 30%;
  }
}

.noResultados__heading {
  font-size: 1rem;
  margin: 2rem auto;
  color: var(--gris);
  padding: 0;
}

.noResultados__boton {
  background-color: var(--primary);
  color: var(--blanco);
  font-weight: 700;
  padding: .8rem;
  font-size: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color 0.3s;
}

.noResultados__boton:hover {
  background-color: var(--primary-hover);
}
</style>