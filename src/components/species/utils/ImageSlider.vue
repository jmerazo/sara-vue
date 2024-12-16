<script setup>
import { ref, onMounted } from "vue";
import { validateUrlImages } from "@/helpers";
import { useConsultaStore } from "@/stores/consulta";

const consulta = useConsultaStore();
const validImages = ref([]);
const currentIndex = ref(0);

const urls = ref([
  consulta.specie.images[0].img_general,
  consulta.specie.images[0].img_landscape_one,
  consulta.specie.images[0].img_landscape_two,
  consulta.specie.images[0].img_landscape_three,
  consulta.specie.images[0].img_leafs,
  consulta.specie.images[0].img_flowers,
  consulta.specie.images[0].img_fruits,
]);

const loadImages = async () => {
  validImages.value = await validateUrlImages(urls.value);
};

const changeImage = (index) => {
  currentIndex.value = index;
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % validImages.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + validImages.value.length) % validImages.value.length;
};

onMounted(() => {
  loadImages();
});
</script>

<template>
  <div class="slider__specie">
    <div class="slider__specie-content">
      <button class="nav-button prev" @click="prevImage">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z" />
        </svg>
      </button>

      <div class="imagen" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="(img, index) in validImages" :key="index" class="image__container">
          <div class="image__active" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
        </div>
      </div>

      <button class="nav-button next" @click="nextImage">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6z" />
        </svg>
      </button>
    </div>

    <div class="thumbnail__images">
      <img
        v-for="(img, index) in validImages"
        :key="'thumb-' + index"
        :src="img"
        :alt="'Miniatura' + index"
        class="image"
        :class="{ active: currentIndex === index }"
        @click="changeImage(index)"
      />
    </div>
  </div>
</template>

<style scoped>
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
  transition: transform 0.5s ease-in-out; /* Transición más suave */
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
  width: 50px;
  height: 50px;
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
