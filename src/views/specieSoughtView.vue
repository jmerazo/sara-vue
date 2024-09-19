<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getFullImageUrl } from "@/helpers/";
import { obtenerFecha, formatSubtitle, formatList, formatListB } from "@/helpers";

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
import ImageSlider from "@/components/species/utils/ImageSlider.vue";
import LoadingData from "../components/shared/LoadingData.vue";
import DownloadFile from '@/components/species/utils/DownloadFile.vue'

//check to delete
import ChartAverage from "@/components/species/charts/ChartAverage.vue";
import ModalSpecieComponent from "@/components/species/modals/ModalSpecieComponent.vue";
import FlowerCalendar from "@/components/species/calendars/FlowerCalendar.vue";
import FruitCalendar from "@/components/species/calendars/FruitCalendar.vue";

// Configurar el worker de PDF.js con la versión correcta
GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';

const router = useRouter();

const specie = useConsultaStore();
const geoStore = useGeoCandidateTrees();


const codeFilter = specie.specie.code_specie;

const filteredData = ref([]);


const downloadsList = computed(() => {
  if (!specie.specie.code_specie) {
    // if there is not specie go view species
    router.push({ name: "especies" });
    return;
  } else {
    return [
      { title: "Protocolo para el manejo sostenible de la especie", url: getFullImageUrl(specie.specie.images[0].protocol), icon: "/icons/file_pdf.svg" },
      { title: "Resolución de adopción del protocolo", url: getFullImageUrl(specie.specie.images[0].resolution_protocol), icon: "/icons/file_word.svg" },
      { title: "Anexo 1 - Instrucciones para los interesados", url: getFullImageUrl(specie.specie.images[0].annex_one), icon: "/icons/file_pdf.svg" },
      { title: "Anexo 2 - Instrucciones para los usuarios", url: getFullImageUrl(specie.specie.images[0].annex_two), icon: "/icons/file_pdf.svg" },
      { title: "Formato para coordenadas del predio", url: getFullImageUrl(specie.specie.images[0].format_coordinates), icon: "/icons/file_excel.svg" },
      { title: "Instructivo para el diligenciamiento de coordenadas", url: getFullImageUrl(specie.specie.images[0].intructive_coordinates), icon: "/icons/file_excel.svg" },
      { title: "Formato para informe de inventario", url: getFullImageUrl(specie.specie.images[0].format_inventary), icon: "/icons/file_word.svg" },
    ]
  }

})

const images = ref([]);
const bookRef = ref(null);
let pageFlip;

const pageWidth = ref(0);
const pageHeight = ref(0);

const currentPage = ref(0);
const isFlipbookVisible = ref(false);


//variable to take the value from nav
const navValue = ref('protocol')

const changeValueNav = ((item) => {
  navValue.value = item
})

async function filterGeo(codigo, data) {
  return await data
    .filter((item) => item.codigo === codigo)
    .map((item) => ({ lon: item.lon, lat: item.lat }));
}

const {
  vernacularName,
  scientificName,
} = specie.specie;

const scrollToTop = () => {
  // para cuando se consulta desde la vista Especies
  window.scrollTo(0, 0);
};

scrollToTop();


const totalPages = computed(() => images.value.length);
const isFirstPage = computed(() => currentPage.value === 0);
const isLastPage = computed(() => currentPage.value === totalPages.value - 1);
const isShowingCover = computed(() => currentPage.value === 0);

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

  } catch (error) {
    console.error('Error al convertir PDF a imágenes:', error)
  }
}

const initPageFlip = () => {
  try {
    pageFlip = new PageFlip(bookRef.value, {
      width: pageWidth.value,
      height: pageHeight.value,
      size: "fixed",
      minWidth: pageWidth.value,
      maxWidth: pageWidth.value,
      minHeight: pageHeight.value,
      maxHeight: pageHeight.value,
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

  getFlipbookDimensions()

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
    getFullImageUrl(specie.specie.images[0].img_leafs),
    getFullImageUrl(specie.specie.images[0].img_flowers),
    getFullImageUrl(specie.specie.images[0].img_fruits),
  ])

  // Obtener datos geográficos y filtrar resultados
  await geoStore.fetchData(codeFilter);
  filteredData.value = geoStore.geoDataNew;
});

const backgroundStyle = computed(() => {
  const leafImage = specie.specie.images?.[0]?.img_leafs;
  return leafImage ? { backgroundImage: `url(${getFullImageUrl(leafImage)})` } : {};
});

