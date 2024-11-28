<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteLeave  } from 'vue-router'
import { useConsultaStore } from '../stores/consulta';
import { getFullImageUrl, getImagesFlipbook } from "@/helpers/";
import { PageFlip } from 'page-flip';

//components
import QuoteButton from "@/components/species/utils/QuoteButton.vue";
import PagesQueries from "@/components/species/utils/PagesQueries.vue";
import RenderGeo from "@/components/species/utils/RenderGeo.vue";
import ImageSlider from "@/components/species/utils/ImageSlider.vue";
import LoadingData from "../components/shared/LoadingData.vue";
import DownloadFile from '@/components/species/utils/DownloadFile.vue'

const currentSpecie = computed(() => +route.params.code_specie)

const consulta = useConsultaStore()
const route = useRoute()
const images = ref([]);
// variables to flip-book
const bookRef = ref(null);
var pageFlip;
const pageWidth = ref(0);
const pageHeight = ref(0);
const currentPage = ref(0)
const isFlipbookVisible = ref(false);

const navValue = ref('protocol')
const changeValueNav = ((item) => {
  navValue.value = item
})

const noProtocol = ref(true)

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
      mobileScrollSupport: false,
      useMouseEvents: true, // Habilitar eventos de mouse
      flippingTime: 700,    // Duración del cambio de página (efecto suave)
      swipeDistance: 30     // Distancia para detectar swipe
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

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  await consulta.consultSpecie(currentSpecie.value, 'busqueda')
  getFlipbookDimensions();
  if (consulta.specie.num_pages > 0) {
    noProtocol.value = false;
    await fetchImagesForFlipbook(consulta.specie.code_specie, consulta.specie.num_pages);
    initPageFlip();
  } else {
    noProtocol.value = true;
  }
})

const backgroundStyle = computed(() => {
  const leafImage = consulta.specie.images?.[0]?.img_leafs;
  return leafImage ? { backgroundImage: `url(${getFullImageUrl(leafImage)})` } : {};
});

function getFlipbookDimensions() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 500) {
    // phone
    pageWidth.value = 600;
    pageHeight.value = 800;
    return
  } else if (screenWidth <= 1400) {
    // desktop
    pageWidth.value = 300;
    pageHeight.value = 450;
    return
  } else if (screenWidth <= 1440) {
    // desktop
    pageWidth.value = 500;
    pageHeight.value = 700;
    return
  } else {
    // big screen
    pageWidth.value = 500;
    pageHeight.value = 700;
    return
  }
};

const fetchImagesForFlipbook = async (codeSpecie, numPages) => {
  images.value = Array.from({ length: numPages }, (_, i) => getImagesFlipbook(codeSpecie, i + 1));
};

onBeforeRouteLeave((to, from, next) => {
  consulta.specie = [];
  next();
});
</script>

<template>

  <div class="sought" :style="backgroundStyle">
    <div class="shadow"></div>
    <div class="sought__content">

      <div class="flipbook" :class="{ 'show__content': navValue === 'protocol' }">
        <div v-if="!noProtocol">
            <LoadingData :color="'white'" v-if="!isFlipbookVisible" />
          </div>

        <div id="book" class="book" ref="bookRef" :class="{ 'cover-view': currentPage === 0 }" v-if="!noProtocol">
          <div v-for="(image, index) in images" :key="index" class="page">
            <img :src="image" :alt="`Page ${index + 1}`" />
          </div>
        </div>

        <p v-else style="color: white; font-weight: 500; font-size: 2rem;">Especie en espera de protocolo</p>
      </div>

      <div class="map" :class="{ 'show__content': navValue === 'map' }">
        <LoadingData :color="'white'" v-if="consulta.specie.geo_data <= 0" />
        <RenderGeo v-if="consulta.specie.geo_data" :filteredData="consulta.specie.geo_data" />
      </div>

      <div class="gallery" :class="{ 'show__content': navValue === 'gallery' }">

        <LoadingData :color="'white'" v-if="!consulta.specie.images?.[0]?.img_leafs" />
        <ImageSlider class="slider" v-if="consulta.specie.images?.[0]?.img_leafs" />
      </div>

      <div class="downloads" :class="{ 'show__content': navValue === 'downloads' }">
        <div>
          <LoadingData :color="'white'" v-if="!consulta.specie.code_specie" />
        </div>

        <div v-if="!noProtocol">
          <DownloadFile />
        </div>
        <p v-else style="color: white; font-weight: 500; font-size: 2rem; text-align: center;height: 35dvh; padding-top: 18rem;">No hay documentos disponibles</p>

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
    <PagesQueries v-if="consulta.specie.scientificName" :scientificName="consulta.specie.scientificName" :vernacularName="consulta.specie.vernacularName" />
  </div>
</template>

<style scoped>
.cover-page {
  margin: 0 auto;
  display: block;
}

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
    margin-top: -2rem;
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
  .downloads {
    margin-top: 6rem;
  }
}

@media (min-width: 1440px) {
  .downloads {
    margin-top: 10rem;
  }
}

/* display selection nav */
.show__content {
  opacity: 1;
  z-index: 2;
}
</style>