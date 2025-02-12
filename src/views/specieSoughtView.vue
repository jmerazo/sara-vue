<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useConsultaStore } from "../stores/consulta";
import { getFullImageUrl } from "@/helpers/";

// Componentes
import Flipbook from "@/components/species/SpecieSought/Flipbook.vue";
import MapSought from "@/components/species/SpecieSought/MapSought.vue";
import Gallery from "@/components/species/SpecieSought/Gallery.vue";
import Download from "@/components/species/SpecieSought/Download.vue";
import QuoteButton from "@/components/species/utils/QuoteButton.vue";
import PagesQueries from "@/components/species/utils/PagesQueries.vue";
import LoadingData from "../components/shared/LoadingData.vue";
import SvgIcon from "@/assets/SvgIcon.vue";

const consulta = useConsultaStore();
const route = useRoute();

onMounted(async () => {
  await consulta.consultSpecie(+route.params.code_specie, "busqueda");
});

const backgroundStyle = computed(() => {
  const leafImage = consulta.specie.images?.[0]?.img_leafs;
  return leafImage
    ? { backgroundImage: `url(${getFullImageUrl(leafImage)})` }
    : {};
});

const currentComponent = ref(null);

const showComponent = (component) => {
  currentComponent.value = component;
};

const closeComponent = () => {
  currentComponent.value = null;
};
</script>

<template>
  <div class="sought" :style="backgroundStyle">
    <div class="shadow"></div>
    <LoadingData v-if="!consulta.specie.scientificName" :color="'white'" />
    <div v-else class="sought__content">
      <!-- Primera columna: Información de la especie -->
      <div class="sought__info">
        <h2>Bienvenidos a explorar la especie:</h2>
        <h1>{{ consulta.specie.vernacularName || "Nombre común no disponible" }}</h1>
        <p>
            <strong>Nombre científico:</strong> 
            <strong><em>{{ " " + consulta.specie.scientificName }}</em></strong> 
            <strong>{{ " " + consulta.specie.scientificNameAuthorship || "No disponible" }}</strong>
        </p>
        <p><strong>Familia:</strong> {{ consulta.specie.family || "No disponible" }}</p>
      </div>

      <!-- Segunda columna: Botones de acciones -->
      <div class="sought__actions">
        <button class="action-button" @click="showComponent('flipbook')">
          <SvgIcon iconName="flipbook" size="150"/>
          <span>Protocolo</span>
        </button>
        <button class="action-button" @click="showComponent('gallery')">
          <SvgIcon iconName="gallery" size="150"/>
          <span>Galería</span>
        </button>
        <button class="action-button" @click="showComponent('map')">
          <SvgIcon iconName="map" size="150"/>
          <span>Mapa</span>
        </button>
        <button class="action-button" @click="showComponent('download')">
          <SvgIcon iconName="downloadDocument" size="150"/>
          <span>Descargas</span>
        </button>
      </div>
    </div>

    <Flipbook v-if="currentComponent === 'flipbook'" @close="closeComponent" />
    <MapSought v-if="currentComponent === 'map'" @close="closeComponent" />
    <Gallery v-if="currentComponent === 'gallery'" @close="closeComponent" />
    <Download v-if="currentComponent === 'download'" @close="closeComponent" />

    <!-- Botón adicional -->
    <QuoteButton />
  </div>

  <!-- Mover PagesQueries fuera del contenedor .sought -->
  <PagesQueries
    v-if="consulta.specie.scientificName"
    :scientificName="consulta.specie.scientificName"
    :vernacularName="consulta.specie.vernacularName"
  />
</template>

<style scoped>
.sought {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 80px); /* Reemplaza 80px con la altura real de tu navbar */
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centra verticalmente */
  align-items: center;
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.sought__content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  z-index: 2;
  padding: 0 20px;
}

.sought__info {
  width: 30%;
  color: white;
  text-align: left;
  margin-right: 500px;
  white-space: nowrap;
}

.sought__info h2 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.sought__info h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.sought__info p {
  font-size: 1.6rem;
  margin: 10px 0;
}

.sought__actions {
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.action-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Espacia el contenido, texto queda en la parte inferior */
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 10px;
  width: 150px; /* Mantiene el ancho fijo */
  height: 250px; /* Establece una altura fija */
  padding: 10px;
  box-sizing: border-box; /* Incluye padding en el tamaño total */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.action-button:hover {
  transform: scale(1.1);
}

.action-button img {
  max-height: 180px; /* Limita la altura de la imagen */
  width: auto; /* Permite que el ancho se ajuste automáticamente */
  margin-bottom: 0; /* Elimina cualquier margen adicional */
}

.action-button span {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center; /* Centra el texto */
  margin-top: auto; /* Empuja el texto hacia la parte inferior */
}

/* Ajustes para PagesQueries */
.pages-queries {
  width: 100%;
  background-color: white;
  padding: 0;
  margin: 0;
  text-align: center;
}

/* Asegurar que no haya espacio entre PagesQueries y el footer */
footer {
  margin-top: 0;
}

@media (max-width: 1200px) {
  .sought__content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }

  .sought__info {
    width: 90%;
    margin-right: 0;
    text-align: center;
    white-space: normal; /* Permite que el texto haga salto de línea */
  }

  .sought__actions {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }

  .action-button {
    width: 120px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .sought {
    padding: 20px;
  }

  .sought__info h1 {
    font-size: 2rem;
  }

  .sought__info h2 {
    font-size: 1.8rem;
  }

  .sought__info p {
    font-size: 1.2rem;
  }

  .action-button {
    width: 100px;
    height: 160px;
  }

  .action-button span {
    font-size: 1rem;
  }

  .sought__actions {
    flex-wrap: wrap; /* Permite que los botones se acomoden en varias filas */
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .sought__info h1 {
    font-size: 1.5rem;
  }

  .sought__info h2 {
    font-size: 1.2rem;
  }

  .sought__info p {
    font-size: 1rem;
  }

  .action-button {
    width: 80px;
    height: 120px;
  }

  .action-button span {
    font-size: 0.8rem;
  }
}

@media (min-width: 1201px) and (max-width: 1799px) {
  .sought__content {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .sought__info {
    width: 80%; /* Ajusta el ancho para centrarse */
    margin-right: 0; /* Elimina el margen derecho */
    text-align: center; /* Centra el texto */
  }

  .sought__actions {
    width: 100%; /* Asegura que los botones ocupen el espacio disponible */
    justify-content: center;
    gap: 20px; /* Espaciado entre los botones */
  }
}
</style>