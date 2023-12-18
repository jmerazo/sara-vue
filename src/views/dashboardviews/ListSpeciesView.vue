<script setup>
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "@/stores/species";

import {useCantidateStore} from '@/stores/dashboard/reports/SpecieCanditates'
import {useSpecieMonitoriong} from '@/stores/dashboard/reports/SpecieMonitoring'

const especies = useEspeciesStore();

const candidatos = useCantidateStore()
const especieMonitoreos = useSpecieMonitoriong()
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

//url dinámica de ejemplo
const url = "/img/arbol__especie.jpg";
</script>
<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">Reporte de monitoreos y candidatos</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
        class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)"
        />
      </div>
      <div class="botones__descarga">
      
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <!-- listado de cards -->
    <main class="reporte__grid">
      <div
        class="card"
        v-for="especie in especies.displayedEspecies"
        v-bind:key="especie.cod_especie"
      >
        <div class="card__grid" v-if="especie.cod_especie">
          <div
            class="card__imagen"
            :style="{ backgroundImage: `url(${url})` }"
          ></div>
          <div class="card__contenido">
            <p class="card__titulo">{{ especie.nom_comunes }}</p>
            <p class="card__subtitulo">{{ especie.nombre_cientifico }}</p>
            <p class="card__subtitulo">
              Familia: <span class="card__dato">{{ especie.familia }}</span>
            </p>
            <p class="card__subtitulo">
              Código de especie:
              <span class="card__dato">{{ especie.cod_especie }}</span>
            </p>
            <div class="card__botones">
              <button
                class="boton__primario"
                @click="candidatos.verCandidatosEspecie(especie.nom_comunes)"
              >
                <font-awesome-icon :icon="['fas', 'leaf']" /> Ver candidatos
              </button>
              <button
                class="boton__secundario"
                @click="
                  especieMonitoreos.verMonitoreosEspecie(
                    especie.cod_especie,
                    especie.nom_comunes
                  )
                "
              >
                <font-awesome-icon :icon="['fas', 'eye']" /> Ver Monitoreos
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- fin listado de cards -->
  </div>

  <!-- paginador -->
  <section class="paginador">
    <div class="paginador__botones">
      <button
        class="paginador__boton paginador__boton--anterior"
        v-if="especies.currentPage > 1"
        @click="especies.changePage(especies.currentPage - 1)"
      >
        <font-awesome-icon :icon="['fas', 'angles-left']" />
      </button>

      <button
        v-for="page in displayedPageRange"
        :key="page"
        @click="especies.changePage(page)"
        class="paginador__boton"
        :class="{ 'paginador__boton-actual': page === especies.currentPage }"
      >
        {{ page }}
      </button>
      <button
        class="paginador__boton paginador__boton--siguiente"
        v-if="especies.currentPage < especies.totalPages"
        @click="especies.changePage(especies.currentPage + 1)"
      >
        <font-awesome-icon :icon="['fas', 'angles-right']" />
      </button>
    </div>
  </section>
  <!--fin paginador -->
  <!-- texto validacion buscador -->
  <section class="validacion__contenido">
    <h1 v-if="especies.noResultados" class="validacion__heading">
      No hay resultados de búsqueda
    </h1>
  </section>
  <!--fin texto validacion buscador -->
</template>

<style scope>

/* encabezado de la vista */
.reporte__heading {
  font-size: 1.3rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.8rem;
    margin: 3rem;
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



/* cards */
.card {
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.card__grid {
  display: grid;
  grid-template-rows: 0.9fr 1fr;
  transition: transform .3s ease;
}
.card__grid:hover{
  transform: scale(1.02);
}
@media (min-width: 768px) {
  .card__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
  }
}
.card__contenido {
  padding: 1rem 1rem 0  1rem;
  display: flex;
  gap: .3rem;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
@media (min-width: 768px){
  .card__contenido{
    gap: .5rem;
    padding: 1rem;
  }
}
.card__imagen {
  background-size: cover;
  background-repeat: no-repeat;
}
.card__titulo{
  font-weight: 900;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
}
.card__subtitulo{
  margin: 0;
  padding: 0;
  text-align: center;
}
.card__dato{
  font-weight: 900;
}
.boton__primario{
  color: var(--blanco);
  background-color: var(--primary);
  border-radius: 3px;
  padding: .3rem;
}

.boton__secundario{
  color: var(--blanco);
  background-color: var(--secondary);
  border-radius: 3px;
  padding: .3rem;
}
.boton__primario,
.boton__secundario{
  transition: background-color .3s ease;
}
.boton__primario:hover{
  background-color: var(--primary-hover);
}
.boton__secundario:hover{
  background-color: var(--secondary-hover);
}
.card__botones{
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-top: 1rem;
}
/* Paginador */
.paginador {
  margin: 2rem 0 0 0;
}
.paginador__botones {
  display: flex;
  justify-content: center;
}
.paginador__boton {
  font-weight: 700;
  font-size: 1rem;
  padding: 0.3rem;
}
@media (min-width: 768px) {
  .paginador__boton {
    font-size: 1.3rem;
  }
}
.paginador__boton-actual {
  background-color: rgb(183, 211, 183);
}
.paginador__boton--anterior {
  border-bottom-left-radius: 10px;
  color: var(--blanco);
  background-color: var(--primary);
}
.paginador__boton--siguiente {
  border-bottom-right-radius: 10px;
  color: var(--blanco);
  background-color: var(--primary);
}

/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 1.5rem;
}
</style>