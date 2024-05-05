<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { ref, computed } from "vue";
import { useGlossaryStore } from "@/stores/glossary";

const glossary = useGlossaryStore();

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

const busacarLetra = () => {
  if (letra.value !== "") {
    glossary.buscarLetra(letra.value);
  }
};

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
          <label for="selectLetra" class="header__label">Buscar letra:</label>
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
        <div v-for="g in glossary.displayedGlossary" :key="g.id">
          <div class="ternino">
            <p class="ternino__texto">{{ g.word }}</p>

            <div >
              <p class="ternino__definicion">
                {{ g.definition }}
              </p>
            </div>
          </div>
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
      <h1 class="validacion__heading">No hay resultados de búsqueda</h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
</template>

<style scoped>

/* header contenido */

.header__glosario {
  margin-top: 6.5rem;
}

@media (min-width: 768px) {
  .header__glosario {
    margin-top: 6.5rem;
  }
}
@media (min-width: 992px) {
  .header__glosario {
    margin-top: 12rem;
  }
  .contenedor {
    width: 40%;
  }
}

.glosario__heading {
  font-size: 1.1rem;
}

@media (min-width: 768px) {
  .glosario__heading {
    font-size: 1.3rem;
  }
}
.header__contenido {
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;
  margin: 1.5rem 0;
  align-items: center;
}

@media (min-width: 768px) {
  .header__contenido {
    display: flex;
    margin: 3rem 0 2rem 0;
    justify-content: flex-end;
  }
}
@media (min-width: 992px) {
  .header__contenido {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
}

/* buscador termino*/
.header__label {
  font-size: 0.8rem;
  font-weight: 400;
  margin-right: 10px;
}
.header__label-termino {
  display: none;
}
@media (min-width: 768px) {
  .header__label {
    font-size: 1rem;
  }
  .header__label-termino {
    display: inline-block;
  }
}

.header__buscador {
  border: 1px solid var(--gris);
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
}

@media (min-width: 768px) {
  .header__buscador {
    border: 2px solid var(--gris);
    padding: 0.5rem;
    width: 20rem;
  }
}

/* buscador formulario */
.buscador__select {
  padding: 2px;
  font-weight: 400;
  font-size: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid var(--primary);
  border-radius: 5px;
}

@media (min-width: 768px) {
  .buscador__select {
    padding: 5px 15px;
  }
}

/* glosario main */
.glosario__listado {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .glosario__listado {
    margin-top: 3rem;
  }
}
.glosario__grid {
  display: grid;
  gap: 2rem;
}
@media (min-width: 768px) {
  .glosario__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 992px) {
  .glosario__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
}
.glosario__contenido {
  background-color: var(--gris-claro);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
}
.glosario__contenido span {
  font-weight: 700;
  font-size: 1rem;
}
/* Paginador */
.paginador {
  margin: 3rem 0;
}

/* termino */

.ternino {
  background-color: var(--blanco);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 0.15);
  position: relative;
  border-radius: 0.7rem;
}

.ternino:last-of-type {
  margin-bottom: 0;
}
@media (min-width: 768px) {
  .ternino {
    margin-bottom: 0;
  }
}
.ternino__texto {
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
  padding-left: 2.7rem;
}

.ternino__texto::before {
  content: "";
  background-image: url(../img/comilla.png);
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: center;
  width: 2rem;
  height: 2rem;
  display: block;
  position: absolute;
  top: 30px;
  left: 32px;
}

.ternino__definicion {
  font-size: 0.9rem;
}
</style>