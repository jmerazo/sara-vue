<script setup>
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";
import { descargarExcels, descargarPdfs, obtenerFecha } from "@/helpers";

//componentes
import LoadingData from "@/components/shared/LoadingData.vue";
import ModalFormMonitoring from "@/components/dashboard/modalsForm/monitoring/ModalFormMonitoring.vue";
import MonitoringCardVue from "@/components/dashboard/cards/MonitoringCard.vue";

const report = useGeneralMonitoring();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  report.quitarFiltroBuscado();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = report.currentPage;
  const totalPages = report.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

//furncion para mostrar el contenido monitoreos
function toggleDetalles(contenedor) {
  const contenido = document.getElementById(contenedor);

  if (contenido.classList.contains("active")) {
    contenido.classList.remove("active");
  } else {
    contenido.classList.add("active");
  }
}
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Reporte general de monitoreos</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          @input="report.buscarTermino($event.target.value)"
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
        />
      </div>
      <div class="botones__descarga" v-if="report.monitoringData.length >= 1">
        <!-- Descargar datos actuales en Excel -->
        <a
          @click="report.downloadDataAll(false).then(() => {
            descargarExcels(
              report.datosImport,
              `Reporte general de monitoreos - ${obtenerFecha()}`
            );
          })"
          class="boton tooltip"
          href="#"
        >
          <font-awesome-icon class="boton__excel" :icon="['fas', 'file-excel']" />
          <span class="tooltip-text">Descargar los monitoreos actuales en Excel</span>
        </a>

        <!-- Descargar todos los datos en Excel -->
        <a
          @click="async () => {
            await report.downloadDataAll(true);
            descargarExcels(
              report.datosImport,
              `Reporte general de monitoreos - ${obtenerFecha()}`
            );
          }"
          class="boton tooltip"
          href="#"
        >
          <font-awesome-icon class="boton__excel__all" :icon="['fas', 'file-excel']" />
          <span class="tooltip-text">Descargar todos los monitoreos en Excel</span>
        </a>
      </div>
    </div>
    <hr />
    <LoadingData v-if="report.cargando" />
    <main class="monitoreos__grid">
      <div v-for="(monitoreo, index) in report.displayedData" :key="index">
        <MonitoringCardVue :monitoreo="monitoreo" :index="index" />
      </div>
    </main>
    <!-- paginador -->
    <section class="paginador">
      <div class="paginador__informacion">
        <!-- Muestra la página actual y el total de páginas -->
        Página {{ report.currentPage }} de {{ report.totalPages }}
      </div>
      
      <div class="paginador__botones">
        <!-- Botón para ir al inicio -->
        <button
          class="paginador__boton paginador__boton--inicio"
          v-if="report.currentPage > 1"
          @click="report.changePage(1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" /> <!-- Icono de ir al inicio -->
        </button>

        <!-- Botón para ir a la página anterior -->
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="report.currentPage > 1"
          @click="report.changePage(report.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <!-- Botones de página intermedia -->
        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="report.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === report.currentPage }"
        >
          {{ page }}
        </button>
        
        <!-- Botón para ir a la página siguiente -->
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="report.currentPage < report.totalPages"
          @click="report.changePage(report.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

        <!-- Botón para ir al final -->
        <button
          class="paginador__boton paginador__boton--final"
          v-if="report.currentPage < report.totalPages"
          @click="report.changePage(report.totalPages)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" /> <!-- Icono de ir al final -->
        </button>
      </div>
    </section>

    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
        v-if="report.monitoringData.length == 0 && !report.cargando"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
  <!-- <div
      
      @click="report.selectMonitoring({},false)"
      class="agregar"
    ></div> -->
  <ModalFormMonitoring/>
</template>

<style scoped>

/*  estilos encabezado reporte */
.reporte__heading {
  font-size: 1.1rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin: 3rem;
  }
}

.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.6rem;
}
@media (min-width: 768px) {
  .contenido__header {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 1rem 2rem 1rem;
  }
}

/* buscador */
.buscador__label {
  display: none;
}
@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    margin-right: 0.5rem;
  }
}
.buscador__input {
  width: 300px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid var(--primary);
  text-align: center;
}
@media (min-width: 768px) {
  .buscador__input {
    padding: 0.5rem;
    text-align: left;
  }
}
/* descargas */
.botones__descarga {
  display: flex;
  gap: 1rem;
}
.boton {
  font-size: 1.5rem;
}
@media (min-width: 768px) {
  .boton {
    font-size: 1.8rem;
  }
}
.boton__excel {
  color: rgb(6, 114, 6);
}
.boton__excel__all {
  color: rgb(184, 50, 50);
}

.boton {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* Estilo del tooltip */
.tooltip .tooltip-text {
  visibility: hidden;
  width: 180px;
  font-size: 1.2rem;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Posición superior al botón */
  left: 50%;
  margin-left: -90px; /* Centrar el tooltip */
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none; /* Evita interferencias en el hover */
}

/* Flecha del tooltip */
.tooltip .tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%; /* Alinear con el borde inferior del tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}

/* Mostrar el tooltip al pasar el cursor por encima */
.boton:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
/* seccion especie */

.monitoreos__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .monitoreos__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .monitoreos__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1820px) {
  .monitoreos__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>