<script setup>
import { ref, computed, watch } from 'vue';
import { useConsultaStore } from '@/stores/consulta';
import { getFullDocumentUrl, validateUrl } from '@/helpers/index';
import { icons } from '@/assets/icons';
//components
import LoadingData from "@/components/shared/LoadingData.vue";

const consulta = useConsultaStore()

// Filtra y valida las URLs de los documentos
const validDocuments = computed(() => {
  const documents = [
    { title: "Protocolo para el manejo sostenible de la especie", url: getFullDocumentUrl(consulta.specie.images[0]?.protocol), icon: icons.pdf },
    { title: "Resolución de adopción del protocolo", url: getFullDocumentUrl(consulta.specie.images[0]?.resolution_protocol), icon: icons.word },
    { title: "Anexo 1 - Instrucciones para los interesados", url: getFullDocumentUrl(consulta.specie.images[0]?.annex_one), icon: icons.pdf },
    { title: "Anexo 2 - Instrucciones para los usuarios", url: getFullDocumentUrl(consulta.specie.images[0]?.annex_two), icon: icons.pdf },
    { title: "Formato para coordenadas del predio", url: getFullDocumentUrl(consulta.specie.images[0]?.format_coordinates), icon: icons.excel },
    { title: "Instructivo para el diligenciamiento de coordenadas", url: getFullDocumentUrl(consulta.specie.images[0]?.intructive_coordinates), icon: icons.excel },
    { title: "Formato para informe de inventario", url: getFullDocumentUrl(consulta.specie.images[0]?.format_inventary), icon: icons.word },
  ];

  return documents.filter(doc => doc.url && !doc.url.includes("/img/sin_img.png"));
});

// Vuelve a cargar documentos válidos al cambiar de especie
watch(
  () => consulta.specie,
  (newSpecie, oldSpecie) => {
  },
  { immediate: true }
);
</script>

<template>
  <div class="fullscreen-container">
    <button class="close-button" @click="$emit('close')">&times;</button>

    <div class="downloads-content">
      <LoadingData v-if="!consulta.specie.code_specie" color="white" />
      <div v-else-if="validDocuments.length" class="download-cards">
        <div v-for="(download, index) in validDocuments" :key="index" class="download-card">
          <img :src="download.icon" :alt="`${download.title} icon`" class="card-icon" />
          <h3>{{ download.title }}</h3>
          <a :href="download.url" download class="download-button">Descargar</a>
        </div>
      </div>
      <p v-else class="no-documents-message">No hay documentos disponibles</p>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.fullscreen-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  min-height: 100vh;
  max-height: 100vh;
}

/* Contenido de descargas */
.downloads-content {
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
}

/* Contenedor de tarjetas */
.download-cards-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

/* Tarjetas ajustables con grid */
.download-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Tarjetas individuales */
.download-card {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--card-padding);
  text-align: center;
  box-shadow: var(--box-shadow);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.download-card:hover {
  box-shadow: var(--box-shadow-hover);
}

/* Icono dentro de las tarjetas */
.card-icon {
  width: var(--card-icon-size);
  height: var(--card-icon-size);
  margin-bottom: 1rem;
}

/* Botón de descarga */
.download-button {
  background-color: var(--button-color);
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: var(--button-hover-color);
}

/* Botón de cerrar */
.close-button {
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1100;
  width: 2.5rem;
  height: 2.5rem;
}

.close-button:hover {
  color: red;
}

/* ---- Responsividad ---- */

/* Pantallas grandes (Desktop) */
@media (min-width: 1200px) {
  .download-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

/* Pantallas medianas (Tablets y Laptops) */
@media (min-width: 920px) and (max-width: 1199px) {
  .downloads-content {
    max-width: 960px;
  }
  .download-cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }
}

/* Tablets y dispositivos pequeños */
@media (max-width: 919px) {
  .download-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

/* Pantallas móviles pequeñas */
@media (max-width: 767px) {
  .downloads-content {
    max-width: 100%;
  }

  .download-cards {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .download-card {
    padding: 1rem;
  }

  .card-icon {
    width: var(--card-icon-size-mobile);
    height: var(--card-icon-size-mobile);
  }

  .download-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>