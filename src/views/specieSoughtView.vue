<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getFullImageUrl } from "@/helpers/";
import { obtenerFecha, formatSubtitle, formatList, formatListB } from "@/helpers";
import { descargarPdfs } from "@/helpers/exportDataSheet";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { PageFlip } from 'page-flip';

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

// Configurar el worker de PDF.js con la versión correcta
GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';

const router = useRouter();

const specie = useConsultaStore();
const geoStore = useGeoCandidateTrees();
const averageStore = useAverageSpecie();
const modal = useModalStore();

const dateNow = new Date();
const year = dateNow.getFullYear();
const month = dateNow.getMonth() + 1; // Los meses comienzan desde 0, por lo que se suma 1
const day = dateNow.getDate();
const formatDate = `${day}-${month}-${year}`;

const codeFilter = specie.specie.code_specie;
const name_specie = specie.specie.vernacularName;
const filteredData = ref([]);

const averageAltitude = ref(0);

async function filterGeo(codigo, data) {
  return await data
    .filter((item) => item.codigo === codigo)
    .map((item) => ({ lon: item.lon, lat: item.lat }));
}

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
const listFormatB = ref(formatListB(synonyms))

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

const images = ref([]);
const bookRef = ref(null);
let pageFlip;

const pageWidth = 600;
const pageHeight = 800;

const currentPage = ref(0);
const totalPages = computed(() => images.value.length);
const isFirstPage = computed(() => currentPage.value === 0);
const isLastPage = computed(() => currentPage.value === totalPages.value - 1);
const isShowingCover = computed(() => currentPage.value === 0);
const isFlipbookVisible = ref(false);

