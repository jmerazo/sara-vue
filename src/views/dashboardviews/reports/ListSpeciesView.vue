<script setup>
import { computed, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useEspeciesStore } from "@/stores/species";
import { useCandidateStore } from "@/stores/dashboard/reports/SpecieCandidates";
import { useSpecieMonitoring } from "@/stores/dashboard/reports/SpecieMonitoring";
import { getFullImageUrl } from "@/helpers";

//componentes
import LoadingData from "@/components/shared/LoadingData.vue";

const especies = useEspeciesStore();

const candidatos = useCandidateStore();
const especieMonitoreos = useSpecieMonitoring();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie();
  next();
});

onMounted(async () => {
  await especies.loadAllSpecies();
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

const defaultImageUrl = '/img/sin_img.png';

const getBackgroundImageStyle = (images) => {
  if (images && images.length > 0 && images[0].img_general) {
    return {
      backgroundImage: `url(${getFullImageUrl(images[0].img_general)})`
    };
  }
  return {
    backgroundImage: `url(${defaultImageUrl})`
  };
};
</script>
<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">Reporte de monitoreos y candidatos</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          class="buscador__input"
          type="text"
          placeholder="Escribe un término de búsqueda"
          @input="especies.buscarTermino($event.target.value)"
        />
      </div>
      <div class="botones__descarga"></div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <LoadingData
      v-if="
        especies.cargando || especieMonitoreos.cargando || candidatos.cargando
      "
    />
    <div v-else>
      <!-- listado de cards -->
      <main class="reporte__grid">
        <div
          class="card"
          v-for="(especie, index) in especies.displayedEspecies"
          v-bind:key="especie.code_specie"
        >
          <div class="card__grid" v-if="especie.code_specie">
            <div
              class="card__imagen"
              :style="getBackgroundImageStyle(especie.images)"
            ></div>
            <div class="card__contenido">
              <p class="card__titulo">{{ especie.vernacularName }}</p>
              <p class="card__subtitulo">{{ especie.nombre_cientifico }}</p>
              <p class="card__subtitulo">
                Familia: <span class="card__dato">{{ especie.family }}</span>
              </p>
              
              <div class="card__botones">
                <button
                  class="boton__primario"
                  @click="candidatos.verCandidatosEspecie(especie.code_specie, especie.vernacularName)"
                >
                  <font-awesome-icon :icon="['fas', 'leaf']" /> Ver candidatos
                </button>


                <button
                  class="boton__secundario"
                  @click="
                    especieMonitoreos.verMonitoreosEspecie(
                      especie.code_specie,
                      especie.vernacularName
                    )
                  "
                >
                  <font-awesome-icon :icon="['fas', 'eye']" /> Ver Monitoreos
                </button>

                
              </div>
            </div>
          </div>
        </div>
      </main>
      <!-- fin listado de cards -->
      <!-- paginador -->
      <section class="paginador">
        <div class="paginador__botones">
          <button class="paginador__boton paginador__boton--inicio" v-if="especies.currentPage > 1"
            @click="especies.goToFirstPage()">
            <font-awesome-icon :icon="['fas', 'angle-double-left']" />
          </button>

          <button
            class="paginador__boton paginador__boton--anterior"
            v-if="especies.currentPage > 1"
            @click="especies.changePage(especies.currentPage - 1)"
          >
            <font-awesome-icon :icon="['fas', 'angle-left']" />
          </button>

          <button
            v-for="page in displayedPageRange"
            :key="page"
            @click="especies.changePage(page)"
            class="paginador__boton"
            :class="{
              'paginador__boton-actual': page === especies.currentPage,
            }"
          >
            {{ page }}
          </button>
          <button
            class="paginador__boton paginador__boton--siguiente"
            v-if="especies.currentPage < especies.totalPages"
            @click="especies.changePage(especies.currentPage + 1)"
          >
            <font-awesome-icon :icon="['fas', 'angle-right']" />
          </button>
          <!-- Botón de final -->
          <button class="paginador__boton paginador__boton--final" v-if="especies.currentPage < especies.totalPages"
            @click="especies.goToLastPage()">
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
      <section class="validacion__contenido">
        <h1
          v-if="especies.noResultados && !especies.cargando"
          class="validacion__heading"
        >
          No hay resultados de búsqueda
        </h1>
      </section>
      <!--fin texto validacion buscador -->
    </div>
  </div>
</template>

<style scope>
.paginador {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.1rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin: 3rem;
  }
}
.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}
@media (min-width: 768px) {
  .contenido__header {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 1rem 2rem 1rem;
  }
}
.reporte__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .reporte__grid {
    grid-template-columns: repeat(2fr, 1fr);
  }
}
@media (min-width: 992px) {
  .reporte__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* buscador */
.buscador__label {
  display: none;
}
@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    margin-right: 1rem;
  }
}
.buscador__input {
  width: 300px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid var(--primary);
  text-align: center;
}
@media (min-width: 768px) {
  .buscador__input {
    padding: 0.5rem;
    text-align: left;
  }
}

/* cards */
.card {
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.card__grid {
  display: grid;
  grid-template-rows: 0.9fr 1fr;
  transition: transform 0.3s ease;
}
.card__grid:hover {
  transform: scale(1.02);
}
@media (min-width: 768px) {
  .card__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
  }
}
.card__contenido {
  padding: 1rem 1rem 0 1rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
@media (min-width: 768px) {
  .card__contenido {
    gap: 0.5rem;
    padding: 1rem;
  }
}
.card__imagen {
  background-size: cover;
  background-repeat: no-repeat;
}
.card__titulo {
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.2rem;
}
.card__subtitulo {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.05rem;
}
.card__dato {
  font-weight: 500;
}
.boton__primario {
  color: var(--blanco);
  background-color: var(--primary);
  border-radius: 3px;
  padding: 0.3rem;
}

.boton__secundario {
  color: var(--blanco);
  background-color: var(--secondary);
  border-radius: 3px;
  padding: 0.3rem;
}
.boton__primario,
.boton__secundario {
  transition: background-color 0.3s ease;
}
.boton__primario:hover {
  background-color: var(--primary-hover);
}
.boton__secundario:hover {
  background-color: var(--secondary-hover);
}
.card__botones {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}


/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 1.5rem;
}
</style>