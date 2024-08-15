<script setup>
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "@/stores/species";
import { useModalStore } from "@/stores/modal";
import {
  descargarExcel,
  descargarPdf,
  obtenerFecha,
  getFullImageUrl,
} from "@/helpers";


//componentes
import LoadingData from "@/components/shared/LoadingData.vue";
import ModalForestSpecieUpdate from "@/components/dashboard/modals/ModalForestSpecieUpdate.vue";
import ModalForestSpecieAdd from "@/components/dashboard/modals/ModalForestSpecieAdd.vue";

const especies = useEspeciesStore();
const modal = useModalStore();

console.log('especies: ', especies)

//prueba para protección de eliminación de una especie
const delSpecie = (id) => {
  const confirmed = window.confirm(
    "¿Estás seguro de que deseas eliminar este registro?"
  );

  if (confirmed) {
    const securityCode = window.prompt("Ingresa el código de seguridad:");

    // Verifica el código de seguridad
    if (securityCode === "dsafkjn@#$%fef1sef513f1fg321aegf3e1") {

      // Elimina el registro
      return
    } else {
      // Código de seguridad incorrecto
      alert("Código de seguridad incorrecto");
    }
  }
};

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = especies.currentPage;
  const totalPages = especies.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});
</script>

<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">
      Especies forestales
    </h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input class="buscador__input" type="text" placeholder="Escríbe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)" />
      </div>
      <div class="botones__descarga">
        <a @click="
            descargarExcel(
              especies.datosImport,
              `Listado de especies forestales - ${obtenerFecha()}`
            )
            " class="boton" href="#"><font-awesome-icon class="boton__excel" :icon="['fas', 'file-excel']" /></a>
        <a @click="
            descargarPdf(
              especies.datosImport,
              `Listado de especies forestales - ${obtenerFecha()}`,
              5,
              1
            )
            " class="boton" href="#"><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']" /></a>
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <LoadingData v-if="especies.cargando" />

    <!-- listado de cards -->
    <main class="reporte__grid" v-else>
      <div class="card" v-for="especie in especies.displayedEspecies" v-bind:key="especie.cod_especie">
        <div class="card__grid" v-if="especie.code_specie">
          <div 
            class="card__imagen" 
            style="height: 250px;" 
            :style="{
              backgroundImage: especie.images && especie.images.length > 0 
                ? `url(${getFullImageUrl(especie.images[0].img_general)})` 
                : `url(${getFullImageUrl(undefined)})`
            }">
          </div>
          <div class="card__contenido">

            <div class="card__edit">
              <div class="card__edit--button">
                <svg @click="especies.selectedForestSpecieUpdate(especie.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z">
                  </path>
                </svg>
              </div>
            </div>
            <p class="card__titulo">{{ especie.vernacularName }}</p>
            <p class="card__subtitulo">{{ especie.nombre_cientifico }}</p>
            <p class="card__subtitulo">
              Familia: <span class="card__dato">{{ especie.family }}</span>
            </p>
            <p class="card__subtitulo">
              Código de especie:
              <span class="card__dato">{{ especie.code_specie }}</span>
            </p>
            
          </div>
        </div>
      </div>

      <div @click="modal.handleClickModalForestSpecieAdd()" class="agregar"></div>
  
    </main>
        <!-- paginador -->
        <section class="paginador">
        <div class="paginador__botones">
          <button class="paginador__boton paginador__boton--anterior" v-if="especies.currentPage > 1"
            @click="especies.changePage(especies.currentPage - 1)">
            <font-awesome-icon :icon="['fas', 'angles-left']" />
          </button>

          <button v-for="page in displayedPageRange" :key="page" @click="especies.changePage(page)"
            class="paginador__boton" :class="{
            'paginador__boton-actual': page === especies.currentPage,
          }">
            {{ page }}
          </button>
          <button class="paginador__boton paginador__boton--siguiente" v-if="especies.currentPage < especies.totalPages"
            @click="especies.changePage(especies.currentPage + 1)">
            <font-awesome-icon :icon="['fas', 'angles-right']" />
          </button>
        </div>
      </section>
      <!--fin paginador -->
      <!-- texto validacion buscador -->
      <section class="validacion__contenido">
        <h1 v-if="especies.noResultados && !especies.cargando" class="validacion__heading">
          No hay resultados de búsqueda
        </h1>
      </section>
      <!--fin texto validacion buscador -->
    <ModalForestSpecieUpdate />
    <ModalForestSpecieAdd />
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
    margin: 0 0 3rem 0;
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

.reporte__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .reporte__grid {
    grid-template-columns: repeat(2fr, 1fr);
  }
}

@media (min-width: 992px) {
  .reporte__grid {
    grid-template-columns: repeat(2, 1fr);
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
  font-size: 1.4rem;
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

/* cards */
.card {
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card__grid {
  display: grid;
  grid-template-rows: 0.9fr 1fr;
  transition: transform 0.3s ease;
}

.card__grid:hover {
  transform: scale(1.02);
}

@media (min-width: 768px) {
  .card__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
  }
}

.card__contenido {
  padding: 1rem 1rem 0 1rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  /* justify-content: space-between; */
  align-content: center;
}

@media (min-width: 768px) {
  .card__contenido {
    gap: 0.5rem;
    padding: 1rem;
  }
}

.card__imagen {
  background-size: cover;
  background-repeat: no-repeat;
}

.card__titulo {
  font-weight: 600;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 4rem;
}

.card__subtitulo {
  margin: 0;
  padding: 0;
  text-align: center;
}

.card__dato {
  font-weight: 600;
}

/* button edit */
.card__edit--button svg {
  width: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card__edit--button svg:hover {
  color: var(--primary);
}

.card__edit--button {
  position: absolute;
  display: flex;
  flex-direction: row;
}

.card__edit {
  height: 20px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: -4rem;
}
</style>