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

const code = specie.specie.code_specie;
const name_specie = specie.specie.vernacularName;
const filteredData = ref([]);

const averageAltitude = ref(0);

//variable to take the value from nav
const navValue = ref('protocolo')

const changeValueNav = ((item)=>{
  navValue.value = item
})

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

const convertPdfToImages = async (pdfUrl) => {
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

  } catch (error) {
    console.log('no se puedo crear el flipbook');

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
  await geoStore.fetchData();
  filteredData.value = await filterGeo(code, geoStore.geoCandidateData);
});

</script>

<template>
  <div class="sought" :style="{
    backgroundImage: 'url(' + getFullImageUrl(specie.specie.images[0].img_leafs) + ')',
  }" style="width: 100%; height: 100vh;background-repeat: no-repeat; background-size: cover;">
    <div class="shadow"></div>

    <div class="sought__content">

      <div class="flipbook" :class="{'show__content': navValue === 'protocolo'}">
        <div id="book" class="book" ref="bookRef" :class="{ 'cover-view': currentPage === 0 }">
          <div v-for="(image, index) in images" :key="index" class="page">
            <img :src="image" :alt="`Page ${index + 1}`" />
          </div>
        </div>
      </div>

      <div class="map" :class="{'show__content': navValue === 'mapa'}">
        <RenderGeo v-if="filteredData.length > 0" :filteredData="filteredData" />
      </div>

      <div class="gallery" :class="{'show__content': navValue === 'mapa'}">
        <ImageSlider class="slider" v-if="geoStore.validImages.length > 0" />
      </div>
    </div>

    <div class="sought__nav">
      <ul>
        <li @click="changeValueNav('protocolo')" :class="{'border__nav': navValue === 'protocolo'}">Protocolo</li>
        <li @click="changeValueNav('mapa')" :class="{'border__nav': navValue === 'mapa'}">Mapa</li>
        <li @click="changeValueNav('gallery')">Galería</li>
      </ul>
    </div>



  </div>

</template>

<style scoped>
.sought {
  position: relative;
}

.sought .sought__content {
  height: 100vh;
  position: relative;
  padding: 3rem 0 0 0;
}

.shadow {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.733);
  height: 100vh;
  width: 100%;
  z-index: 1;
}

/* nav */
.sought__nav {
  position: absolute;
  z-index: 0;
  bottom: 0%;
  z-index: 10;
}

.sought__nav ul {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.sought__nav ul li {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  transition: all .3s ease-in-out;
  
}

@media (min-width: 768px) {
  .sought__nav {
    position: absolute;
    z-index: 2;
    bottom: 0%;
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }

  .sought__nav ul {
    display: flex;
    gap: 2rem;
    width: 100%;
    justify-content: center;
  }

  .sought__nav ul li {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
  
    text-align: center;
  }
}

/* gallery */
.gallery{
  margin-top: 5rem;
  width: 100%;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 1;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 1;

}


/* map */
.map {
  margin-top: 5rem;
  width: 100%;
  height: 500px;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 1;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 1;
  opacity: 0;
}

@media (min-width: 768px) {
  .map {
    margin-top: 8rem;
    width: 50%;
    top: 0;
    left: 25%;
    height: 1000px;
  }
}

/* FLIPBOOK */
.flipbook {
  margin-top: 5rem;
  position: absolute;
  height: 500px;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 0;
  z-index: 1;
  left: 4%;

}



@media (min-width: 768px) {
  .flipbook {
    margin-top: -4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    left: 0;
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

.show__content {
  opacity: 1;
  z-index: 2;
}

.border__nav{
  border-bottom: 3px solid white;
}
</style>