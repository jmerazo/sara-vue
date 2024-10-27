<script setup>
import { ref, onMounted } from "vue";
import { getFullImageUrl, validateUrl } from "@/helpers";
import { useConsultaStore } from "@/stores/consulta";

const consulta = useConsultaStore()
const validImages = ref([])
const urls = [
  getFullImageUrl(consulta.specie.images[0].img_general),
  getFullImageUrl(consulta.specie.images[0].img_landscape_one),
  getFullImageUrl(consulta.specie.images[0].img_landscape_two),
  getFullImageUrl(consulta.specie.images[0].img_landscape_three),
  getFullImageUrl(consulta.specie.images[0].img_leafs),
  getFullImageUrl(consulta.specie.images[0].img_flowers),
  getFullImageUrl(consulta.specie.images[0].img_fruits),
]

async function fetchImages (){
  validImages.value = await validateUrl(urls)
}

onMounted(() => fetchImages())

const currentIndex = ref(0);

const changeImage = (index) => {
  currentIndex.value = index; // Actualiza el índice actual con el índice del thumbnail clickeado
};
</script>

<template>

  <div class="slider__specie">
    <div class="slider__specie-content">
      <div class="imagen" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <!-- activa -->
        <div v-for="(img, index) in validImages" :key="index">
          <div class="image__active" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
        </div>
      </div>
    </div>
    <div class="thumbnail__images">

      <img v-for="(img, index) in validImages" :key="'thumb-' + index" :src="img" :alt="'Miniatura' + index"
        class="image" :class="{ active: currentIndex === index }" @click="changeImage(index)" />

    </div>

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
</style>