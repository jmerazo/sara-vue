<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "../stores/species";
import { ref, onMounted, computed } from "vue";

import Species from "@/components/Species.vue";

const especies = useEspeciesStore();

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
    <!-- header vista especie -->
    <header class="header__especies">
      <h1 class="especies__heading">Listado de especies</h1>
      <div class="header__contenido">
        <label class="header__label">Buscar </label>
        <input
          class="header__buscador"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)"
        />
      </div>
    </header>
    <!-- fin header vista especie -->
    <hr />
    <!-- listado especies -->
    <main class="especies">
      <div class="especies__grid">
        <Species
          v-for="especie in especies.displayedEspecies"
          :key="especie.ShortcutID"
          :especie="especie"
        >
        </Species>
      </div>
    </main>
    <!-- fin listado especies -->

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
  </div>
</template>

<style scoped>
/* header */
.header__especies {
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .header__especies {
    margin-top: 5rem;
  }
}

.especies__heading {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .especies__heading {
    font-size: 3.5rem;
  }
}

.header__contenido {
  display: flex;
  gap: 1rem;
  margin: 3rem 0 1.5rem 0;
  align-items: center;
}

@media (min-width: 768px) {
  .header__contenido {
    display: flex;
    gap: 1rem;
    margin: 5rem 0 2rem 0;
    justify-content: flex-end;
  }
}

/* buscador */
.header__label {
  font-weight: 700;
}

@media (min-width: 768px) {
  .header__label {
    font-size: 1.5rem;
  }
}

.header__buscador {
  border: 1px solid var(--gris);
  padding: 0.5rem;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .header__buscador {
    border: 2px solid var(--gris);
    padding: 1rem;
    width: 33rem;
  }
}

/* main */
.especies {
  margin-top: 4rem;
}
@media (min-width: 768px) {
  .especies {
    margin-top: 6rem;
  }
}
.especies__grid {
  display: grid;
  gap: 2rem;
}
@media (min-width: 768px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Paginador */
.paginador {
  margin: 3rem 0;
  
}
.paginador__botones {
  display: flex;
  justify-content: center;
  
  
}
.paginador__boton{
  font-weight: 700;
  font-size: 2rem;
  padding: 1rem;
}
.paginador__boton-actual{
  background-color: var(--primary);
}
.paginador__boton--anterior{
  border-bottom-left-radius: 20px;
}
.paginador__boton--siguiente{
  border-bottom-right-radius: 20px;
}

/* validacion */
.validacion__contenido{
  margin-bottom: 8rem;
}
.validacion__heading{
  font-size: 2rem;
}
</style>