const getFlipbookDimensions = () => {
  const screenWidth = window.innerWidth;
  console.log('screen', screenWidth)
  if (screenWidth <= 500) {
    // phone
    pageWidth.value = 600;
    pageHeight.value = 800;
    return
  }else if (screenWidth <= 1400) {
    // desktop
    pageWidth.value = 300;
    pageHeight.value = 450;
    return
  } else if (screenWidth <= 1440) {
    // desktop
    pageWidth.value = 500;
    pageHeight.value = 700;
    return
  }else {
    // big screen
    pageWidth.value = 500;
    pageHeight.value = 700;
    return
  }
};
</script>


<template>
  <div class="sought" :style="backgroundStyle">
    <div class="shadow"></div>
    <div class="sought__content">

      <div class="flipbook" :class="{ 'show__content': navValue === 'protocol' }">
        <div style="">
          <LoadingData :color="'white'" v-if="!isFlipbookVisible" />
        </div>

        <div id="book" class="book" ref="bookRef" :class="{ 'cover-view': currentPage === 0 }">
          <div v-for="(image, index) in images" :key="index" class="page">
            <img :src="image" :alt="`Page ${index + 1}`" />
          </div>
        </div>
      </div>

      <div class="map" :class="{ 'show__content': navValue === 'map' }">
        <LoadingData :color="'white'" v-if="filteredData.length <= 0" />
        <RenderGeo v-if="filteredData.length > 0" :filteredData="filteredData" />
      </div>

      <div class="gallery" :class="{ 'show__content': navValue === 'gallery' }">

        <LoadingData :color="'white'" v-if="geoStore.validImages.length <= 0" />
        <ImageSlider class="slider" v-if="geoStore.validImages.length > 0" />
      </div>

      <div class="downloads" :class="{ 'show__content': navValue === 'downloads' }">
        <LoadingData :color="'white'" v-if="geoStore.validImages.length <= 0" />
        <DownloadFile :downloads="downloadsList" />
      </div>
    </div>

    <div class="sought__nav">
      <ul>
        <li @click="changeValueNav('protocol')" :class="{ 'border__nav': navValue === 'protocol' }">Protocolo</li>
        <li @click="changeValueNav('map')" :class="{ 'border__nav': navValue === 'map' }">Mapa</li>
        <li @click="changeValueNav('gallery')" :class="{ 'border__nav': navValue === 'gallery' }">Galería</li>
        <li @click="changeValueNav('downloads')" :class="{ 'border__nav': navValue === 'downloads' }">Descargas</li>
      </ul>
    </div>
  </div>
  <div>
    <QuoteButton />
    <PagesQueries :scientificName="scientificName" :vernacularName="vernacularName" />
  </div>



</template>

<style scoped>
/* general component */
.sought {
  position: relative;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
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
  gap: 1rem;
  justify-content: center;
  width: 78%;
}


.sought__nav ul li {
  color: white;
  font-weight: bold;
  font-size: 1rem;
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
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sought__nav ul {
    gap: 2rem;
  }

  .sought__nav ul li {
    font-size: 1.2rem;
  }

}

@media (min-width: 1440px) {
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
/* FLIPBOOK */
.flipbook {
  margin-top: 5rem;
  position: absolute;
  height: 500px;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 0;
  z-index: 1;
  left: 3%;
  width: 100%;
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

.show__content {
  opacity: 1;
  z-index: 2;
}

.book {
  transition: transform 0.5s ease;
  transform: translateX(0);
}



@media (min-width: 920px) {
  .book.cover-view {
    transform: translateX(-22.8%);
  }
}

.page img {
  width: 56%;
  height: auto;
  object-fit: cover;
}

@media (min-width: 768px) {
  .page img {
    width: 100%;
    height: 100%;
  }
}


.border__nav {
  border-bottom: 3px solid white;
}

/* map */
.map {
  margin-top: 5rem;
  width: 100%;
  height: 600px;
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
    width: 80%;
    top: 0;
    left: 10%;
    height: 1000px;
  }
}
@media (min-width: 920px) {
  .map {
    margin-top: 8rem;
    width: 50%;
    top: 0;
    left: 22%;
   
  }
}

@media (min-width: 1440px) {
  .map {
    width: 60%;
    left: 20%;
  }
}

/* gallery */
.gallery {
  margin-top: 10rem;
  width: 100%;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 0;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 1;

}

@media (min-width: 1340px) {
  .gallery {
    margin-top: 6rem;
  }
}
@media (min-width: 1440px) {
  .gallery {
    left: 2%;
    margin-top: 8rem;
  }
}



/* downloads */
.downloads {
  margin-top: 10rem;
  width: 100%;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 0;
  position: absolute;
  left: 0%;
  top: 0%;
  z-index: 1;
}

@media (min-width: 920px) {
  .downloads{
    margin-top: 6rem;
  }
}
@media (min-width: 1440px) {
  .downloads{
    margin-top: 10rem;
  }
}

/* display selection nav */
.show__content {
  opacity: 1;
  z-index: 2;
}
</style>