<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useHomeStore } from '@/stores/home';
import { getSliderImages } from "../../helpers/index";
import SvgIcon from "@/assets/SvgIcon.vue";

const homeStore = useHomeStore();
const sliderImages = computed(() => {
  return homeStore.SliderImages
    .filter((image) => image.status === 1) // Filtrar imágenes activas
    .map((image) => ({
      ...image,
      link: image.link ? image.link.trim() : null // Asegurar que link sea válido
    }))
    .sort((a, b) => a.order - b.order); // Ordenar por campo 'order'
});
console.log(sliderImages.value.map((image) => image.link));

const currentIndex = ref(0);
const isPaused = ref(false);
let sliderInterval = null;
/* console.log('home images ', sliderImages) */

const processSliderImages = () => {
  homeStore.SliderImages.forEach((image) => {
    image.fullUrl = getSliderImages(image.url);
  });
};

onMounted(async () => {
  await homeStore.SliderImagesGet();
  processSliderImages();
  sliderInterval = setInterval(() => {
    changeBackgroundImage(1);
  }, 5000);
});

function changeBackgroundImage(direction) {
  const totalImages = sliderImages.value.length;
  currentIndex.value = (currentIndex.value + direction + totalImages) % totalImages;
}

watch(
    () => homeStore.SliderImages,
    () => {
        processSliderImages();
    },
    { deep: true }
);

function pauseSlider() {
  if (!isPaused.value) {
    isPaused.value = true;
    clearInterval(sliderInterval); // Detiene el intervalo
  } else {
    isPaused.value = false;
    sliderInterval = setInterval(() => {
      changeBackgroundImage(1);
    }, 5000); // Reinicia el intervalo
  }
}
</script>

<template>
  <header class="header">
    <div class="header__text">
      <h1>SISTEMA DE INFORMACIÓN PARA LA ADMINISTRACIÓN Y MANEJO SOSTENIBLE DE LOS RECURSOS NATURALES DEL SUR DE LA
        AMAZONIA COLOMBIANA</h1>
    </div>

    <!-- Imágenes con enlace o no -->
    <div
      v-for="(image, index) in sliderImages"
      :key="image.id"
      class="header__image-wrapper"
    >
      <div
        class="header__image"
        :class="{ active: index === currentIndex }"
        :style="{ backgroundImage: 'url(' + image.fullUrl + ')' }"
      >
        <!-- Botón sobre la imagen -->
        <a
          v-if="image.link && image.link.trim()"
          :href="image.link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-go"
        >
          <SvgIcon iconName="linkWhite" size="24" class="btn__link" />
          Ir a...
        </a>
      </div>
    </div>

    <button class="nav-button left" @click="changeBackgroundImage(-1)">&#10094;</button>
    <button class="nav-button right" @click="changeBackgroundImage(1)">&#10095;</button>

    <!-- Botón de pausa -->
    <button class="btn-pause" @click="pauseSlider">
      <SvgIcon :iconName="isPaused ? 'playWhite' : 'pauseWhite'" size="24" />
      {{ isPaused ? 'Reanudar' : 'Pausa' }}
    </button>

    <div class="indicators">
      <span
        v-for="(image, index) in sliderImages"
        :key="image.id"
        :class="['dot', { active: index === currentIndex }]"
      ></span>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: relative;
  height: 820px;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  overflow: hidden;
}
@media (min-width: 1340px) {
  .header{
    height: 620px;
  }
}

@media (min-width: 1440px) {
  .header{
    height: 900px;
  }
}

.header__text {
  margin: 0 auto;
  margin-top: 70%;
  position: relative;
  max-width: 90%;
  color: white;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.header__text h1 {
  font-size: 1.5rem;
  text-align: center;
}

@media (min-width: 768px) {
  .header__text {
    margin-top: 50%;
  }

  .header__text h1 {
    font-size: 2rem;
  }
}

@media (min-width: 1340px) {
  .header__text {
    margin-top: 20%;
  }
  .header__text h1 {
    font-size: 3rem;
  }
}


.header__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  transition: opacity 1.5s ease-out;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
}

.header__image.active {
  opacity: 1;
  z-index: 1;
}

.header::before {
  content: "";
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: rgba(255, 255, 255, 1);
}

/* Botón de pausa */
.btn-pause {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary); /* Fondo primario */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: white; /* Texto blanco */
  cursor: pointer;
  z-index: 5;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-pause:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn__link {
  fill: white; /* Icono en color blanco */
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 3;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

@media (min-width: 1900px) {
  .header {
    height: 850px;
  }

  .header__text {
    font-size: 3rem;
  }
}

/* Estilo del botón "Ir a" */
.btn-go {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--primary); /* Fondo primario */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  color: white; /* Texto blanco */
  cursor: pointer;
  z-index: 5;
  transition: transform 0.3s, box-shadow 0.3s;
  pointer-events: auto;
}

.btn-go:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn__link {
  fill: var(--primary); /* Icono en color verde */
  z-index: 10;
}

.btn-go.hidden {
  display: none; 
  pointer-events: none;
}
</style>