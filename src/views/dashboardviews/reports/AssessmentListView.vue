<script setup>
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGeneralEvaluations } from "@/stores/dashboard/reports/generalEvaluations";
import { descargarExcels, descargarPdfs, obtenerFecha } from "@/helpers";
import { useModalStore } from "@/stores/modal";
//componentes
import LoadingData from "@/components/shared/LoadingData.vue";
import ModalCandidate from "@/components/dashboard/modals/ModalCandidate.vue";
import AssessmentCard from "@/components/dashboard/cards/AssessmentCard.vue"

const modal = useModalStore();
const report = useGeneralEvaluations();

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

const customHeaders = [
  ["Fecha de evaluación","Código de expediente","Especie", "Nombre científico"]
];
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Reporte general de evaluaciones</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input @input="report.buscarTermino($event.target.value)" class="buscador__input" type="text"
          placeholder="Escríbe un término de búsqueda" />
      </div>
      <div class="botones__descarga" v-if="displayedPageRange.length >= 1">
        <a @click="
          descargarExcels(
            report.datosImport,
            `Reporte general de evaluaciones - ${obtenerFecha()}`
          )
          " class="boton" href="#"><font-awesome-icon class="boton__excel" :icon="['fas', 'file-excel']" /></a>
        <a @click="
          descargarPdfs(
            report.datosImport,
            `Reporte general de evaluaciones - ${obtenerFecha()}`,
            4,
            0
          )
          " class="boton" href="#"><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']" /></a>
      </div>
    </div>
    <hr />
    <LoadingData v-if="report.cargando" />
    <main class="evaluaciones__grid">
      <div v-for="(evaluacion, index) in report.displayedData" :key="index">
        <AssessmentCard :evaluacion="evaluacion" :index="index" />
      </div>
    </main>
    <!-- paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button class="paginador__boton paginador__boton--inicio" v-if="report.currentPage > 1"
          @click="report.goToFirstPage()">
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </button>
        <button class="paginador__boton paginador__boton--anterior" v-if="report.currentPage > 1"
          @click="report.changePage(report.currentPage - 1)">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <button v-for="page in displayedPageRange" :key="page" @click="report.changePage(page)" class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === report.currentPage }">
          {{ page }}
        </button>
        <button class="paginador__boton paginador__boton--siguiente" v-if="report.currentPage < report.totalPages"
          @click="report.changePage(report.currentPage + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>
        <!-- Botón de final -->
        <button class="paginador__boton paginador__boton--final" v-if="report.currentPage < report.totalPages"
            @click="report.goToLastPage()">
            <font-awesome-icon :icon="['fas', 'angle-double-right']" />
          </button>
        </div>
        <!-- Mostrar el total de páginas -->
        <div class="paginador__info">
          Página {{ report.currentPage }} de {{ report.totalPages }}
        </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1 v-if="report.evaluacionData.length == 0 && !report.cargando" class="validacion__heading">
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
    <div @click="modal.handleClickModalCandidateAdd()" class="agregar"></div>
    <ModalCandidate />
  </div>
</template>

<style scoped>
.paginador {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* generales */
.dato {
  font-weight: 900;
  color: var(--gris);
  opacity: 0.9;
}

.sinInfo {
  color: rgb(240, 176, 176);
}

.recoger {
  margin: 0;
  text-align: center;
  font-size: 1rem;
}

.recoger:hover {
  cursor: pointer;
  color: var(--primary);
}

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

.boton__pdf {
  color: rgb(184, 50, 50);
}

/* seccion especie */

.evaluaciones__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .evaluaciones__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .evaluaciones__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1820px) {
  .evaluaciones__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>