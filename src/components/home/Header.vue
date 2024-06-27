<script setup>
import { ref, onMounted, computed } from "vue";
import {useRoute } from "vue-router";

const route = useRoute();

const paginaInicio = computed(() => route.name === "home");


//carrusel de imagenes header
const images = ["/img/homeCarousel/slider_1.jpg", "/img/homeCarousel/slider_2.jpg", "/img/homeCarousel/slider_3.jpg", "/img/homeCarousel/slider_4.jpg"];

//carusel de imagenes header
const currentImage = ref(images[0]);
onMounted(() => {
  setInterval(() => {
    changeBackgroundImage();
  }, 5000);
});

function changeBackgroundImage() {
  const currentIndex = images.indexOf(currentImage.value);
  const nextIndex = (currentIndex + 1) % images.length;
  currentImage.value = images[nextIndex];
}


</script>

<template>
  
  <header
    class="header"
    :style="
      !paginaInicio
        ? {
            'background-color': '#eaf2ed',
            height: '0px',
            color: '#ffffff',
            backgroundImage: 'none',
          }
        : { backgroundImage: 'url(' + currentImage + ')'}
    "
  >
   
  </header>
</template>

<style scoped>

.header {
  position: relative;
  height: 600px;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  transition: background-image 1.5s ease-out;
}

.header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

@media (min-width: 1900px) {
  .header {
    height: 850px;
  }
}
.header__contenedor{
  width: 100%;
  display: grid;
}

.form{
  position: relative;
  z-index: 100;
}
</style>