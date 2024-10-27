<script setup>
import { useConsultaStore } from '@/stores/consulta';
import { getFullImageUrl } from '@/helpers/index'

const consulta = useConsultaStore()

const documents = [
    { title: "Protocolo para el manejo sostenible de la especie", url: getFullImageUrl(consulta.specie.images[0].protocol), icon: "/icons/file_pdf.svg" },
    { title: "Resolución de adopción del protocolo", url: getFullImageUrl(consulta.specie.images[0].resolution_protocol), icon: "/icons/file_word.svg" },
    { title: "Anexo 1 - Instrucciones para los interesados", url: getFullImageUrl(consulta.specie.images[0].annex_one), icon: "/icons/file_pdf.svg" },
    { title: "Anexo 2 - Instrucciones para los usuarios", url: getFullImageUrl(consulta.specie.images[0].annex_two), icon: "/icons/file_pdf.svg" },
    { title: "Formato para coordenadas del predio", url: getFullImageUrl(consulta.specie.images[0].format_coordinates), icon: "/icons/file_excel.svg" },
    { title: "Instructivo para el diligenciamiento de coordenadas", url:getFullImageUrl(consulta.specie.images[0].intructive_coordinates), icon: "/icons/file_excel.svg" },
    { title: "Formato para informe de inventario", url: getFullImageUrl(consulta.specie.images[0].format_inventary), icon: "/icons/file_word.svg" },
  ];

</script>

<template>
  <div class="download-cards-container">
    <div class="download-cards">
      <div v-for="(download, index) in documents" :key="index" class="download-card">
        <img :src="download.icon" :alt="download.title + ' icon'" class="card-icon" />
        <h3>{{ download.title }}</h3>
        
        <a :href="download.url" download class="download-button">
          Descargar {{  }}
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
}

.download-cards {
  display: flex;
  gap: 1rem;
  overflow-y: hidden;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-snap-align: center;
}

@media (min-width: 920px) {
  .download-cards {
    display: grid;
    grid-template-columns: repeat(4, 220px);
    gap: 1rem;
    max-width: 960px;
    width: 100%;
    overflow-x: hidden;
  }
}

@media (min-width: 1440px) {
  .download-cards {
    gap: 1.5rem;
  }
}

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

}

@media (min-width: 920px) {
  .download-card {
    padding: 1rem;
    width: 185px;
    height: 165px;
  }
}

@media (min-width: 1440px) {
  .download-card {
    padding: 1rem;
    width: auto;
    height: auto;
  }
}

.download-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
}

@media (min-width: 920px) {
  .card-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 0;
  }
}

@media (min-width: 1440px) {
  .card-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 0;
  }
}

.download-card h3 {
  color: var(--gris-fuente);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

@media (min-width: 920px) {
  .download-card h3 {
    margin-bottom: 1rem;
    font-size: .9rem;
  }
}

@media (min-width: 1440px) {
  .download-card h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
}

.download-button {
  display: inline-block;
  background-color: var(--primary);
  color: var(--blanco);
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  margin-top: auto;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.download-button:hover {
  background-color: var(--primary-hover);
}

@media (max-width: 960px) {
  .download-cards {
    grid-template-columns: repeat(2, 300px);
  }
}

@media (max-width: 640px) {
  .download-cards {
    grid-template-columns: 300px;
  }
}
</style>