const convertPdfToImages = async (pdfUrl) => {
  if (!pdfUrl || pdfUrl === "/img/sin_img.png") {
    console.log('URL del PDF no proporcionada o vacía. No se procesará nada.');
    return;
  }

  try {
    const pdf = await getDocument(pdfUrl).promise
    const numPages = pdf.numPages
    const imagePromises = []

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      imagePromises.push(
        pdf.getPage(pageNum).then(async (page) => {
          const viewport = page.getViewport({ scale: 1 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width

          await page.render({ canvasContext: context, viewport }).promise

          return canvas.toDataURL('image/png')
        })
      )
    }

    images.value = await Promise.all(imagePromises)
    console.log('Imágenes cargadas:', images.value.length)
  } catch (error) {
    console.error('Error al convertir PDF a imágenes:', error)
  }
}

const initPageFlip = () => {
  try {
    pageFlip = new PageFlip(bookRef.value, {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      minWidth: pageWidth,
      maxWidth: pageWidth,
      minHeight: pageHeight,
      maxHeight: pageHeight,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    pageFlip.on('flip', (e) => {
      currentPage.value = e.data;
    });

    isFlipbookVisible.value = true;
  } catch (error) {
    console.log('no se puedo crear el flipbook');
    isFlipbookVisible.value = false;
  }
};

// Código ejecutado cuando el componente se monta
onMounted(async () => {
  if (!specie.specie.code_specie) {
    // Redirigir si no hay un código de especie
    router.push({ name: "especies" });
    return;
  }

  // Obtener la URL del PDF a partir de los datos de la especie
  const pdfUrl = getFullImageUrl(specie.specie.images[0].protocol);

  // Convertir el PDF a imágenes
  await convertPdfToImages(pdfUrl);

  // Inicializar PageFlip
  initPageFlip();

  // Validar y cargar otras imágenes relacionadas con la especie
  geoStore.validateUrl([
    getFullImageUrl(specie.specie.images[0].img_general),
    getFullImageUrl(specie.specie.images[0].img_landscape_one),
    getFullImageUrl(specie.specie.images[0].img_landscape_two),
    getFullImageUrl(specie.specie.images[0].img_landscape_three),
  ]);

  // Obtener datos geográficos y filtrar resultados
  await geoStore.fetchData(codeFilter);
  filteredData.value = geoStore.geoDataNew;
});
</script>

<template>
  <div class="main">
    <QuoteButton></QuoteButton>

    <div v-show="isFlipbookVisible" class="flipbook">
      <div id="book" class="book" ref="bookRef" :class="{ 'cover-view': currentPage === 0 }">
        <div v-for="(image, index) in images" :key="index" class="page">
          <img :src="image" :alt="`Page ${index + 1}`" />
        </div>
      </div>
    </div>

    <div class="content">


      <!-- section 1 - information general -->
      <section class="general">
        <ImageSlider class="slider" v-if="geoStore.validImages.length > 0" />

        <div class="general__information">
          <div class="information">
            <!-- content header -->
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

              <p class="general__text">{{ descriptionGeneral }}</p>

              <div class="components__description">

                <h3 class="description__title"><span>Reino: </span>{{ kingdom }}</h3>
                <h3 class="description__title"><span>Filo: </span> {{ phylum }}</h3>
                <h3 class="description__title"><span>Clase: </span>{{ clas }}</h3>
                <h3 class="description__title"><span>Orden: </span> {{ order }}</h3>
                <h3 class="description__title"><span>Orden: </span> {{ order }}</h3>
                <h3 class="description__title"><span>Familia: </span> {{ family }}</h3>
                <h3 class="description__title"><span>Genero:</span> {{ genus }}</h3>

              </div>

              <div class="list__component">
                <h3 class="list__title"><span>Otros Nombres:</span></h3>
                <div class="list__item" v-html="listFormat"></div>
              </div>


              <div class="list__component">
                <h3 class="list__title">Sinónimos:</h3>
                <div class="list__item" v-html="listFormatB"></div>
              </div>

            </div>
            <!-- fin header -->
          </div>
        </div>
      </section>
      <!-- FIN section 1 - information general -->

      <!-- section 2 - tarjetas de componentes -->
      <section class="general">
        <div class="componentes">
          <div class="cards">
            <!-- grid-->
            <!-- content imagen -->
            <div v-if="specie.specie.code_specie" class="card" :style="{
              backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_leafs) + ')',
            }">
              <!-- enlace animacion -->
              <button class="card__button animacion" @click="
                modal.handleClickModalComponent([
                  getFullImageUrl(specie.specie.images[0].img_leafs),
                  'Hojas',
                  leaves,
                ])
                ">
                <span class="animacion__tex">Ver Hojas</span>
              </button>
            </div>
            <!-- FIN content imagen -->
            <!-- content imagen -->
            <div v-if="specie.specie.code_specie" class="card" :style="{
              backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_flowers) + ')',
            }">
              <!-- enlace animacion -->
              <button class="card__button animacion" @click="
                modal.handleClickModalComponent([
                  getFullImageUrl(specie.specie.images[0].img_flowers),
                  'Flores',
                  flowers,
                ])
                ">
                <span class="animacion__tex">Ver Flores</span>
              </button>
            </div>
            <!-- FIN content imagen -->
            <!-- content imagen -->
            <div class="card" v-if="specie.specie.code_specie" :style="{
              backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_fruits) + ')',
            }">
              <!-- enlace animacion -->
              <button class="card__button animacion" @click="
                modal.handleClickModalComponent([
                  getFullImageUrl(specie.specie.images[0].img_fruits),
                  'Frutos',
                  fruits,
                ])
                ">
                <span class="animacion__tex">Ver Frutos</span>
              </button>
            </div>
            <!-- FIN content imagen -->
          </div>
        </div>
      </section>


      <section class="general">
        <div class="general__information">

          <article v-if="woodUses" class="section__information">
            <h3 class="section__information-title"><span>Usos maderables</span></h3>
            <div class="section__information-text" v-html="woodUsesFormat"></div>
          </article>

          <article v-if="nonTimberUsers" class="section__information">
            <h3 class="section__information-title"><span>Usos No maderables</span></h3>
            <div class="section__information-text" v-html="nonTimberUsersFormat"></div>
          </article>


          <article v-if="bloom" class="section__information">
            <h3 class="section__information-title"><span>Floración</span></h3>
            <div class="section__information-text" v-html="bloomFormat"></div>
          </article>

          <article v-if="fructification" class="section__information">
            <h3 class="section__information-title"><span>Fructificación</span></h3>
            <div class="section__information-text" v-html="fructificationFormat"></div>
          </article>

          <article v-if="ecology" class="section__information">
            <h3 class="section__information-title"
              style="text-align: center; margin-top: 5rem; margin-bottom: 1rem; font-size: 2rem;"><span
                style="border-bottom: 2px solid var(--primary);">Ecología</span></h3>
            <div class="section__information-text" v-html="ecologyFormat"></div>
          </article>

        </div>
      </section>

      <section class="general">
        <div class="componentes">


          <article class="section__information section__information-distribution">
            <h3 class="section__information-title"
              style="text-align: center; margin-top: 5rem; margin-bottom: 1rem; font-size: 2rem;"><span
                style="border-bottom: 2px solid var(--primary);">Distribución</span></h3>
            <div class="section__information-text" v-html="distributionFormat"></div>
          </article>


          <div class="mapa">
            <div class="jurisdiccion">
              <h4 class="jurisdiccion__titulo">
                Individuos en la Jurisdicción <span>Corpoamazonia</span>
              </h4>
              <RenderGeo v-if="filteredData.length > 0" :filteredData="filteredData" />
            </div>
          </div>
        </div>
      </section>
      <!-- Fin section 4 - mapa -->

      <!-- section calendar flower  -->

      <FlowerCalendar />
      <FruitCalendar />
      <!-- End section calendar flower  -->
      
    </div>

    <PagesQueries :scientificName="scientificName" :vernacularName="vernacularName" />
    <ModalSpecieComponent />
  </div>

