<script setup>
import { computed } from "vue";
import { useEspeciesData } from "@/stores/dashboard/speciesData";

const especies = useEspeciesData();

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
    <h1 class="reporte__heading">Datos generales de las especies</h1>
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
        <a class="boton" href="#"
          ><font-awesome-icon
            class="boton__excel"
            :icon="['fas', 'file-excel']"
        /></a>
        <a class="boton" href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
        <a class="boton" href="#"
          ><font-awesome-icon class="boton__print" :icon="['fas', 'print']"
        /></a>
      </div>
    </div>
    <hr />
    <!-- aqui el for para recorer la data del store -->
    <main class="reporte__grid">
      <div
        class="card"
        v-for="especie in especies.displayedEspeciesData"
        :key="especie.cod_especie"
      >
        <div class="card__encabezado">
          <p class="card__nombre">
            {{ especie.nom_comunes }}
          </p>
          <p class="card__cientifico">
            {{ especie.nombre_cientifico }}
          </p>
        </div>
        <hr />
        <div class="card__contenido">
          <div class="card__datos">
            <p class="card__descripcion">
              <font-awesome-icon :icon="['fas', 'hashtag']" /> Código especie:
            </p>
            <p class="card__dato">{{ especie.cod_especie }}</p>
          </div>
          <div class="card__datos">
            <p class="card__descripcion">
              <font-awesome-icon :icon="['fas', 'magnifying-glass-location']" />
              Monitoreos:
            </p>
            <p class="card__dato">{{ especie.monitoreos }}</p>
          </div>
          <div class="card__datos">
            <p class="card__descripcion">
              <font-awesome-icon :icon="['fas', 'vial']" /> Muestras:
            </p>
            <p class="card__dato">{{ especie.muestras }}</p>
          </div>
          <div class="card__datos">
            <p class="card__descripcion">
              <font-awesome-icon :icon="['fas', 'dna']" /> Evaluados:
            </p>
            <p class="card__dato">{{ especie.evaluados }}</p>
          </div>
        </div>
      </div>
    </main>
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
      <h1 v-if="especies.especiesData.length == 0" class="validacion__heading">
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
</template>

<style scoped>
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
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--primary);
  text-align: center;
}
@media (min-width: 768px) {
  .buscador__input {
    padding: 0.7rem;
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
.boton__print {
  color: rgb(87, 82, 82);
}

/* estilos contenido main */

/* card */
.reporte__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .reporte__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .reporte__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.card {
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.card__encabezado {
  text-align: center;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.card__nombre {
  font-weight: 900;
  margin: 0;
}
.card__cientifico {
  margin: 0;
  padding: 0;
}
.card__contenido {
  padding: 0 1rem;
}
.card__datos {
  display: flex;
  justify-content: space-between;
}
.card__dato {
  font-weight: 900;
}
.card__dato,
.card__descripcion {
  margin: 4px 0;
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