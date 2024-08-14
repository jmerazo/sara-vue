<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getFullImageUrl } from "@/helpers/";
import { obtenerFecha, formatSubtitle, formatList } from "@/helpers";
import { descargarPdfs } from "@/helpers/exportDataSheet";
import APIService from "@/services/APIService";

//store
import { useConsultaStore } from "@/stores/consulta";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useAverageSpecie } from "@/stores/average";
import { useModalStore } from "@/stores/modal";


//components
import QuoteButton from "@/components/species/utils/QuoteButton.vue";
import PagesQueries from "@/components/species/utils/PagesQueries.vue";
import RenderGeo from "@/components/species/utils/RenderGeo.vue";
import ChartAverage from "@/components/species/charts/ChartAverage.vue";
import ImageSlider from "@/components/species/utils/ImageSlider.vue";
import ModalSpecieComponent from "@/components/species/modals/ModalSpecieComponent.vue";
import FlowerCalendar from "@/components/species/calendars/FlowerCalendar.vue";
import FruitCalendar from "@/components/species/calendars/FruitCalendar.vue";


const router = useRouter();

const specie = useConsultaStore();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();
const modal = useModalStore();

console.log('data sought: ', specie.specie)

const dateNow = new Date();
const year = dateNow.getFullYear();
const month = dateNow.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
const day = dateNow.getDate();
const formatDate = `${day}-${month}-${year}`;

const code = specie.specie.code_specie;
const name_specie = specie.specie.vernacularName;
const filteredData = ref([]);

const averageAltitude = ref(0);

