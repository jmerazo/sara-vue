<script setup>
import { ref, onMounted, computed } from "vue";
import {useRoute } from "vue-router";



import FormHeader from "./FormHeader.vue";

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

//carrusel de imagenes header
const images = ["/img/slider_1.jpg", "/img/slider_2.jpg", "/img/slider_3.jpg", "/img/slider_4.jpg"];

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
    <div class="header__contenedor">
      <FormHeader/>
    </div>
  </header>
</template>

<style scoped>

.header {
  height: 600px;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  transition: background-image 1.5s ease-out;
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

</style>