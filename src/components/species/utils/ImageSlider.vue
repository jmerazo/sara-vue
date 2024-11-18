<script setup>
import { ref, onMounted } from "vue";
import { validateUrlImages } from "@/helpers";
import { useConsultaStore } from "@/stores/consulta";

const consulta = useConsultaStore();
const validImages = ref([]);
const currentIndex = ref(0);
const showModal = ref(false);

const urls = ref([
    consulta.specie.images[0].img_general,
    consulta.specie.images[0].img_landscape_one,
    consulta.specie.images[0].img_landscape_two,
    consulta.specie.images[0].img_landscape_three,
    consulta.specie.images[0].img_leafs,
    consulta.specie.images[0].img_flowers,
    consulta.specie.images[0].img_fruits,
  ])
  
const loadImages = async () => {
  validImages.value = await validateUrlImages(urls.value);
  console.log('valid ', validImages.value)
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

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  loadImages();
});

</script>

<template>

  <div class="slider__specie">
    <div class="slider__specie-content">
      <button v-if="!showModal" class="nav-button prev" @click="prevImage">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z"/></svg>
      </button>
      <div class="imagen" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <!-- activa -->
        <div v-for="(img, index) in validImages" :key="index">
          <div class="image__active" :style="{ backgroundImage: 'url(' + img + ')' }" @click="openModal"></div>
        </div>
      </div>
      <button v-if="!showModal" class="nav-button next" @click="nextImage">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
      </button>
    </div>
    <div class="thumbnail__images">

      <img v-for="(img, index) in validImages" :key="'thumb-' + index" :src="img" :alt="'Miniatura' + index"
        class="image" :class="{ active: currentIndex === index }" @click="changeImage(index)" />

    </div>

    <!-- Modal de imagen ampliada -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-slider">
          <button class="close-button" @click="closeModal">Cerrar</button>
          <button class="nav-button modal-prev" @click="prevImage">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z"/></svg>
          </button>
          <img :src="validImages[currentIndex]" alt="Imagen ampliada" class="modal-image" />
          <button class="nav-button modal-next" @click="nextImage">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6z"/></svg>
          </button>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<style scoped>
.slider__specie {
  position: relative;
  width: 100%;
}


.slider__specie-content {
  overflow: hidden;
  border-radius: .6rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .slider__specie-content {
    margin: 0 auto;
    overflow: hidden;
    border-radius: .6rem;
  }
}

.imagen {
  display: flex;
  transition: transform 0.3s ease;
}

.image__active {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.imagen,
.slider__specie-content,
.image__active {
  width: 350px;
  height: 330px;

}

@media (min-width: 768px) {

  .imagen,
  .slider__specie-content,
  .image__active {

    width: 750px;
    height: 650px;
  }
}

@media (min-width: 920px) {

  .imagen,
  .slider__specie-content,
  .image__active {

    width: 600px;
    height: 340px;
  }
}

@media (min-width: 1440px) {

  .imagen,
  .slider__specie-content,
  .image__active {

    width: 900px;
    height: 600px;
  }
}


.thumbnail__images {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

}


.image {
  width: 40px;
  height: 40px;
  opacity: 0.5;
  cursor: pointer;
  border-radius: 50%;
  margin-right: 10px;
  transition: all .1s ease-in-out;
  border: 2.5px solid transparent;
}

@media (min-width: 768px) {
  .image {
    width: 50px;
    height: 50px;
  }
}

.image:hover,
.image.active {
  opacity: 1;
  border: 2.5px solid white;
}

/* Estilos de Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  /* Fondo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999 !important;
}

.modal-slider {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  z-index: 10000;
  /* Asegúrate de que este valor sea superior al navbar */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.close-button:hover {
  background-color: #ddd;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.prev {
  left: 10px; /* Ajuste para posicionar el botón a la izquierda de la imagen */
}

.next {
  right: 90px; /* Ajuste para posicionar el botón a la derecha de la imagen */
}

/* Ajustes para el modo maximizado */
.modal-slider .modal-prev {
  left: 10px; /* Posición a la izquierda en modo maximizado */
  top: 50%;
  transform: translateY(-50%);
}

.modal-slider .modal-next {
  right: 10px; /* Posición a la derecha en modo maximizado */
  top: 50%;
  transform: translateY(-50%);
}
</style>