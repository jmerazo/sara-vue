<script setup>
import { ref, onMounted, watch } from 'vue';
import { useConsultaStore } from '@/stores/consulta';
import { getFullDocumentUrl, validateUrl } from '@/helpers/index';

const consulta = useConsultaStore();
const validDocuments = ref([]); // Aquí se almacenarán solo los documentos válidos

// Filtra y valida las URLs de los documentos
const loadValidDocuments = async () => {
  // Limpiar `validDocuments` antes de cargar nuevos documentos
  validDocuments.value = [];

  // Lista inicial de documentos basada en la especie actual
  const documents = [
    { title: "Protocolo para el manejo sostenible de la especie", url: getFullDocumentUrl(consulta.specie.images[0]?.protocol), icon: "/icons/file_pdf.svg" },
    { title: "Resolución de adopción del protocolo", url: getFullDocumentUrl(consulta.specie.images[0]?.resolution_protocol), icon: "/icons/file_word.svg" },
    { title: "Anexo 1 - Instrucciones para los interesados", url: getFullDocumentUrl(consulta.specie.images[0]?.annex_one), icon: "/icons/file_pdf.svg" },
    { title: "Anexo 2 - Instrucciones para los usuarios", url: getFullDocumentUrl(consulta.specie.images[0]?.annex_two), icon: "/icons/file_pdf.svg" },
    { title: "Formato para coordenadas del predio", url: getFullDocumentUrl(consulta.specie.images[0]?.format_coordinates), icon: "/icons/file_excel.svg" },
    { title: "Instructivo para el diligenciamiento de coordenadas", url: getFullDocumentUrl(consulta.specie.images[0]?.intructive_coordinates), icon: "/icons/file_excel.svg" },
    { title: "Formato para informe de inventario", url: getFullDocumentUrl(consulta.specie.images[0]?.format_inventary), icon: "/icons/file_word.svg" },
  ];

  const urls = documents.map(doc => doc.url).filter(url => url && !url.includes("/img/sin_img.png"));
  const validUrls = await validateUrl(urls);
  validDocuments.value = documents.filter(doc => validUrls.includes(doc.url));
};

// Vuelve a cargar documentos válidos al cambiar de especie
watch(
  () => consulta.specie, // Observa cambios en la especie
  () => loadValidDocuments(), // Carga documentos válidos al cambiar de especie
  { immediate: true }
);
</script>

<template>
  <div class="download-cards-container" v-if="validDocuments.length">
   
    <div class="download-cards">
      <div v-for="(download, index) in validDocuments" :key="index" class="download-card">
        <img :src="download.icon" :alt="download.title + ' icon'" class="card-icon" />
        <h3>{{ download.title }}</h3>
        <a :href="download.url" download class="download-button">
          Descargar
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-cards-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box; /* Evita desbordamiento por padding */
}

.download-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Ajustable a cualquier ancho */
  gap: 1rem;
  width: 100%; /* Asegura que ocupe el ancho completo */
  box-sizing: border-box; /* Evita overflow por padding */
  overflow-x: hidden; /* Oculta el scroll horizontal si ocurre */
}

/* Tarjetas individuales */
.download-card {
  background-color: var(--blanco);
  border: 1px solid var(--gris-claro);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.download-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Icono dentro de las tarjetas */
.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
}

/* Responsividad */

/* Pantallas grandes (Desktop) */
@media (min-width: 1440px) {
  .download-cards {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

/* Pantallas medianas (Tablets y Laptops) */
@media (min-width: 920px) and (max-width: 1439px) {
  .download-cards {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas medianas */
  }
}

/* Tablets verticales y dispositivos pequeños */
@media (max-width: 919px) {
  .download-cards {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en tablets y móviles grandes */
    gap: 1rem;
  }
}

/* Pantallas móviles pequeñas */
@media (max-width: 640px) {
  .download-cards {
    grid-template-columns: 1fr; /* Una sola columna en pantallas angostas */
    gap: 0.8rem;
  }

  .download-card {
    padding: 1rem;
  }

  .card-icon {
    width: 35px;
    height: 35px;
  }

  .download-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>