<script setup>
import { useConsultaStore } from '../../../stores/consulta';

//components
import LoadingData from "@/components/shared/LoadingData.vue";
import DownloadFile from '@/components/species/utils/DownloadFile.vue'
const consulta = useConsultaStore()
</script>

<template>
    <div class="fullscreen-container">
      <!-- Botón de cerrar -->
      <button class="close-button" @click="$emit('close')">
        &times;
      </button>
  
      <!-- Contenido principal de descargas -->
      <div class="downloads-content">
        <LoadingData
          :color="'white'"
          v-if="!consulta.specie.code_specie"
        />
        <div v-if="!noProtocol">
          <DownloadFile />
        </div>
        <p
          v-else
          class="no-documents-message"
        >
          No hay documentos disponibles
        </p>
      </div>
    </div>
</template>

<style scoped>
/* Contenedor principal */
.fullscreen-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alinear contenido hacia arriba */
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* Habilitar scroll vertical */
  overflow-x: hidden; /* Prevenir scroll horizontal */
  min-height: 100vh; /* Ocupa toda la altura de la pantalla */
  max-height: 100vh; /* Limitar la altura a la pantalla */
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
  overflow-y: auto; /* Asegura que este contenido también permita scroll si es necesario */
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adaptable */
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Tarjetas individuales */
.download-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
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

/* Botón de descarga */
.download-button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.download-button:hover {
  background-color: #0056b3;
}

/* Botón de cerrar */
.close-button {
  position: fixed;
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

/* ---- Responsividad ---- */

/* Dispositivos grandes (pantallas anchas) */
@media (min-width: 1200px) {
  .download-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

/* Tablets */
@media (max-width: 1199px) {
  .downloads-content {
    max-width: 960px;
  }

  .download-cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
  }
}

/* Móviles */
@media (max-width: 767px) {
  .downloads-content {
    max-width: 100%;
  }

  .download-cards {
    grid-template-columns: 1fr; /* Una columna en móviles */
    gap: 1rem;
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

/* Tablets */
@media (max-width: 1199px) {
  .downloads-content {
    max-width: 960px;
  }
}

/* Móviles */
@media (max-width: 767px) {
  .downloads-content {
    max-width: 100%;
  }

  .download-cards {
    grid-template-columns: 1fr; /* Una columna en móviles */
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