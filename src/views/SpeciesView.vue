<script setup>
import { computed, ref, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
//Stores
import { useEspeciesStore } from "@/stores/species";
import { useEspeciesData } from "@/stores/dashboard/reports/speciesData";
//Helpers
import { obtenerFecha, descargarPdfs, descargarExcels } from "@/helpers";
//Components
import Species from "@/components/species/Species.vue";
import ButtonTop from '@/components/shared/ButtonTop.vue'
import ModalSpecie from '@/components/species/modals/ModalSpecie.vue';
import SvgIcon from "@/assets/SvgIcon.vue";

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
  console.log(`Altura del viewport: ${window.innerHeight}px`);
});

const showCardDownload = () => {
  activeDownload.value = !activeDownload.value; // Cambia el estado para expandir o colapsar la tarjeta
};

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

const codigosExcluidos = [
  120, 142, 146, 206, 784, 1747, 1786, 1933, 2093, 2320, 2323, 2480, 2484, 
  2509, 2768, 2789, 2838, 3172, 3413, 3434, 4211, 4449, 4803, 4946, 5264, 
  5272, 5274, 5284, 5290, 5309, 5310, 5377, 5392, 5418, 5425, 9982, 9986, 
  9988, 9989, 9992, 9994
];

const datosFiltrados = computed(() => {
  return reportGeneral.datosImport.filter(especie => 
    !codigosExcluidos.includes(especie.cod_especie)
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
          <div class="formulario" :class="{ 'isSearching': isSearching }">
            <input 
              class="formulario__input" 
              type="text" 
              placeholder="Escribe un término de búsqueda"
              v-model="valueSearched" 
              @input="especies.buscarTermino($event.target.value), scrollTop()"
            />
            <div class="formulario__icono">
              <SvgIcon 
                :style="{ color: isSearching ? 'white' : 'var(--gris)' }" 
                iconName="search"
              />
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
          
          <!-- button download -->
          <div class="downloadSpecies">
            <!-- Botón de descarga -->
            <button @click="showCardDownload" class="downloadSpecies__button">
              <SvgIcon class="downloadSpecies__icon" iconName="arrowDownload" size="24" />
              Descargar Especies Forestales
            </button>

            <!-- Contenido dinámico -->
            <div class="downloadSpecies__card" :class="{ active: activeDownload }">
              <div class="downloadSpecies__header">
                <h3 class="downloadSpecies__title">
                  Listado de especies forestales en proceso de elaboración de protocolo:
                </h3>
                <div class="downloadSpecies__icons">
                  <SvgIcon
                    @click="descargarPdfs(datosFiltrados, `Listado especies forestales - ${obtenerFecha()}`, 6, 0)"
                    class="downloadSpecies__icon downloadSpecies__icon--red"
                    iconName="pdfRed"
                    size="24"
                  />
                  <SvgIcon
                    @click="descargarExcels(datosFiltrados, `Listado_especies_forestales - ${obtenerFecha()}`)"
                    class="downloadSpecies__icon downloadSpecies__icon--green"
                    iconName="xlsxGreen"
                    size="24"
                  />
                </div>
              </div>

              <div class="downloadSpecies__header">
                <h3 class="downloadSpecies__title">Listado de especies SISA:</h3>
                <div class="downloadSpecies__icons">
                  <SvgIcon
                    @click="descargarPdfs(especies.sisaList, `Listado especies forestales_SISA - ${obtenerFecha()}`, 6, 0)"
                    class="downloadSpecies__icon downloadSpecies__icon--red"
                    iconName="pdfRed"
                    size="24"
                  />
                  <SvgIcon
                    @click="descargarExcels(especies.sisaList, `Listado_especies_forestales_SISA - ${obtenerFecha()}`)"
                    class="downloadSpecies__icon downloadSpecies__icon--green"
                    iconName="xlsxGreen"
                    size="24"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- end button download -->        
        </div>
      </div>
    </header>
    <!-- fin header vista especie -->

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
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
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
  width: 80%; /* Ajusta el ancho según el diseño */
  max-width: 400px;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  background-color: var(--gris);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.downloadSpecies__button:hover {
  background-color: var(--primary-hover);
  transform: scale(1.05); /* Efecto visual al pasar el mouse */
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
  margin-right: 0.5rem; /* Espaciado entre el icono y el texto */
  width: 1.5rem;
  fill: currentColor;
  cursor: pointer;
}

.downloadSpecies__card {
  width: 90%;
  max-width: 400px;
  background-color: var(--gris-fuente);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  opacity: 0; /* Inicialmente invisible */
  height: 0; /* Altura inicial para el estado colapsado */
  overflow: hidden; /* Oculta el contenido desbordado */
  transition: all 0.3s ease-in-out;
}

.downloadSpecies__card.active {
  opacity: 1; /* Aparece cuando está activo */
  height: auto; /* Ajusta la altura automáticamente según el contenido */
  margin-top: 1rem; /* Añade un margen cuando se expande */
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
  align-items: center;
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
  position: relative;
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
  align-items: center;
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

@media (max-width: 768px) {
  .especies {
    display: flex;
    margin: 0 auto;
    margin-top: 5rem;
  }
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


/* style for form input */
.isSearching {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: var(--gris);
  z-index: 10;
  transition: all 0.3s ease-in-out;
}

/* Media queries */
/* Para teléfonos pequeños o dispositivos de gama baja */
@media (max-height: 600px) {
  .isSearching {
    top: 120%; /* Ajusta según el diseño */
  }
}

/* Para teléfonos de gama media y resoluciones estándar */
@media (min-height: 601px) and (max-height: 720px) {
  .isSearching {
    top: 110%; /* Ajusta según el diseño */
  }
}

/* Para teléfonos más grandes y modernos */
@media (min-height: 721px) and (max-height: 900px) {
  .isSearching {
    top: 100%; /* Ajusta según el diseño */
  }
}

/* Para pantallas grandes o phablets */
@media (min-height: 901px) and (max-height: 1080px) {
  .isSearching {
    top: 90%; /* Ajusta según el diseño */
  }
}


@media (min-height: 600px) {
  .isSearching {
    top: 109%; /* Para pantallas pequeñas */
  }
}

@media (min-height: 720px) {
  .isSearching {
    top: 90%; /* Resolución intermedia común en dispositivos móviles */
  }
}

@media (min-height: 768px) {
  .isSearching {
    top: 73%; /* Resolución de tablets pequeñas */
  }
}

@media (min-height: 1080px) {
  .isSearching {
    top: 61%; /* Full HD estándar */
  }
}

@media (min-height: 1200px) {
  .isSearching {
    top: 51.2%; /* Pantallas grandes con resolución extendida */
  }
}

@media (min-height: 1340px) {
  .isSearching {
    top: 45.5%; /* Monitores QHD (2K) */
  }
}

@media (min-height: 1440px) {
  .isSearching {
    top: 45.5%; /* Monitores QHD más altos */
  }
}

@media (min-height: 1640px) {
  .isSearching {
    top: 40%; /* Monitores QHD más altos */
  }
}

@media (min-height: 2160px) {
  .isSearching {
    top: 30.3%; /* Monitores 4K */
  }
}
</style>