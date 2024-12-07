<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { obtenerFecha, descargarPdfs, descargarExcels, getFullImageNurseryUrl } from "@/helpers";
//store
import { useNurseriesStore } from "@/stores/nurseries";
//components
import ButtonTop from '@/components/shared/ButtonTop.vue';
import cardNurseries from "../components/nurseries/cardNurseries.vue";
import formNurseries from '../components/nurseries/formNurseries.vue'
import modalNurseries from "../components/nurseries/modalNurseries.vue";


const valueSearched = ref("");
const isSearching = computed(() => valueSearched.value !== "");
const activeDownload = ref(false)

const nurseries = useNurseriesStore();

const displayedPageRange = computed(() => {
  const currentPage = nurseries.currentPage;
  const totalPages = nurseries.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

const downloadData = computed(() => {
  const headers = [
    'Nit',
    'Nombre del Vivero',
    'Representante Legal',
    'Correo Electrónico',
    'Celular',
    'Departamento',
    'Municipio',
    'Clase de Vivero'
  ];

  const data = nurseries.nurseriesData.map(nursery => [
    nursery.nit,
    nursery.nombre_vivero,
    `${nursery.first_name} ${nursery.last_name}`,
    nursery.email,
    nursery.telefono,
    nursery.departamento,
    nursery.municipio,
    nursery.clase_vivero
  ]);

  return [headers, ...data];
});

const performSearch = () => {
  nurseries.searchTerm(valueSearched.value);
  scrollTop()
};

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Debounced search
const debouncedSearch = debounce(performSearch, 300);

// Watch for changes in valueSearched
watch(valueSearched, () => {
  debouncedSearch();
});



function showCardDownload() {
  return activeDownload.value = !activeDownload.value
}

function getLatLong(coordinates) {
  const [lat, long] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
  return { lat, long };
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
onMounted(() => scrollTop())
</script>

<template>
  <div class="nurseries" style="background-color: #f1f5f9">
    <!-- init header -->
    <header class="header">
      <div class="header__content">
        <div class="header__form">
          <h1 class="header__title">Listado de Viveros</h1>
          <div class="form" :class="{ 'isSearching': isSearching }">
            <input class="form__input" type="text" placeholder="Buscar un vivero o especie" v-model="valueSearched"
              @input="performSearch" />
            <div class="form__icon">
              <svg :style="{ color: isSearching ? 'white' : 'var(--gris)' }" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>
          <p class="form__results" v-if="isSearching">
            para {{ valueSearched }}
          </p>
          <p class="form__results" v-else>
            Buscar un vivero o especie forestal
          </p>
        </div>
        <div class="content__downloadNurseries">
          <div class="downloadNurseries" :style="{ 'height': activeDownload ? 'auto' : '100px' }">
            <button @click="showCardDownload()" class="downloadNurseries__button">
              <svg class="downloadNurseries__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z">
                </path>
              </svg>
              Descargar
            </button>

            <div class="downloadNurseries__card" v-if="activeDownload">
              <div class="downloadNurseries__header">
                <h3 class="downloadNurseries__title">Listado de viveros:</h3>
                <div class="downloadNurseries__icons">
                  <svg @click="descargarPdfs(downloadData, `Listado de viveros - ${obtenerFecha()}`, 8, 0)"
                    class="downloadNurseries__icon downloadSpecies__icon--red" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z">
                    </path>
                  </svg>
                  <svg @click="descargarExcels(downloadData, `Listado de viveros - ${obtenerFecha()}`)"
                    class="downloadNurseries__icon downloadSpecies__icon--green" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M13.2 12L16 16H13.6L12 13.7143L10.4 16H8L10.8 12L8 8H10.4L12 10.2857L13.6 8H15V4H5V20H19V8H16L13.2 12ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- list nurseries-->
    <main class="main">
      <div class="nurseries__content">
        <!-- nurseries -->
         <div v-for="nursery in nurseries.paginatedNurseries" :key="nursery.id">
          <cardNurseries :nursery="nursery"/>
         </div>
      </div>
    </main>
    <!-- Paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button class="paginador__boton paginador__boton--inicio" v-if="nurseries.currentPage > 1"
          @click="nurseries.goToFirstPage">
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </button>

        <button class="paginador__boton paginador__boton--anterior" v-if="nurseries.currentPage > 1"
          @click="nurseries.changePage(nurseries.currentPage - 1)">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <button v-for="page in displayedPageRange" :key="page" @click="nurseries.changePage(page)"
          class="paginador__boton" :class="{ 'paginador__boton-actual': page === nurseries.currentPage }">
          {{ page }}
        </button>

        <button class="paginador__boton paginador__boton--siguiente" v-if="nurseries.currentPage < nurseries.totalPages"
          @click="nurseries.changePage(nurseries.currentPage + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

        <button class="paginador__boton paginador__boton--final" v-if="nurseries.currentPage < nurseries.totalPages"
          @click="nurseries.goToLastPage">
          <font-awesome-icon :icon="['fas', 'angle-double-right']" />
        </button>
      </div>

      <div class="paginador__info">
        Página {{ nurseries.currentPage }} de {{ nurseries.totalPages }}
      </div>
    </section>
  </div>
  <ButtonTop />
  <modalNurseries />
</template>

<style scoped>
/* main */
.main {
  margin: 0 auto;
  padding-top: 6rem;
}

@media (min-width: 768px) {
  .main {
    padding: 5rem;
    max-width: 1200px;
    padding-top: 10rem;
  }
}

.nurseries__content {
  display: grid;
  gap: 2rem;
}

/* button and section to downloads */
.content__downloadNurseries {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.downloadNurseries {
  display: flex;
  flex-direction: column;
  width: 20rem;
  transition: all .3s ease-in-out;
  overflow: hidden;
}

@media (min-width: 768px) {
  .downloadNurseries {
    width: 400px;
  }
}

.downloadNurseries__button {
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
  font-size: 1rem;
}

@media (min-width: 768px) {
  .downloadNurseries__button {
    padding: 1rem;
    gap: .5rem;
    width: 90%;
    font-size: 1.2rem;
  }
}

.downloadNurseries__icon {
  width: 2rem;
  fill: currentColor;
}

.downloadNurseries__card {
  width: 84%;
  background-color: var(--gris-fuente);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 1rem;
}

.downloadNurseries__header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.downloadNurseries__title {
  font-size: 1.2rem;
  font-weight: bold;
}

.downloadNurseries__icons {
  display: flex;
}

.downloadNurseries__icons svg {
  cursor: pointer;
}

.downloadNurseries__icon--red {
  width: 3.5rem;
  fill: red;
}

.downloadNurseries__icon--green {
  width: 3.5rem;
  fill: green;
}

.downloadNurseries__close {
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

/* nurseries */
.nurseries {
  padding-bottom: 8rem;
}

/* header */
.header__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--blanco);
  text-transform: uppercase;
  text-align: center;
}

.header {
  background-image: url("/img/bannersViews/banner-nurseries.jpg");
  height: 40rem;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (min-width: 768px) {
  .header {
    height: 40rem;
  }
}

.header__content {
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

.header__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .header__form {
    width: 80%;
    margin-top: 11rem;
  }
}

/* form header */
.form {
  padding: 0.3rem;
  display: flex;
  gap: 0.2rem;
  justify-content: baseline;
  background: var(--blanco);
  margin: 0 auto;
  border-radius: 1.2rem;
  width: 80%;
}

.form__input {
  padding: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  font-size: 0.95rem;
}

.form__icon {
  width: 2rem;
  color: var(--gris);
  display: flex;
}

.form__results {
  text-align: center;
  max-width: 80%;
  margin: 1rem auto;
}

@media (min-width: 768px) {
  .form {
    width: 60%;
  }

  .form__input {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
  }

  .form__icon {
    width: 2rem;
    color: var(--gris);
    display: flex;
  }
}

/* main */




/* pagination buttons */
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
  bottom: -9.5%;
  background-color: var(--gris);
  z-index: 10;
}

@media (min-width: 768px) {
  .isSearching {
    width: 60%;
    left: 20%;
    bottom: -16%;
  }
}

@media (min-width: 1340px) {
  .isSearching {
    width: 60%;
    left: 22%;
    bottom: -18%;
  }
}

@media (min-width: 1920px) {
  .isSearching {
    width: 40%;
    left: 28%;
    bottom: -16%;
  }
}
</style>