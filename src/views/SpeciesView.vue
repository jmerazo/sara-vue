<script setup>
import { computed, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import { useEspeciesStore } from "@/stores/species";
import { useEspeciesData } from "@/stores/dashboard/reports/speciesData";

import { obtenerFecha, descargarPdfs, descargarExcel } from "@/helpers";

import Species from "@/components/species/Species.vue";
import ModalSpecie from '@/components/species/modals/ModalSpecie.vue';

const especies = useEspeciesStore();
const reportGeneral = useEspeciesData();
const valueSearched = ref("");
const isSearching = computed(() => valueSearched.value !== "");

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
  <div>
    <!-- header vista especie -->
    <header class="header__especies">
      <div class="header__contenido">
        <div class="header_formulario">
          <h1 class="especies__heading">Listado de especies forestales</h1>

          <div class="formulario">
            <input
              class="formulario__input"
              type="text"
              placeholder="Escribe un término de búsqueda"
              v-model="valueSearched"
              @input="especies.buscarTermino($event.target.value)"
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
            {{ especies.displayedEspecies.length }}
            {{
              especies.displayedEspecies.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"
            }}
            para {{ valueSearched }}
          </p>
          <p class="formulario__resultados" v-else> Buscar por nombre común, nombre científico o familia</p>
        </div>
      </div>
    </header>

    <!-- fin header vista especie -->

    <div class="download__forestSpecies">
      <span class="text__exportSF">Exportar listado especies forestales:</span>
      <a @click="descargarExcel(reportGeneral.datosImport, `Listado_especies_forestales - ${obtenerFecha()}`)" class="button" href="#">
        <font-awesome-icon class="button__excel" :icon="['fas', 'file-excel']"/>
      </a>
      
      <a @click="descargarPdfs(reportGeneral.datosImport,`Listado especies forestales - ${obtenerFecha()}`, 6, 0)" class="button" href="#">
        <font-awesome-icon class="button__pdf" :icon="['fas', 'file-pdf']"/>
      </a>
    </div>
  
    <!-- listado especies -->
    <main class="especies">      
      <div class="especies__grid">
        <Species
          v-for="especie in especies.displayedEspecies"
          :key="especie.id"
          :specie="especie"
        />
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
    <section class="validacion__contenido" v-if="especies.noResultados">
      <h1 class="validacion__heading">No hay resultados de búsqueda</h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
  <ModalSpecie/>
</template>

<style scoped>
/* header */
.especies__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--blanco);
  text-transform: uppercase;
}

.header__especies {
  background-image: url('/img/bannersViews/banner-species.jpeg');
  height: 40rem;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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
.header_formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .header_formulario {
    width: 80%;
    margin-top: 11rem;
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
    width: 60%;
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
}

/* main */
.especies {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .especies {
    display: flex;
    margin: 0 auto;
    margin-top: 5rem;
  }
}
.especies__grid {
  display: grid;
  gap: 1.5rem;
  width: 80%;
  margin: 0 auto;
}
@media (min-width: 600px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 60%;
    margin: 0 auto;
  }
}
@media (min-width: 992px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 60%;
    margin: 0 auto;
  }
}
@media (min-width: 1300px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
@media (min-width: 1800px) {
  .especies__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}

.paginador {
  margin-bottom: 2rem;
}

.download__forestSpecies {
  display: flex;
  align-items: center; /* Alinea el botón verticalmente al centro, si es necesario */
  justify-content: flex-end; /* Alinea el botón horizontalmente a la izquierda */
  margin-top: 1rem;
  margin-right: 1rem;
}

@media (max-width: 600px) {
  .download__forestSpecies {
    justify-content: center; /* Centra el botón en pantallas pequeñas, si es deseado */
  }
}

.button{
  margin: 0.4rem;
}

.button__excel, .button__pdf {
  font-size: 2rem; /* O cualquier tamaño que prefieras */
}

.text__exportSF{
  font-weight: bold;
  margin-right: 0.4rem;
}
</style>