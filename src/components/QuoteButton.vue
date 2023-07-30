<script setup>
import { ref } from 'vue';

const showText = ref(false);

const copyText = () => {
  const textToCopy = "Bernal, R., S.R. Gradstein & M. Celis (eds.). 2019. Sistema de información de Arboles y plantas del Sur de la Amazonia colombiana, Corpoamazonia, Bogotá. https://sara.amazoniaesenciadevida.com.co";

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log("Texto copiado al portapapeles");
    })
    .catch((error) => {
      console.error("Error al copiar el texto:", error);
    });
};
</script>

<template>
  <div>
    <div class="fixed top-2/4 right-0 z-50">
      <button class="floating-button bg-customGreen text-white rounded-l-lg py-1 px-1" @click="showText = !showText">
        <font-awesome-icon icon="quote-left" class="mr-2"/> Cómo Citar
      </button>
      <div v-if="showText" class="citation-text bg-white border border-gray-300 rounded-l-lg px-4 py-2 mt-2 w-40 h-auto whitespace-normal break-words">
        <h1 class="text-lg font-bold text-customGreen">Cítese como</h1>
        <p class="text-sm">Bernal, R., S.R. Gradstein & M. Celis (eds.). 2019. Sistema de información de Arboles y plantas del Sur de la Amazonia colombiana, Corpoamazonia, Bogotá. https://sara.amazoniaesenciadevida.com.co</p>
        <button @click="copyText" class="text-customGreen mr-10px">
            <font-awesome-icon icon="copy" class="mr-2"/>Copiar
        </button>
      </div>
    </div>
  </div>
</template>

<style>
</style>
