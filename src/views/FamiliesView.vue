<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useFamiliasStore } from "@/stores/families";
import { ref, computed } from "vue";

import Family from "@/components/Family.vue";

const familias = useFamiliasStore();
const valueSerached = ref("");
const isSearching = computed(() => valueSerached.value !== "");

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
  <div>
    <!-- header vista familia -->
    <header class="header__familias">
      <div class="header__contenido">
        <div class="header__formulario">
          <h1 class="familias__heading">Listado de Familias forestales</h1>
          <div class="formulario">
            <input
              class="formulario__input"
              type="text"
              placeholder="Escríbe el nombre de la familia"
              v-model="valueSerached"
              @input="familias.buscarTermino($event.target.value)"
            />
            <div class="formulario__icono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <p class="formulario__resultados" v-if="isSearching">
            {{ familias.displayedFamilias.length }}
            {{
              familias.displayedFamilias.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"
            }}
            para {{ valueSerached }}
          </p>
          <p class="formulario__resultados" v-else>
            Buscar una Familia y ver las especies que la componen
          </p>
        </div>
        <h3 class="familias__enunciado" v-if="familias.familias.length != 0">
          En el contexto de las especies forestales y la taxonomía biológica,
          una "familia" es una categoría de clasificación que agrupa a un
          conjunto de plantas que comparten ciertas características similares y
          están relacionadas evolutivamente.
        </h3>
      </div>
    </header>
    <!-- fin header vista familia -->

    <main class="familias">
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
.familias__enunciado {
  position: relative;
  font-weight: 100;
  color: var(--blanco);
  text-align: center;
  font-size: 1.2rem;
  z-index: 100;
  padding: 2rem;
}
@media (min-width: 768px) {
  .familias__enunciado{
    margin-top: 2rem;
  }
}
/* header */
.familias__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--blanco);
  text-transform: uppercase;
}

.header__familias {
  background-image: url(https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  height: 40rem;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 4rem;
}


.header__contenido {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.header__formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 9.5rem;
}
@media (min-width: 768px) {
  .header__formulario {
    width: 80%;
    margin-top: 17rem;
  }
}

.formulario {
  padding: 0.3rem;
  display: flex;
  gap: 0.2rem;
  justify-content: baseline;
  background: var(--blanco);
  margin: 0 auto;
  border-radius: 1.2rem;
  width: 80%;
}

.formulario__input {
  padding: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  font-size: 0.95rem;
}
.formulario__icono {
  width: 2rem;
  color: var(--gris);
  display: flex;
}
.formulario__resultados {
  text-align: center;
  max-width: 80%;
  margin: 0.2rem auto;
}
@media (min-width: 768px) {
  .formulario {
    width: 50%;
  }
  .formulario__input {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
  }
  .formulario__icono {
    width: 2rem;
    color: var(--gris);
    display: flex;
  }
  .formulario__resultados {
    text-align: center;
    max-width: 80%;
    margin: 1rem auto;
  }
}

/* main listado de familia */
.familias {
  display: flex;
  justify-content: center;
}
.familias__grid{
  display: grid;
  gap: 1rem;
}

@media (min-width: 992px) {
  .familias__grid{
    grid-template-columns: repeat(2,1fr);
  }
}

</style>