async function downloadDataSpecie() {
  try {
    const response = await APIService.getDownloadDataSpecie(code);
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

onMounted(async () => {
    
  if (!specie.specie.code_specie) {
    router.push({ name: "especies" });
    return;
  }

  /* averageStore.code_specie = specie.specie.code_specie;
  await averageStore.fetchData(); //store graficar
 */
  geoStore.validateUrl([
    getFullImageUrl(specie.specie.images[0].img_general),
    getFullImageUrl(specie.specie.images[0].img_landscape_one),
    getFullImageUrl(specie.specie.images[0].img_landscape_two),
    getFullImageUrl(specie.specie.images[0].img_landscape_three),
  ]);

  await geoStore.fetchData();
  filteredData.value = await filterGeo(code, geoStore.geoCandidateData); //coordenadas de los individuos de la especie consultada
});



const {
  vernacularName,
  nombre_cientifico,
  scientificName,
  scientificNameAuthorship,
  otherNames,
  family,
  kingdom,
  phylum,
  clas,
  order,
  genus,
  descriptionGeneral,
  leaves,
  flowers,
  fruits,
  seeds,
  distribution,
  synonyms,
  img_general,
  img_seeds,
  img_stem,
  img_landscape_one,
  img_landscape_two,
  img_landscape_three,
  woodUses,
  nonTimberUsers,
  bloom,
  fructification,
  ecology,
  specificEpithet,
  infraspecificEpithet,
  taxonRank
} = specie.specie;

const distributionFormat = ref(formatSubtitle(distribution));
const listFormat = ref(formatList(otherNames));

const woodUsesFormat = ref(formatSubtitle(woodUses));
const nonTimberUsersFormat = ref(formatSubtitle(nonTimberUsers));
const bloomFormat = ref(formatSubtitle(bloom));
const fructificationFormat = ref(formatSubtitle(fructification));
const ecologyFormat = ref(formatSubtitle(ecology));

const scrollToTop = () => {
  // para cuando se consulta desde la vista Especies
  window.scrollTo(0, 0);
};
scrollToTop();
</script>

<template>
  <div class="main">
    <QuoteButton></QuoteButton>
    <div class="contenido">
      <!-- seccion 1 - informacion general -->
      <section class="general">
        <ImageSlider class="slider" v-if="geoStore.validImages.length > 0" />

        <div class="general__informacion">
          <div class="informacion">
            <!-- contenido header -->
            <div class="header">
              <h1 class="header__heading">
                {{ vernacularName }}
              </h1>
              <h1 class="header__heading header__heading--subtitulo">
                <span class="nombre__cientifico" style="font-style: italic">{{
                  scientificName
                }}</span>
                <span class="nombre__autor">{{
                  " " + scientificNameAuthorship
                }}</span>
              </h1>

              <p class="header__texto">{{ descriptionGeneral }}</p>

              <h3 class="header__titulo">Reino:</h3>
              <p class="header__texto">{{ kingdom }}</p>

              <h3 class="header__titulo">Filo:</h3>
              <p class="header__texto">{{ phylum }}</p>

              <h3 class="header__titulo">Clase:</h3>
              <p class="header__texto">{{ clas }}</p>

              <h3 class="header__titulo">Orden:</h3>
              <p class="header__texto">{{ order }}</p>

              <h3 class="header__titulo">Orden:</h3>
              <p class="header__texto">{{ order }}</p>

              <h3 class="header__titulo">
                <span>Familia:</span> {{ family }}
              </h3>

              <h3 class="header__titulo">Genero:</h3>
              <p class="header__texto">{{ genus }}</p>

              <h3 class="header__titulo">Otros Nombres:</h3>
              <div v-html="listFormat"></div>
              
              <h3 class="header__titulo">Sinónimos:</h3>
              <p class="header__texto">{{ synonyms }}</p>
            </div>
            <!-- fin header -->
          </div>
        </div>
      </section>
      <!-- FIN seccion 1 - informacion general -->

      <!-- seccion 2 - tarjetas de componentes -->
      <section class="general">
        <div class="componentes">
          <div class="cards">
            <!-- grid-->
            <!-- contenido imagen -->
            <div
              v-if="specie.specie.code_specie"
              class="card"
              :style="{
                backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_leafs) + ')',
              }"
            >
              <!-- enlace animacion -->
              <button
                class="card__button animacion"
                @click="
                  modal.handleClickModalComponent([
                    getFullImageUrl(specie.specie.images[0].img_leafs),
                    'Hojas',
                    leaves,
                  ])
                "
              >
                <span class="animacion__tex">Ver Hojas</span>
              </button>
            </div>
            <!-- FIN contenido imagen -->
            <!-- contenido imagen -->
            <div
              v-if="specie.specie.code_specie"
              class="card"
              :style="{
                backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_flowers) + ')',
              }"
            >
              <!-- enlace animacion -->
              <button
                class="card__button animacion"
                @click="
                  modal.handleClickModalComponent([
                    getFullImageUrl(specie.specie.images[0].img_flowers),
                    'Flores',
                    flowers,
                  ])
                "
              >
                <span class="animacion__tex">Ver Flores</span>
              </button>
            </div>
            <!-- FIN contenido imagen -->
            <!-- contenido imagen -->
            <div
              class="card"
              v-if="specie.specie.code_specie"
              :style="{
                backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_fruits) + ')',
              }"
            >
              <!-- enlace animacion -->
              <button
                class="card__button animacion"
                @click="
                  modal.handleClickModalComponent([
                    getFullImageUrl(specie.specie.images[0].img_fruits),
                    'Frutos',
                    fruits,
                  ])
                "
              >
                <span class="animacion__tex">Ver Frutos</span>
              </button>
            </div>
            <!-- FIN contenido imagen -->
          </div>
        </div>
      </section>
      <!-- FIN seccion 2 - tarjetas de componentes -->
      <!-- seccion 3- grafico -->
      <!-- <section class="general" v-if="averageStore.valores.length > 0">
        <div class="componentes">
          <div class="grafico">
            <div class="grafico__informacion">
              <h4 class="grafico__titulo">
                Promedios de Altura respecto a
                <span>{{ averageStore.cantIndividuos }}</span> individuos
                registrados
              </h4>
              <p class="grafico__subtitulo">
                Total Promedio :
                <span>{{ averageStore.valores[0] }} metros</span>
              </p>
              <p class="grafico__subtitulo">
                Total Fuste (aprovechable para usos):
                <span>{{ averageStore.valores[1] }} metros</span>
              </p>
            </div>

            <ChartAverage class="grafico__componente" />
          </div>
        </div>
      </section> -->
      <!-- FIN seccion 3- grafico -->
      <!-- seccion 4 - mapa -->

      <section class="general">
        <div class="general__informacion">
          <h3 class="header__titulo">Usos maderables:</h3>
          <div v-html="woodUsesFormat"></div>

          <h3 class="header__titulo">Usos no maderables:</h3>
          <div v-html="nonTimberUsersFormat"></div>

          <h3 class="header__titulo">Floración:</h3>
          <div v-html="bloomFormat"></div>

          <h3 class="header__titulo">Fructificación:</h3>
          <div v-html="fructificationFormat"></div>

          <h3 class="header__titulo">Ecología:</h3>
          <div v-html="ecologyFormat"></div>
        </div>
      </section>
      

      <section class="general">
        <div class="componentes">
          <div class="mapa">
            <div class="mapa__informacion">
              <h4 class="mapa__titulo">Distribución</h4>
              <div class="subtitle__format" v-html="distributionFormat"></div>
            </div>
            <div class="jurisdiccion">
              <h4 class="jurisdiccion__titulo">
                Individuos en la Jurisdicción <span>Corpoamazonia</span>
              </h4>
              <RenderGeo
                v-if="filteredData.length > 0"
                :filteredData="filteredData"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- Fin seccion 4 - mapa -->

      <!-- section calendar flower  -->

      <FlowerCalendar/>
      <FruitCalendar/>
      <!-- End section calendar flower  -->

    </div>

    <PagesQueries />
   <!--  <div class="download__forestSpecies">
      <span class="text__exportSF">Exportar listado especies forestales:</span>      
      <a @click="descargarPdfs(especie.especie,`Ficha técnica - ${obtenerFecha()}`, 6, 0)" class="button" href="#">
        <font-awesome-icon class="button__pdf" :icon="['fas', 'file-pdf']"/>
      </a>
    </div> -->
  </div>
  <ModalSpecieComponent />
