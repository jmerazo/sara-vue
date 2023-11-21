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
      <h3 v-if="familias.familias.length != 0">
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
/* Header */
.header__familias {
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .header__familias {
    margin-top: 5rem;
  }
}

.familias__heading {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .familias__heading {
    font-size: 3rem;
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
/* main listado de especies */
.familias {
  margin-top: 4rem;
}
@media (min-width: 768px) {
  .familias {
    margin-top: 6rem;
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

/* Paginador */
.paginador {
  margin: 3rem 0;
}
.paginador__botones {
  display: flex;
  justify-content: center;
}
.paginador__boton {
  font-weight: 700;
  font-size: 2rem;
  padding: 1rem;
}
.paginador__boton-actual {
  background-color: var(--primary);
}
.paginador__boton--anterior {
  border-bottom-left-radius: 20px;
}
.paginador__boton--siguiente {
  border-bottom-right-radius: 20px;
}

/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 2rem;
}
</style>