<script setup>
import { ref, onMounted, computed } from "vue";
import { validateUrlImages } from "@/helpers";
import { useConsultaStore } from "@/stores/consulta";
import LoadingData from "../../shared/LoadingData.vue";
import { useToastStore } from '@/stores/toast';
import SvgIcon from "@/assets/SvgIcon.vue";
const toast = useToastStore()

const consulta = useConsultaStore()
const validImages = ref([]);
const currentIndex = ref(0);

const urls = computed(() =>
  consulta.specie.images?.[0]
    ? [
        consulta.specie.images[0]?.img_general,
        consulta.specie.images[0]?.img_landscape_one,
        consulta.specie.images[0]?.img_landscape_two,
        consulta.specie.images[0]?.img_landscape_three,
        consulta.specie.images[0]?.img_leafs,
        consulta.specie.images[0]?.img_flowers,
        consulta.specie.images[0]?.img_fruits,
      ].filter(Boolean)
    : []
);

const loadImages = async () => {
  try {
    validImages.value = await validateUrlImages(urls.value);
    if (!validImages.value.length) {
      toast.activateToast("No se encontraron imágenes válidas.");

    }
  } catch (error) {
    toast.activateToast("Error al cargar imágenes", "error");

  }
};


const changeImage = (index) => {
  currentIndex.value = index;
};

const nextImage = () => {
  if (validImages.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % validImages.value.length;
  }
};

const prevImage = () => {
  if (validImages.value.length > 0) {
    currentIndex.value =
      (currentIndex.value - 1 + validImages.value.length) %
      validImages.value.length;
  }
};

onMounted(async () => {
  if (!consulta.specie.images?.[0]) {
    toast.activateToast('No hay imágenes disponibles para cargar!.', 'error');
    return;
  }
  await loadImages();
});
</script>

<template>
    <div class="fullscreen-container">
      <!-- Botón de cerrar -->
      <button class="close-button" @click="$emit('close')">
        &times;
      </button>
  
      <!-- Contenido principal de la galería -->
      <div class="gallery-content">
        <LoadingData
          :color="'white'"
          v-if="!consulta.specie.images?.[0]?.img_leafs"
        />
        <div class="slider__specie" v-if="consulta.specie.images?.[0]?.img_leafs">
          <div class="slider__specie-content">
            <button class="nav-button prev" @click="prevImage">
              <SvgIcon iconName="prev" size="24px" color="white" />
            </button>

            <div class="imagen" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
              <div v-for="(img, index) in validImages" :key="index" class="image__container">
                <div class="image__active" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
              </div>
            </div>

            <button class="nav-button next" @click="nextImage">
              <SvgIcon iconName="next" size="24px" color="white" />
            </button>
          </div>

          <div class="thumbnail__images">
            <img
              v-for="(img, index) in validImages"
              :key="'thumb-' + index"
              :src="img"
              loading="lazy"
              :alt="'Miniatura ' + index"
              class="image"
              :class="{ active: currentIndex === index }"
              @click="changeImage(index)"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Asegura que ocupe todo el ancho de la ventana */
  height: 100vh; /* Asegura que ocupe todo el alto de la ventana */
  background: rgba(0, 0, 0, 0.9); /* Fondo oscuro */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden; /* Oculta cualquier scroll adicional */
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

.gallery-content {
  width: 80%; /* Ancho relativo a la pantalla */
  height: 100%; /* Altura relativa a la pantalla */
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  background: #000; /* Asegura un fondo negro para debug */
}

.gallery-content > .slider {
  width: 100%; /* Ocupa todo el ancho del contenedor */
  height: 100%; /* Ocupa todo el alto del contenedor */
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .gallery-content {
    width: 95%;
    height: 70%;
  }
}

@media (max-width: 480px) {
  .gallery-content {
    width: 100%;
    height: 60%;
  }
}

.slider__specie {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.slider__specie-content {
  width: 100%;
  height: 80%; /* Ocupa el 80% del alto disponible */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.imagen {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%; /* El ancho total del slider */
  height: 100%;
}

.image__container {
  flex-shrink: 0;
  width: 100%; /* Cada imagen ocupa todo el ancho del contenedor */
  height: 100%; /* Altura dinámica basada en el contenedor */
}

.image__active {
  width: 100%;
  height: 100%;
  background-size: cover; /* La imagen llena el contenedor sin deformarse */
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 16 / 9; /* Mantener proporción */
  border-radius: 1%;
}

/* Miniaturas */
.thumbnail__images {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

.image {
  width: 8vw;
  height: 8vw;
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  border: 2px solid transparent;
  opacity: 0.5;
  cursor: pointer;
  transition: border 0.3s ease, opacity 0.3s ease;
}

.image.active {
  opacity: 1;
  border: 2px solid white;
}

.image:hover {
  opacity: 1;
}

/* Botones de navegación */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

.nav-button svg {
  fill: white;
}

/* Responsividad */
@media (max-width: 768px) {
  .image__active {
    aspect-ratio: 4 / 3;
  }

  .image {
    width: 40px;
    height: 40px;
  }

  .nav-button {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 480px) {
  .image {
    width: 30px;
    height: 30px;
  }

  .nav-button {
    width: 30px;
    height: 30px;
  }
}
</style>
  