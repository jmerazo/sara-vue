<script setup>
import { onMounted,computed } from "vue";
import { useSamplesMade } from "@/stores/dashboard/reports/samplesMade";

const samples = useSamplesMade();

onMounted(async () => {
  await samples.fetchSamplesData();
});

function toggleDetalles(idLista) {
  const detalles = document.getElementById(idLista);
  detalles.classList.toggle("visible");
}

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
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Reporte de muestras realizadas</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
        />
      </div>
      <div class="botones__descarga">
        <a class="boton" href="#"
          ><font-awesome-icon
            class="boton__excel"
            :icon="['fas', 'file-excel']"
        /></a>
        <a class="boton" href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
      </div>
    </div>
    <hr />
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
            <p class="especie__info">
              id Muestra:
              <span class="dato">{{ index + 1 }}</span>
            </p>
          </div>

          <!-- contenido derecha grid -->
          <div class="muestra__descripcion">
            <!-- datos de la muestra -->
            <div class="muestra">
              <ul class="lista_datos">
                <li class="lista__dato" @click="toggleDetalles(index + 'a')">
                  <h2 class="lista__titulo">Datos de la muestra</h2>
                  <div class="detalle" :id="index + 'a'">
                    <p class="detalle__item">
                      colección Número:
                      <span
                        class="dato"
                        :class="{ sinInfo: !muestra.nro_coleccion }"
                        >{{
                          muestra.nro_coleccion
                            ? muestra.nro_coleccion
                            : "Sin datos"
                        }}</span
                      >
                    </p>
                    <p class="detalle__item">
                      Número muestras:
                      <span
                        class="dato"
                        :class="{ sinInfo: !muestra.nro_muestras }"
                        >{{
                          muestra.nro_muestras
                            ? muestra.nro_muestras
                            : "Sin datos"
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
                      Descripción muestra:
                      <span
                        class="dato"
                        :class="{ sinInfo: !muestra.descripcion }"
                        >{{
                          muestra.descripcion
                            ? muestra.descripcion
                            : "Sin datos"
                        }}</span
                      >
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <!-- datos colectores -->
            <div class="colectores">
              <ul class="lista_datos">
                <li class="lista__dato" @click="toggleDetalles(index + 'b')">
                  <h2 class="lista__titulo">Colectores</h2>
                  <div class="detalle" :id="index + 'b'">
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
                  </div>
                </li>
              </ul>
            </div>
            <!-- fin colectores -->
          </div>
          <!-- fin grid contenido derecha -->
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
  </div>
</template>

<style scoped>
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

/* card */
.card {
  border-radius: 10px;
  border: 1px solid var(--primary);
  background-color: var(--blanco);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

@media (min-width:768px){
  .card{
    display: grid;
    grid-template-columns: 1fr 2fr;
    
  }
  .especie{
    grid-column: 1/2;
    grid-row: 1/3;    
  }
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
  font-size: 1rem;
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
  font-size: 0.9rem;
}
.nombre__comun {
  font-size: 1rem;
}
.muestra__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}


/* listas desplegables */
.muestra__descripcion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.lista_datos {
  list-style: none;
  padding: 0;
  margin: 0;
}
.lista__dato {
  border-radius: 5px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}
.detalle {
  background-color: var(--blanco);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}
.lista__titulo {
  text-align: center;
  font-size: 1rem;
  border: 1px solid var(--primary);
  padding: 0.2rem;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  width: 95%;
  margin: 0 auto;
  transition: background-color 0.3s ease;
}
.lista__titulo:hover {
  background-color: var(--primary);
  color: var(--blanco);
}
.lista__titulo:last-of-type {
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
.detalle.visible {
  max-height: 800px; /* Ajusta la altura máxima según tus necesidades */
  transition: max-height 0.5s ease-in-out;
}
@media (min-width: 992px){
  .detalle__item{
    text-align: left;
  }
  .colectores{
   width: 100%;
  }
  .muestra{
    width: 100%;
  }
  .especie{
    margin: .3rem 0;
  }

}
</style>