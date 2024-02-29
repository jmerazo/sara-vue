<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useFamiliasStore } from "@/stores/families";
import { ref, onMounted, computed } from "vue";

import Family from "@/components/Family.vue";

const familias = useFamiliasStore();

//quitar valores previos del filtro
onBeforeRouteLeave((to, from, next) => {
  familias.quitarFiltroFamilia();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = familias.currentPage;
  const totalPages = familias.totalPages;
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
    <!-- header vista familia -->
    <header class="header__familias">
      <h1 class="familias__heading">Listado de familias</h1>
      <div class="header__contenido">
        <label class="header__label">Buscar </label>
        <input
          class="header__buscador"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="familias.buscarTermino($event.target.value)"
        />
      </div>
    </header>
    <!-- fin header vista familia -->
    <hr />
    <main class="familias">
      <h3 class="familias__enunciado" v-if="familias.familias.length != 0">
        En el contexto de las especies forestales y la taxonomía biológica, una
        "familia" es una categoría de clasificación que agrupa a un conjunto de
        plantas que comparten ciertas características similares y están
        relacionadas evolutivamente.
      </h3>
      <div class="familias__grid">
        <Family
          v-for="familia in familias.displayedFamilias"
          :key="familia.familia"
          :familia="familia"
        >
        </Family>
      </div>
    </main>

    <!-- paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="familias.currentPage > 1"
          @click="familias.changePage(familias.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="familias.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === familias.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="familias.currentPage < familias.totalPages"
          @click="familias.changePage(familias.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1 v-if="familias.noResultados" class="validacion__heading">
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
</template>

<style scoped>
.familias__enunciado{
  color: var(--gris);
  text-align: justify;
  margin-bottom: 3rem;
  font-size: .8rem;
}
/* Header */
.header__familias {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .header__familias {
    margin-top: 2rem;
  }
  .familias__enunciado{
    font-size: 1rem;
  }
}

.familias__heading {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .familias__heading {
    font-size: 1.4rem;
  }
}

.header__contenido {
  display: flex;
  gap: 1rem;
  margin: 2rem 0 1.5rem 0;
  align-items: center;
}

@media (min-width: 768px) {
  .header__contenido {
    display: flex;
    gap: 1rem;
    margin: 3rem 0 2rem 0;
    justify-content: flex-end;
  }
}

/* main listado de especies */
.familias {
  margin-top: 1.5rem;
}
@media (min-width: 768px) {
  .familias {
    margin-top: 2rem;
  }
}
.familias__grid {
  display: grid;
  gap: 2rem;
}
@media (min-width: 768px) {
  .familias__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1300px) {
  .familias__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1820px) {
  .familias__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}


</style>