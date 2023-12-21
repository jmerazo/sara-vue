<script setup>
import { computed} from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useSamplesMade } from "@/stores/dashboard/reports/samplesMade";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";
//componentes
import LoadingData from "@/components/LoadingData.vue";

const samples = useSamplesMade();
//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  samples.quitarFiltroBuscado();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = samples.currentPage;
  const totalPages = samples.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

//furncion para mostrar el contenido de la muestra o colectores
function toggleDetalles(contenedor) {
  const muestra = document.getElementById(contenedor);

  if (muestra.classList.contains("active")) {
    muestra.classList.remove("active");
  } else {
    muestra.classList.add("active");
  }
}
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Reporte general de muestras </h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          @input="samples.buscarTermino($event.target.value)"
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
        />
      </div>
      <div class="botones__descarga" v-if="displayedPageRange.length >= 1">
        <a
          @click="
            descargarExcel(
              samples.datosImport,
              `Reporte de muestras realizadas - ${obtenerFecha()}`
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon
            class="boton__excel"
            :icon="['fas', 'file-excel']"
        /></a>
        <a
          @click="
            descargarPdf(
              samples.datosImport,
              `Reporte de muestras realizadas - ${obtenerFecha()}`,
              6,
              7
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
      </div>
    </div>
    <hr />
    <LoadingData v-if="samples.cargando" />
    <!-- contenido principal -->
    <main class="muestra__grid">
      <div
        v-for="(muestra, index) in samples.displayedSamples"
        :key="muestra.idmuestra"
      >
        <div class="card">
          <!-- fecha y cod muestra -->
          <div class="muestra__encabezado">
            <p class="muestra__fecha">
              Fecha colección:
              <span class="dato">{{ muestra.fecha_coleccion }}</span>
            </p>
            <p class="muestra__codigo">
              Muestra:
              <span class="dato">{{ muestra.codigo_muestra }}</span>
            </p>
          </div>

          <!-- datos de la especie -->
          <div class="especie">
            <div class="especie__imagen">
              <img src="/icons/icon-muestra.jpg" alt="icon sample" />
            </div>
            <p class="especie__info nombre__comun">
              <span class="dato" :class="{ sinInfo: !muestra.nom_comunes }">{{
                muestra.nom_comunes
              }}</span>
            </p>
            <p class="especie__info">
              <span
                class="dato"
                :class="{ sinInfo: !muestra.nombre_cientifico }"
                >{{ muestra.nombre_cientifico }}</span
              >
            </p>
            <p class="especie__info">
              código especie:
              <span class="dato" :class="{ sinInfo: !muestra.cod_especie }">{{
                muestra.cod_especie
              }}</span>
            </p>
            <p class="especie__info">
              # placa:
              <span class="dato" :class="{ sinInfo: !muestra.numero_placa }">{{
                muestra.numero_placa ? muestra.numero_placa : "Sin placa"
              }}</span>
            </p>
          </div>

          <!-- datos de la muestra -->
          <div class="muestra informacion__muestra" :id="index + 'a'">
            <button
              id="boton-muestra"
              class="card__boton"
              type="button"
              @click="toggleDetalles(index + 'a')"
            >
              Datos de la muestra
            </button>
            <div class="datos">
              <p class="detalle__item">
                colección Número:
                <span
                  class="dato"
                  :class="{ sinInfo: !muestra.nro_coleccion }"
                  >{{
                    muestra.nro_coleccion ? muestra.nro_coleccion : "Sin datos"
                  }}</span
                >
              </p>
              <p class="detalle__item">
                Número muestras:
                <span
                  class="dato"
                  :class="{ sinInfo: !muestra.nro_muestras }"
                  >{{
                    muestra.nro_muestras ? muestra.nro_muestras : "Sin datos"
                  }}</span
                >
              </p>
              <p class="detalle__item">
                Usos:
                <span class="dato" :class="{ sinInfo: !muestra.usos }">{{
                  muestra.usos ? muestra.usos : "Sin datos"
                }}</span>
              </p>

              <p class="detalle__item">
                <span class="dato" :class="{ sinInfo: !muestra.descripcion }">{{
                  muestra.descripcion ? muestra.descripcion : "Sin datos"
                }}</span>
              </p>
              <p @click="toggleDetalles(index + 'a')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- datos colectores -->
          <div class="informacion__muestra" :id="index + 'b'">
            <button
              id="boton-colectores"
              class="card__boton"
              @click="toggleDetalles(index + 'b')"
            >
              Colectores
            </button>
            <div class="datos">
              <p class="detalle__item">
                Colector Principal:
                <span class="dato"
                  >{{ muestra.siglas_colector_ppal }} -
                  {{ muestra.colector_ppal }}</span
                >
              </p>
              <p class="detalle__item" v-if="muestra.nombres_colectores">
                Colectores asociados:
                <span class="dato">{{ muestra.nombres_colectores }}</span>
              </p>
              <p @click="toggleDetalles(index + 'b')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin colectores -->
        </div>
      </div>
    </main>
    <!-- paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="samples.currentPage > 1"
          @click="samples.changePage(samples.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="samples.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === samples.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="samples.currentPage < samples.totalPages"
          @click="samples.changePage(samples.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
        v-if="samples.samplesData.length == 0 && !samples.cargando"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
  </div>
</template>

<style scoped>
.recoger {
  margin: 0;
  text-align: center;
  font-size: 1rem;
}
.recoger:hover {
  cursor: pointer;
  color: var(--primary);
}
/* generales */
.dato {
  font-weight: 900;
  color: var(--gris);
  opacity: 0.9;
}
.sinInfo {
  color: rgb(240, 176, 176);
}
/*  estilos encabezado reporte */
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
  gap: 1rem;
  margin-bottom: 0.6rem;
}
@media (min-width: 768px) {
  .contenido__header {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 1rem 2rem 1rem;
  }
}

/* buscador */
.buscador__label {
  display: none;
}
@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    margin-right: 0.5rem;
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
/* descargas */
.botones__descarga {
  display: flex;
  gap: 1rem;
}
.boton {
  font-size: 1.5rem;
}
@media (min-width: 768px) {
  .boton {
    font-size: 1.8rem;
  }
}
.boton__excel {
  color: rgb(6, 114, 6);
}
.boton__pdf {
  color: rgb(184, 50, 50);
}

/* encabezado muestra */
.muestra__encabezado {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin: 1rem auto;
}
.muestra__fecha,
.muestra__codigo {
  margin: 0;
  padding: 0 0.2rem;
}

.muestra__codigo {
  font-size: 0.83rem;
}
/* seccion especie */
.especie {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 1.5rem;
}
.especie__imagen {
  width: 4.5rem;
}
.especie__info {
  padding: 0;
  margin: 0.1rem 0;
  font-size: 0.89rem;
}
.nombre__comun {
  font-size: 1rem;
}
.muestra__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .muestra__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .muestra__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1820px) {
  .muestra__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* card */
.card {
  border-radius: 10px;
  border: 1px solid var(--primary);
  background-color: var(--blanco);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.card__boton {
  text-align: center;
  font-size: 1rem;
  border: 1px solid var(--primary);
  padding: 0.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  width: 90%;
  margin: 0 0 0 16px;
  transition: background-color 0.3s ease;
}
.card__boton:hover {
  background-color: var(--primary);
  color: var(--blanco);
}
.card__boton:last-of-type {
  margin-bottom: 1rem;
}
.detalle__item {
  text-align: center;
  margin: 0.2rem 0;
  padding: 0 2rem;
}
.detalle__item:last-of-type {
  margin-bottom: 2rem;
}

.informacion__muestra {
  position: relative;
}

.datos {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.informacion__muestra.active .datos {
  display: block;
}
</style>