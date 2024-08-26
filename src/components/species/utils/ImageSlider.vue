<script setup>
import { ref, onMounted } from "vue";
import { useGeoCandidateTrees } from "@/stores/candidate";

const geoStore = useGeoCandidateTrees();
const currentIndex = ref(0);

const changeImage = (index) => {
  currentIndex.value = index; // Actualiza el índice actual con el índice del thumbnail clickeado
};
</script>

<template>
  <div class="contenido">
    <div class="vista__imagenes">
      <div
        class="imagen"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <!-- activa -->
        <div v-for="(img, index) in geoStore.validImages" :key="index">
          <div
            class="imagen__activa"
            :style="{ backgroundImage: 'url(' + img + ')' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="vista__minuaturas">
      <!-- Miniaturas  -->
      <img
        v-for="(img, index) in geoStore.validImages"
        :key="'thumb-' + index"
        :src="img"
        :alt="'Miniatura ' + index"
        class="imagen__miniatura"
        :class="{ active: currentIndex === index }"
        @click="changeImage(index)"
      />
    </div>
  </div>
</template>




<style scoped>

.contenido {
  /* overflow: hidden; */
  position: relative;
  /* display: flex;
  flex-direction: column; */
  width: 100%;
}
.vista__imagenes {
  width: 800px;
  height: 496px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: .6rem;
}
.imagen {
  display: flex;
  width: 800px;
  height: 496px;
  transition: transform 0.3s ease; /* Transición suave para el deslizamiento */
}
.imagen__activa {
  width: 800px;
  height: 496px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.vista__minuaturas {
  display: flex;
  overflow-x: auto;
  justify-content: center;
  margin-top: 1rem;
}
.imagen__miniatura {
  width: 60px; /* Tamaño de las miniaturas */
  height: 50px;
  opacity: 0.5;
  cursor: pointer;
  border-radius: .3rem;
  margin-right: 5px; /* Espacio entre miniaturas */
}
.imagen__miniatura:hover,
.imagen__miniatura.active {
  opacity: 1; /* Opacidad completa cuando se selecciona o se pasa el mouse */
}
</style>


  