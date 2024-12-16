<script setup>
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router'
import { useConsultaStore } from '../../../stores/consulta';
import { getImagesFlipbook } from "@/helpers/";
import { PageFlip } from 'page-flip';

import LoadingData from '../../shared/LoadingData.vue';

const consulta = useConsultaStore()
const route = useRoute()
// variables to flip-book
const bookRef = ref(null);
let pageFlip;
const pageWidth = ref(0);
const pageHeight = ref(0);
const currentPage = ref(0)
const isFlipbookVisible = ref(false);
const images = ref([]);

const navValue = ref('protocol')
const changeValueNav = ((item) => {
  navValue.value = item
})


const noProtocol = ref(true)

const initPageFlip = () => {
  try {
    pageFlip = new PageFlip(bookRef.value, {
      width: pageWidth.value / 2, // Cada página ocupa la mitad del ancho del contenedor
      height: pageHeight.value,
      size: "fixed",
      minWidth: pageWidth.value / 2,
      maxWidth: pageWidth.value / 2,
      minHeight: pageHeight.value,
      maxHeight: pageHeight.value,
      maxShadowOpacity: 0.5,
      showCover: true, // Mostrar la portada como página única
      mobileScrollSupport: false,
      useMouseEvents: true,
      flippingTime: 700,
      swipeDistance: 30,
    });

    // Cargar páginas desde el DOM
    pageFlip.loadFromHTML(document.querySelectorAll('.page'));

    // Escuchar el evento de cambio de página
    pageFlip.on('flip', (e) => {
      currentPage.value = e.data; // Actualizar el índice de la página actual
    });

    isFlipbookVisible.value = true;
  } catch (error) {
    console.error('Error al inicializar el flipbook', error);
    isFlipbookVisible.value = false;
  }
};

onMounted(async () => {
  console.log("Resizing window...");
  getFlipbookDimensions();
  if (consulta.specie.num_pages > 0) {
    noProtocol.value = false;
    await fetchImagesForFlipbook(consulta.specie.code_specie, consulta.specie.num_pages);
    await nextTick(); // Esperar a que las imágenes se rendericen en el DOM
    initPageFlip();

    // Escucha el cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);
  } else {
    noProtocol.value = true;
  }
})

onBeforeUnmount(() => {
  // Elimina el listener del evento resize al desmontar
  window.removeEventListener('resize', handleResize);

  // Destruye el flipbook si existe
  if (pageFlip) {
    pageFlip.destroy();
  }
});

function handleResize() {
  getFlipbookDimensions(); // Recalcula las dimensiones

  // Reinicia el flipbook con las nuevas dimensiones
  if (pageFlip) {
    pageFlip.update({
      width: pageWidth.value / 2,
      height: pageHeight.value,
      minWidth: pageWidth.value / 2,
      maxWidth: pageWidth.value / 2,
      minHeight: pageHeight.value,
      maxHeight: pageHeight.value,
    });
  }
}

function getFlipbookDimensions() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Margen dinámico para diferentes tamaños de pantalla
  const horizontalMargin = screenWidth > 768 ? 200 : 20; // Más margen en pantallas grandes
  const verticalMargin = screenHeight > 600 ? 40 : 40;  // Más margen en pantallas grandes

  const navbarHeight = 80; // Altura estimada de la navbar (ajusta si es necesario)

  pageWidth.value = screenWidth - horizontalMargin * 2; // Ajustar con márgenes
  pageHeight.value = screenHeight - navbarHeight - verticalMargin * 2; // Ajustar con márgenes
}

const fetchImagesForFlipbook = async (codeSpecie, numPages) => {
  const imagePromises = Array.from({ length: numPages }, (_, i) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getImagesFlipbook(codeSpecie, i + 1);
      img.onload = () => resolve(img.src);
    });
  });

  images.value = await Promise.all(imagePromises);
};
</script>

<template>
  <div class="fullscreen-container">
    <!-- Botón de cerrar -->
    <button class="close-button" @click="$emit('close')">
      &times;
    </button>

    <!-- Contenedor del Flipbook -->
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
  </div>
</template>

<style>
/* Contenedor que ocupa toda la pantalla */
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9); /* Fondo oscuro */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden; /* Ocultar scroll */
}

/* Botón de cerrar */
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1100;
}

.close-button:hover {
  color: red;
}

/* Flipbook centrado */
.cover-page {
  margin: 0 auto;
  display: block;
}

/* FLIPBOOK */
.flipbook {
  margin-top: 5rem;
  position: absolute;
  overflow: hidden;
  transition: all .3s ease-in-out;
  opacity: 0;
  z-index: 1;
  left: 3%;
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

@media (min-width: 768px) {
  .page img {
    width: 100%;
    height: 100%;
  }
}

.border__nav {
  border-bottom: 3px solid white;
}
</style>
