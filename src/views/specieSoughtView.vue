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
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#ffffff" d="M18 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm-6 11H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m3-5H9a1 1 0 0 0-.117 1.993L9 10h6a1 1 0 0 0 .117-1.993z"/></g></svg>
          <span>Protocolo</span>
        </button>
        <button class="action-button" @click="showComponent('gallery')">
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd"><path d="M16 6.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M13.25 8a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0"/><path d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19M3.995 20.005c-.57-.57-.897-1.34-1.069-2.619c-.153-1.141-.173-2.597-.176-4.546l1.495-1.308a1.55 1.55 0 0 1 2.117.07l4.29 4.29a2.75 2.75 0 0 0 3.526.306l.298-.21a2.25 2.25 0 0 1 2.799.168l3.223 2.902q.053.047.111.083a3 3 0 0 1-.604.864c-.57.57-1.34.897-2.619 1.069c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069m2.62-17.079c-1.279.172-2.05.5-2.62 1.069c-.569.57-.896 1.34-1.068 2.619c-.145 1.08-.17 2.44-.175 4.233l.507-.444a3.05 3.05 0 0 1 4.165.139l4.29 4.29a1.25 1.25 0 0 0 1.602.138l.298-.21a3.75 3.75 0 0 1 4.665.281l2.774 2.497l.022-.152c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176"/></g></svg>
          <span>Galería</span>
        </button>
        <button class="action-button" @click="showComponent('map')">
          <!-- <img src="/icons/map-icon.png" alt="Mapa" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><path fill="#ffffff" d="M15.5 12c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.7-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5m4-12a.5.5 0 0 1 .5.5v9.31c-.58-.55-1.25-1-2-1.31V4.7l-3 1.16V10c-.7.07-1.38.24-2 .5V5.87l-4-1.4V16.5c0 .64.09 1.26.26 1.84L8 17.9l-5.34 2.07l-.16.03a.5.5 0 0 1-.5-.5V4.38c0-.23.15-.41.36-.48L8 2l6 2.1l5.34-2.07zM4 5.46v11.85l3-1.16V4.45z"/></svg>
          <span>Mapa</span>
        </button>
        <button class="action-button" @click="showComponent('download')">
          <!-- <img src="/icons/download-icon.png" alt="Descargas" /> -->
          <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24"><g fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd"><path d="M10.75 2h2c2.828 0 4.243 0 5.121.879c.879.878.879 2.293.879 5.121v8c0 2.828 0 4.243-.879 5.121c-.878.879-2.293.879-5.121.879h-2c-2.828 0-4.243 0-5.121-.879c-.879-.878-.879-2.293-.879-5.121V8c0-2.828 0-4.243.879-5.121C6.507 2 7.922 2 10.75 2M8 13a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 8 13m0-4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6A.75.75 0 0 1 8 9m0 8a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 8 17"/><path d="M1.75 4.25A.75.75 0 0 1 2.5 5v14A.75.75 0 0 1 1 19V5a.75.75 0 0 1 .75-.75m20 0a.75.75 0 0 1 .75.75v14a.75.75 0 0 1-1.5 0V5a.75.75 0 0 1 .75-.75" opacity=".5"/></g></svg>
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