</template>

<style scoped>
/* FLIPBOOK */
.flipbook {
  height: 500px;
  margin: 4rem 0;
}

@media (min-width: 768px) {
  .flipbook {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 10rem;
  }
}

.book {
  transition: transform 0.5s ease;
}

.book {
  transform: translateX(0);
}

@media (min-width: 768px) {
  .book.cover-view {
    transform: translateX(-25%);
  }
}

.page img {
  width: 60%;
  height: auto;
  object-fit: cover;
}

@media (min-width: 768px) {
  .page img {
    width: 100%;
    height: 100%;
  }
}




/* header */
.main {
  margin-top: 6rem;
}

/* section 1- information general */
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
    margin-top: 12rem;
  }

  .general {
    width: 80%;
  }
}

.information {
  padding: 0.5rem;
  margin-top: 2rem;
}

@media (min-width: 992px) {
  .slider {
    width: 50%;
    margin: 0 auto;
  }

  .general__information {
    width: 50%;
    margin: 0 auto;
  }
}

/* header */

.header__heading {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 0.9;
}

@media (min-width: 768px) {
  .header__heading {
    font-size: 2.5rem;
  }
}

.header__heading--subtitulo {
  font-size: 1.2rem;
  text-align: center;
  color: var(--gris);
  line-height: 1.2;
  margin-bottom: 3rem;
}

.header__titulo {
  font-size: 1.2rem;
  text-align: justify;
  color: var(--gris);
  font-weight: 400;
}

.header__titulo span {
  font-weight: 600;
}

.general__text {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
}

@media (min-width: 768px) {
  .general__text {
    font-size: 1.2rem;
    line-height: 1.6;
  }
}

.components__description {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}



.components__description .description__title {
  font-weight: 400;
  font-size: 1rem;
  margin: 0;
}

.components__description .description__title span {
  font-weight: 600;
}

@media (min-width: 768px) {
  .components__description {
    margin-top: 4rem;
  }

  .components__description .description__title {
    font-size: 1.2rem;
  }
}

.list__component {
  margin-top: 3rem;
}

.list__component .list__title {
  margin: 0;
  font-size: 1.1rem;
  margin-bottom: .2rem;
}

.list__component .list__item {
  font-size: 1.05rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .list__component {
    margin-top: 4rem;
    margin-bottom: 5rem;
  }

  .list__component .list__title {
    font-size: 1.2em;
    margin-bottom: .2rem;
  }

  .list__component .list__item {
    font-size: 1.2rem;
    line-height: 1.6;
  }
}

.section__information {
  margin-top: 8rem;
}

.section__information .section__information-title {
  margin: 0 0 2rem 0;
  text-align: center;
  font-size: 2rem;
}

.section__information .section__information-title span {
  border-bottom: 3px solid var(--primary);
}

.section__information .section__information-text {
  margin: 0;
  line-height: 1.6;
  font-size: 1.1rem;
  text-align: justify;
}

.section__information.section__information-distribution {
  margin-top: 0;
}

@media (min-width: 768px) {

  .header__titulo {
    margin-top: 1.5rem;
  }

  .general__text {
    line-height: 2;
  }
}

/* section 2 - components */
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
  left: calc(-100% - 75px);
  /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.3s ease-in-out all;
}

.animacion:hover::after {
  left: 0;
}

/* chart promedios */
.chart {
  background-color: #fff;
  /* Color de fondo de la tarjeta */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Sombra tenue */
  padding: 20px;
  border-radius: 0.5rem;
}

.chart__titulo {
  text-align: center;
  font-size: 0.9rem;
}

.chart__subtitulo {
  font-size: 0.9rem;
}

.chart__subtitulo span {
  font-weight: 500;
}

@media (min-width: 768px) {
  .chart__titulo {
    font-size: 1.8rem;
  }
}

/* mapa */
.mapa {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 0.5rem;
}


.jurisdiccion {
  margin-top: 5rem;
}

.jurisdiccion__titulo {
  text-align: center;
  font-size: 1.2rem;
}

.jurisdiccion__titulo span {
  color: var(--primary);
}

@media (min-width: 768px) {
  .jurisdiccion__titulo {
    font-size: 1.8rem;
  }
}
</style>