</template>

<style scoped>
.subtitle__format{
    font-size: 1rem;
    line-height: 2;
    margin-bottom: 3rem;
    margin-top: 1rem;
}
/* header */
.main {
  margin-top: 6rem;
}
/* Seccion 1- informacion general */
.general {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .main {
    margin-top: 8rem;
  }
}
@media (min-width: 992px) {
  .main {
    margin-top: 10rem;
  }
  .general {
    width: 80%;
  }
}

.informacion {
  padding: 0.5rem;
  margin-top: 2rem;
}

@media (min-width: 992px) {
  .slider {
    width: 50%;
    margin: 0 auto;
  }

  .general__informacion {
    width: 50%;
    margin: 0 auto;
  }
}

/* header */

.header__heading {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 0.9;
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
  line-height: 1.2;
  margin-bottom: 3rem;
}

.header__titulo {
  font-size: 0.9rem;
  text-align: justify;
  color: var(--gris);
  margin-top: 1.5rem;
}

.header__texto {
  font-size: 0.9rem;
  text-align: justify;
  margin-top: 1rem;
}
@media (min-width: 768px) {
  .header__titulo {
    font-size: 1rem;
    margin-top: 2rem;
  }
}

/* seccion 2 - componentes */
.componentes {
  width: 95%;
  margin: 0 auto;
  margin-top: 2rem;
}

@media (min-width: 992px) {
  .componentes {
    width: 50%;
    margin-top: 3rem;
  }
}

.cards {
  display: grid;
  gap: 1rem;
}

.card {
  display: flex;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  flex-direction: column;
  transition-property: scale(1);
  transition-duration: 0.5s;
  height: 13rem;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  .card {
    height: 16rem;
  }
}
@media (min-width: 1700px) {
  .cards {
    gap: 1rem;
    grid-template-columns: repeat(3, 1fr);
  }
  .card {
    height: 18rem;
  }
}

.card__button {
  display: inline-flex;
  width: 50%;
  align-items: center;
  height: 2.5rem;
  padding: 0 0 0 0.5rem;
  background-color: var(--blanco);
  color: var(--gris);
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0 0.5rem 0.5rem 0;
  position: relative;
  overflow: hidden;
  margin-top: 9rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .card__button {
    margin-top: 12rem;
    width: 30%;
  }
}

@media (min-width: 1700px) {
  .card__button {
    margin-top: 15rem;
    width: 40%;
  }
}
.card__button:hover {
  color: var(--blanco);
}
.animacion__text {
  position: relative;
  z-index: 2;
}
.card__button span {
  text-align: left;
  z-index: 2;
}

.animacion::after {
  content: "";
  width: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 75px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.3s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}

/* grafico promedios */
.grafico {
  background-color: #fff; /* Color de fondo de la tarjeta */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra tenue */
  padding: 20px;
  border-radius: 0.5rem;
}

.grafico__titulo {
  text-align: center;
  font-size: 0.9rem;
}
.grafico__subtitulo {
  font-size: 0.9rem;
}
.grafico__subtitulo span {
  font-weight: 500;
}
@media (min-width: 768px) {
  .grafico__titulo {
    font-size: 1.05rem;
  }
}

/* mapa */
.mapa {
  background-color: #fff; /* Color de fondo de la tarjeta */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra tenue */
  padding: 20px;
  border-radius: 0.5rem;
}

.mapa__titulo {
  text-align: center;
  font-size: 0.9rem;
  margin: 0;
}
.mapa__descripcion {
  font-size: 0.9rem;
  text-align: justify;
  padding: 0.5rem;
  margin: 0;
}

.mapa__titulo {
  font-size: 1.05rem;
}
.mapa__descripcion {
  margin-top: 1rem;
}
.jurisdiccion {
  margin-top: 1rem;
}
.jurisdiccion__titulo {
  text-align: center;
  font-size: 0.9rem;
}
.jurisdiccion__titulo span {
  color: var(--primary);
}
</style>