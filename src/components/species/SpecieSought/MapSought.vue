<script setup>
import { useConsultaStore } from "../../../stores/consulta";

//components
import RenderGeo from "@/components/species/utils/RenderGeo.vue";
import LoadingData from "@/components/shared/LoadingData.vue";

const consulta = useConsultaStore()

</script>

<template>
    <div class="fullscreen-container">
      <!-- Botón de cerrar -->
      <button class="close-button" @click="$emit('close')">
        &times;
      </button>
  
      <!-- Contenido principal -->
      <div class="content">
        <RenderGeo
          v-if="consulta.specie.geo_data"
          :filteredData="consulta.specie.geo_data"
          class="full-geo"
        />
        <LoadingData v-else :color="'white'" />
      </div>
    </div>
  </template>
  

<style scoped>
/* Contenedor que ocupa toda la pantalla */
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9); /* Fondo oscuro */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden; /* Ocultar scroll */
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

.content {
  width: 95%; /* Ajusta según lo necesario */
  height: 95%; /* Ajusta según lo necesario */
  background: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* Configura para que los hijos se alineen verticalmente */
  align-items: stretch; /* Estira a los hijos para que ocupen todo el ancho */
  justify-content: center; /* Centra a los hijos verticalmente */
}

.content > * {
  flex-grow: 1; /* Asegura que `RenderGeo` o cualquier otro contenido crezca */
}

.full-geo {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>