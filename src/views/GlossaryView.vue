<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { ref, computed } from "vue";
import { useGlossaryStore } from "@/stores/glossary";

const glossary = useGlossaryStore();

//const filteredGlossary = computed(() => glossary.getFilteredGlossary());
// const searchTerm = computed({
//   get: () => glossary.searchTerm,
//   set: (value) => glossary.setSearchTerm(value),
// });

const alfabeto = ref([
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]);
const letra = ref("");

const busacarLetra = () =>{
  if(letra.value !==''){
    glossary.buscarLetra(letra.value)
  }
}

//quitar valores previos del filtro
onBeforeRouteLeave((to, from, next) => {
  glossary.quitarFiltro();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = glossary.currentPage;
  const totalPages = glossary.totalPages;
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
    <!-- header glosario -->
    <header class="header__glosario">
      <h1 class="glosario__heading">Glosario</h1>
      <div class="header__contenido">
        <form class="buscador__formulario">
          <label for="selectLetra" class="header__label"
            >Buscar letra:</label
          >
          <select 
            id="selectLetra" 
            v-model="letra" 
            class="buscador__select"
            @change="busacarLetra()"
          >
            <option value="" selected disabled>A-Z</option>
            <option value="todo">Todas</option>
            <option v-for="letra in alfabeto" :key="letra" :value="letra">
              {{ letra }}
            </option>
          </select>
        </form>
        <div class="buscador__termino">
          <label
            for="buscador__termino"
            class="header__label header__label-termino"
            >Buscar término:
          </label>
          <input
            id="buscador__termino"
            type="text"
            class="header__buscador"
            placeholder="Buscar término..."
            @input="glossary.buscarTermino($event.target.value)"
          />
        </div>
      </div>
    </header>
    <hr />
    <!--fin header glosario -->
    <!-- glosario listado -->
    <main class="glosario__listado">
      <div class="glosario__grid">
        <div
          class="glosario__contenido"
          v-for="g in glossary.displayedGlossary"
          :key="g.id"
        >
          <p>
            <span>{{ g.word }}: </span>{{ g.definition }}
          </p>
        </div>
      </div>
    </main>
    <!-- fin glosario listado -->

    <!-- paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="glossary.currentPage > 1"
          @click="glossary.changePage(glossary.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="glossary.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === glossary.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="glossary.currentPage < glossary.totalPages"
          @click="glossary.changePage(glossary.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section v-if="glossary.glossary.length == 0" class="validacion__contenido">
      <h1  class="validacion__heading">
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
</template>

<style scoped>

/* header contenido */
.header__glosario {
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .header__glosario {
    margin-top: 5rem;
  }
}

.glosario__heading {
  font-size: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .glosario__heading {
    font-size: 3.5rem;
  }
}
.header__contenido {
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  margin: 3rem 0 1.5rem 0;
  align-items: center;
}

@media (min-width: 768px) {
  .header__contenido {
    display: flex;
    gap: 2rem;
    margin: 5rem 0 2rem 0;
    justify-content: flex-end;
  }
}
@media (min-width: 992px) {
  .header__contenido {
    display: flex;
    gap: 2rem;
    margin: 5rem 0 2rem 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
}

/* buscador termino*/
.header__label {
  font-weight: 700;
  margin-right: 15px;
}
.header__label-termino {
  display: none;
}
@media (min-width: 768px) {
  .header__label {
    font-size: 1.5rem;
  }
  .header__label-termino {
    display: inline-block;
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
    width: 25rem;
  }
}

/* buscador formulario */
.buscador__select{
  padding: 5px 10px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid var(--primary);
  border-radius: 10px;
}

@media (min-width: 768px) {
  .buscador__select{
    padding: 8px 35px;
  }
}

/* glosario main */
.glosario__listado {
  margin-top: 4rem;
}
@media (min-width: 768px) {
  .glosario__listado {
    margin-top: 6rem;
  }
}
.glosario__grid {
  display: grid;
  gap: 2rem;
}
@media (min-width: 768px) {
  .glosario__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .glosario__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
.glosario__contenido{
  background-color: var(--gris-claro);
  padding: 10px;
  border-radius: 10px;
}
.glosario__contenido span{
  font-weight: 700;
  
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