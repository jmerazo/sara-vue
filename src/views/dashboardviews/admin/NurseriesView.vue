<script setup>
import { computed} from "vue";
import { onBeforeRouteLeave } from "vue-router";

//stores
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";

//components
import ModalNurseryAssign from "@/components/dashboard/modals/ModalNurseryAssign.vue";
import ModalNurseryUpdate from "@/components/dashboard/modals/ModalNurseryUpdate.vue";
import ModalNurserySpeciesList from "@/components/dashboard/modals/ModalNurserySpeciesList.vue";
import Nursery from "@/components/dashboard/cards/Nursery.vue";
import LoadingData from "@/components/shared/LoadingData.vue";

//helpers
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";


const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  nurseriesStore.removeFilterProperty();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = nurseriesStore.currentPage;
  const totalPages = nurseriesStore.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

function deleteNursery(id, nu) {
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar el vivero ${nu}?`
  );
  if (!confirmDelete) {
    return;
  }
  nurseriesStore.deleteNursery(id);
}
</script>

<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">
      Listado de viveros
    </h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input class="buscador__input" type="text" placeholder="Escríbe un término de búsqueda"
          @input="nurseriesStore.searchTerm($event.target.value)" />
      </div>
      <div class="botones__descarga">
        <a @click="
            descargarExcel(
              nurseriesStore.datosImport,
              `Listado de viveros SARA - ${obtenerFecha()}`
            )
            " class="boton" href="#"><font-awesome-icon class="boton__excel" :icon="['fas', 'file-excel']" /></a>
        <a @click="
            descargarPdf(
              nurseriesStore.datosImport,
              `Listado de usuarios SARA - ${obtenerFecha()}`,
              8,
              1
            )
            " class="boton" href="#"><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']" /></a>
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <div class="nurseries__grid">
      <div v-for="nursery in nurseriesStore.displayedNursery" :key="nursery.id">
        <Nursery :nursery="nursery" :deleteNursery="deleteNursery"/>
      </div>
    </div>

    <LoadingData v-if="nurseriesStore.cargando" />


    <main v-else>
     
      
      <!-- paginador -->
      <section class="paginador">
        <div class="paginador__botones">
          <button class="paginador__boton paginador__boton--anterior" v-if="nurseriesStore.currentPage > 1"
            @click="nurseriesStore.changePage(nurseriesStore.currentPage - 1)">
            <font-awesome-icon :icon="['fas', 'angles-left']" />
          </button>

          <button v-for="page in displayedPageRange" :key="page" @click="nurseriesStore.changePage(page)"
            class="paginador__boton" :class="{
            'paginador__boton-actual': page === nurseriesStore.currentPage,
          }">
            {{ page }}
          </button>
          <button class="paginador__boton paginador__boton--siguiente"
            v-if="nurseriesStore.currentPage < nurseriesStore.totalPages"
            @click="nurseriesStore.changePage(nurseriesStore.currentPage + 1)">
            <font-awesome-icon :icon="['fas', 'angles-right']" />
          </button>
        </div>
      </section>
      <!--fin paginador -->
      <!-- texto validacion buscador -->
      <section class="validacion__contenido">
        <h1 v-if="nurseriesStore.noResultados && !nurseriesStore.cargando" class="validacion__heading">
          No hay resultados de búsqueda
        </h1>
      </section>
      <!--fin texto validacion buscador -->

    </main>
    <ModalNurseryAssign />
    <ModalNurserySpeciesList />
    <ModalNurseryUpdate />
  </div>
</template>

<style scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.1rem;
  margin: 2rem;
}

@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin:0 0 3rem 0;
  }
}

.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
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
    margin-right: 1rem;
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
  color: var(--rojo);
}

/* main */
/* listado */
.nurseries__grid {
  display: grid;
  gap: 1.4rem;
  margin-top: 5rem;
}

@media (min-width: 768px) {
  .nurseries__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>