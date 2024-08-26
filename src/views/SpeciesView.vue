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
  await especies.loadSpeciesSisa();
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

    <div class="contenedor__principal">
      <!-- Acordeón como tarjeta desplegable -->
      <details class="accordion">
        <summary class="accordion__header">Descargar Listados de Especies Forestales</summary>
        <div class="accordion__content">
          <!-- Primer div de descarga -->
          <div class="download__forestSpecies">
            <span class="text__exportSF">Exportar listado de especies forestales en proceso de elaboración de protocolo:</span>
            <a @click="descargarExcel(reportGeneral.datosImport, `Listado_especies_forestales - ${obtenerFecha()}`)" class="button" href="#">
              <font-awesome-icon class="button__excel" :icon="['fas', 'file-excel']"/>
            </a>
            <a @click="descargarPdfs(reportGeneral.datosImport,`Listado especies forestales - ${obtenerFecha()}`, 6, 0)" class="button" href="#">
              <font-awesome-icon class="button__pdf" :icon="['fas', 'file-pdf']"/>
            </a>
          </div>

          <!-- Segundo div de descarga -->
          <div class="download__forestSpecies">
            <span class="text__exportSF">Exportar listado de especies SISA:</span>
            <a @click="descargarExcel(especies.sisaList, `Listado_especies_forestales_SISA - ${obtenerFecha()}`)" class="button" href="#">
              <font-awesome-icon class="button__excel" :icon="['fas', 'file-excel']"/>
            </a>
            <a @click="descargarPdfs(especies.sisaList,`Listado especies forestales_SISA - ${obtenerFecha()}`, 6, 0)" class="button" href="#">
              <font-awesome-icon class="button__pdf" :icon="['fas', 'file-pdf']"/>
            </a>
          </div>
        </div>
      </details>
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

    <!-- Paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <!-- Botón de inicio -->
        <button
          class="paginador__boton paginador__boton--inicio"
          v-if="especies.currentPage > 1"
          @click="especies.goToFirstPage"
        >
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </button>

        <!-- Botón anterior -->
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="especies.currentPage > 1"
          @click="especies.changePage(especies.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <!-- Botones de número de página -->
        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="especies.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === especies.currentPage }"
        >
          {{ page }}
        </button>

        <!-- Botón siguiente -->
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="especies.currentPage < especies.totalPages"
          @click="especies.changePage(especies.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

        <!-- Botón de final -->
        <button
          class="paginador__boton paginador__boton--final"
          v-if="especies.currentPage < especies.totalPages"
          @click="especies.goToLastPage"
        >
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
  <ButtonTop/>
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

/* BUTTONS DOWNLOAD */
/* Contenedor principal para alinear la tarjeta a la derecha */
.contenedor__principal {
  display: flex;
  justify-content: flex-end; /* Alinea el acordeón a la derecha */
  padding: 1rem;
}

/* Estilos del acordeón como tarjeta desplegable */
.accordion {
  width: 500px; /* Ancho fijo de la tarjeta */
  margin-top: 1.5rem;
  border: 1px solid #ddd; /* Borde del acordeón */
  border-radius: 8px; /* Borde redondeado */
  overflow: hidden; /* Asegura que el contenido no se desborde */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para dar efecto de tarjeta */
  background-color: var(--blanco); /* Color de fondo de la tarjeta */
}

/* Estilos del encabezado del acordeón */
.accordion__header {
  background-color: var(--primary-backgound);
  padding: 1rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--gris);
  display: flex;
  justify-content: space-between; /* Espacio entre el título y cualquier icono */
}

.accordion__header:hover {
  background-color: var(--gris-claro); /* Color de fondo al pasar el ratón */
}

/* Estilos del contenido del acordeón */
.accordion__content {
  padding: 1rem;
  display: flex;
  flex-direction: column; /* Mantiene los divs en una columna */
  gap: 1rem; /* Espacio entre los divs */
}

/* Estilos de descarga */
.download__forestSpecies {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribuye espacio entre el texto y los botones */
  margin-top: 1rem;
}

@media (max-width: 600px) {
  .download__forestSpecies {
    justify-content: center;
    flex-direction: column; /* En pantallas pequeñas, coloca el contenido en una columna */
    text-align: center; /* Centra el texto */
  }
}

.button {
  margin-left: 1rem; /* Ajusta el margen a la izquierda para separar los botones del texto */
}

.button__excel,
.button__pdf {
  font-size: 2rem; /* Tamaño del icono */
}

.text__exportSF {
  font-weight: bold;
  margin-right: 1rem; /* Ajusta el margen a la derecha del texto */
  flex-grow: 1; /* Hace que el texto ocupe el espacio restante */
}
</style>