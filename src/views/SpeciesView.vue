<script setup>
import { computed, ref, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";

import { useEspeciesStore } from "@/stores/species";
import { useEspeciesData } from "@/stores/dashboard/reports/speciesData";

import { obtenerFecha, descargarPdfs, descargarExcel } from "@/helpers";

import Species from "@/components/species/Species.vue";
import ButtonTop from '@/components/shared/ButtonTop.vue'
import ModalSpecie from '@/components/species/modals/ModalSpecie.vue';

const especies = useEspeciesStore();
const reportGeneral = useEspeciesData();
const valueSearched = ref("");
const isSearching = computed(() => valueSearched.value !== "");
const activeDownload = ref(false)



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

onMounted(async () => {
  scrollTop()
  await especies.loadSpeciesSisa();
  await especies.loadAllSpecies();
});


function showCardDownload() {
  return activeDownload.value = !activeDownload.value
}

function scrollTop() {
    
  if (isSearching.value) {
    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    })
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <div>
    <!-- header vista especie -->
    <header class="header__especies">
      <div class="header__contenido">
        <div class="header_formulario">
          <h1 class="especies__heading">Listado de especies forestales</h1>

          <div class="formulario" :class="{ 'isSearching': isSearching }">
            <input class="formulario__input" type="text" placeholder="Escribe un término de búsqueda"
              v-model="valueSearched" @input="especies.buscarTermino($event.target.value), scrollTop()" />
            <div class="formulario__icono">
              <svg :style="{ color: isSearching ? 'white' : 'var(--gris)' }" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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

    <!-- button download -->

    <div class="downloadSpecies" :style="{ 'height': activeDownload ? '500px' : '100px' }">
      <button @click="showCardDownload()" class="downloadSpecies__button">
        <svg class="downloadSpecies__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z">
          </path>
        </svg>
        Descargar Especies Forestales
      </button>

      <div class="downloadSpecies__card" :style="{ 'margin-top': activeDownload ? '1rem' : '-29rem' }">
        <div class="downloadSpecies__header">
          <h3 class="downloadSpecies__title">Listado de especies forestales en proceso de elaboración de protocolo:</h3>
          <div class="downloadSpecies__icons">
            <svg
              @click="descargarPdfs(reportGeneral.datosImport, `Listado especies forestales - ${obtenerFecha()}`, 6, 0)"
              class="downloadSpecies__icon downloadSpecies__icon--red" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z">
              </path>
            </svg>
            <svg @click="descargarExcel(reportGeneral.datosImport, `Listado_especies_forestales - ${obtenerFecha()}`)"
              class="downloadSpecies__icon downloadSpecies__icon--green" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M13.2 12L16 16H13.6L12 13.7143L10.4 16H8L10.8 12L8 8H10.4L12 10.2857L13.6 8H15V4H5V20H19V8H16L13.2 12ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z">
              </path>
            </svg>
          </div>
        </div>

        <div class="downloadSpecies__header">
          <h3 class="downloadSpecies__title">Listado de especies SISA:</h3>
          <div class="downloadSpecies__icons">
            <svg @click="descargarPdfs(especies.sisaList, `Listado especies forestales_SISA - ${obtenerFecha()}`, 6, 0)"
              class="downloadSpecies__icon downloadSpecies__icon--red" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z">
              </path>
            </svg>
            <svg @click="descargarExcel(especies.sisaList, `Listado_especies_forestales_SISA - ${obtenerFecha()}`)"
              class="downloadSpecies__icon downloadSpecies__icon--green" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M13.2 12L16 16H13.6L12 13.7143L10.4 16H8L10.8 12L8 8H10.4L12 10.2857L13.6 8H15V4H5V20H19V8H16L13.2 12ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z">
              </path>
            </svg>
          </div>
        </div>
        <!-- <button @click="showCardDownload()" class="downloadSpecies__close">Cerrar</button> -->
      </div>
    </div>



    <!-- end button download -->



    <!-- listado especies -->
    <main class="especies">
      <div class="especies__grid">
        <Species v-for="especie in especies.displayedEspecies" :key="especie.id" :specie="especie" />
      </div>
    </main>
    <!-- fin listado especies -->

    <!-- Paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <!-- Botón de inicio -->
        <button class="paginador__boton paginador__boton--inicio" v-if="especies.currentPage > 1"
          @click="especies.goToFirstPage">
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </button>

        <!-- Botón anterior -->
        <button class="paginador__boton paginador__boton--anterior" v-if="especies.currentPage > 1"
          @click="especies.changePage(especies.currentPage - 1)">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <!-- Botones de número de página -->
        <button v-for="page in displayedPageRange" :key="page" @click="especies.changePage(page)"
          class="paginador__boton" :class="{ 'paginador__boton-actual': page === especies.currentPage }">
          {{ page }}
        </button>

        <!-- Botón siguiente -->
        <button class="paginador__boton paginador__boton--siguiente" v-if="especies.currentPage < especies.totalPages"
          @click="especies.changePage(especies.currentPage + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

        <!-- Botón de final -->
        <button class="paginador__boton paginador__boton--final" v-if="especies.currentPage < especies.totalPages"
          @click="especies.goToLastPage">
          <font-awesome-icon :icon="['fas', 'angle-double-right']" />
        </button>
      </div>

      <!-- Mostrar el total de páginas -->
      <div class="paginador__info">
        Página {{ especies.currentPage }} de {{ especies.totalPages }}
      </div>
    </section>

    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido" v-if="especies.noResultados">
      <h1 class="validacion__heading">No hay resultados de búsqueda</h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
  <ButtonTop />
  <ModalSpecie />
</template>

<style scoped>
.downloadSpecies {
  margin-top: .5rem;
  left: -.5rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 1;
  transition: all .3s ease-in-out;
  overflow: hidden;
}

@media (min-width: 768px) {
  .downloadSpecies {
    left: 20%;
    margin-top: 3rem;
  }
}
@media (min-width: 1340px) {
  .downloadSpecies {
    left: 35%;
  }
}
@media (min-width: 1440px) {
  .downloadSpecies {
    left: 40%;
  }
}

.downloadSpecies__button {
  margin: 0 auto;
  width: 80%;
  padding: .5rem;
  border-radius: 1rem;
  font-weight: bold;
  background-color: var(--gris);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .downloadSpecies__button {
    padding: 1rem;
    gap: .5rem;
    width: 90%;
    font-size: 1.2rem;
  }
}

.downloadSpecies__icon {
  width: 2rem;
  fill: currentColor;
}

.downloadSpecies__card {
  width: 320px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  z-index: 0;
  transition: all .3s ease-in-out;
}

@media (min-width: 768px) {
  .downloadSpecies__card {
    width: 400px;
  }
}

.downloadSpecies__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.downloadSpecies__title {
  font-size: 1.2rem;
  font-weight: bold;
}

.downloadSpecies__icons {
  display: flex;
}

.downloadSpecies__icons svg {
  cursor: pointer;
}

.downloadSpecies__icon--red {
  width: 3.5rem;
  fill: red;
}

.downloadSpecies__icon--green {
  width: 3.5rem;
  fill: green;
}

.downloadSpecies__close {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--gris);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  border-radius: 0.5rem;
}



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
  /* position: relative; */
}

.header__contenido {
  /* position: absolute; */
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
  transition: all .3s ease-in-out;
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
    display: flex;
  }
}

/* main */
.especies {
  margin-top: 8rem;
}

@media (min-width: 768px) {
  .especies {
    display: flex;
    margin: 0 auto;
    margin-top: 15rem;
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

.paginador__botones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.paginador__boton {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.paginador__boton:hover {
  background-color: var(--primary-hover);
}

.paginador__boton-actual {
  background-color: var(--secondary);
  font-weight: bold;
}

.paginador__info {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
}



/* style for form input */
.isSearching {
  position: absolute;
  left: 9.2%;
  width: 80%;
  bottom: -7%;
  background-color: var(--gris);
  z-index: 10;
}

@media (min-width: 768px) {
  .isSearching {
    width: 60%;
    left: 20%;
    bottom: 18%;
  }
}
@media (min-width: 1340px) {
  .isSearching {
    width: 60%;
    left: 20%;
    bottom: -40%;
  }
}
@media (min-width: 1920px) {
  .isSearching {
    left: 19.7%;
    bottom: 8%;
  }
}
</style>