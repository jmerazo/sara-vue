<script setup>
import { useConsultaStore } from "../../../stores/consulta";
import ImageSlider from "@/components/species/utils/ImageSlider.vue";
import LoadingData from "../../shared/LoadingData.vue";

const consulta = useConsultaStore()
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
        <ImageSlider
          class="slider"
          v-if="consulta.specie.images?.[0]?.img_leafs"
        />
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
</style>
  