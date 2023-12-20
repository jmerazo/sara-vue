<script setup>
import { computed} from "vue";
import { useGeneralMonitoring } from "@/stores/dashboard/reports/generalMonitoring";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";

//componentes
import LoadingData from "@/components/LoadingData.vue";
const report = useGeneralMonitoring();

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = report.currentPage;
  const totalPages = report.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

//furncion para mostrar el contenido monitoreos
function toggleDetalles(contenedor) {
  const contenido = document.getElementById(contenedor);

  if (contenido.classList.contains("active")) {
    contenido.classList.remove("active");
  } else {
    contenido.classList.add("active");
  }
}
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">Reporte general de monitoreos realizados</h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
         @input="report.buscarTermino($event.target.value)"
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
        />
      </div>
      <div class="botones__descarga" v-if="displayedPageRange.length > 1">
        <a
          @click="
            descargarExcel(
             report.datosImport,
              `Reporte general de monitoreos - ${obtenerFecha()}`
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
             report.datosImport,
              `Reporte general de monitoreos - ${obtenerFecha()}`,
              9,
              5
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
      </div>
    </div>
    <hr />
    <LoadingData v-if="report.cargando" />
    <main class="monitoreos__grid">
    <div v-for="(monitoreo, index) in report.displayedData" :key="index">
      <div class="card">
        <div class="card__encabezado">
          <p class="fecha__monitoreo">
            Fecha Monitoreo:
            <span class="dato">{{ monitoreo.fecha_monitoreo }}</span>
          </p>
        </div>
        <!-- datos de la especie -->
        <div class="especie">
          <div class="especie__imagen">
            <img src="/icons/icon-arbol-lupa.png" alt="icon monitoreo" />
          </div>
          <p class="especie__info nombre__comun">
            <span class="dato" :class="{ sinInfo: !monitoreo.nom_comunes }">{{
              monitoreo.nom_comunes
            }}</span>
          </p>
          <p class="especie__info">
            <span
              class="dato"
              :class="{ sinInfo: !monitoreo.nombre_cientifico }"
              >{{ monitoreo.nombre_cientifico }}</span
            >
          </p>
          <p class="especie__info">
            código especie:
            <span class="dato" :class="{ sinInfo: !monitoreo.cod_especie }">{{
              monitoreo.cod_especie
            }}</span>
          </p>
          <p class="especie__info">
            # placa:
            <span class="dato" :class="{ sinInfo: !monitoreo.numero_placa }">{{
              monitoreo.numero_placa ? monitoreo.numero_placa : "Sin placa"
            }}</span>
          </p>
        </div>
        <hr />
        <!-- fin especie -->
        <!-- datos Desarrollo especie -->
        <div class="informacion__seccion" :id="index + 'a'">
          <button
            id="boton-especie"
            class="card__boton"
            @click="toggleDetalles(index + 'a')"
          >
            Desarrollo especie
          </button>
          <div class="datos">
            <h4 class="datos__titulo">Datos Fruto</h4>
            
            <p class="datos__item">
              Color fruto:
              <span class="dato" :class="{ sinInfo: !monitoreo.color_fruto }">{{
                monitoreo.color_fruto ? monitoreo.color_fruto : "No reportado"
              }}</span>
            </p>
            
            <p class="datos__item">
              Fauna frutos:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.fauna_frutos }"
                >{{
                  monitoreo.fauna_frutos
                    ? monitoreo.fauna_frutos
                    : "No reportado"
                }}</span
              >
            </p>
            
            <p class="datos__item">
              Estado madurez:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.estado_madurez }"
                >{{
                  monitoreo.estado_madurez
                    ? monitoreo.estado_madurez
                    : "No reportado"
                }}</span
              >
            </p>

            <p class="datos__item">
              Cant. semillas:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.cant_semillas }"
                >{{
                  monitoreo.cant_semillas
                    ? monitoreo.cant_semillas
                    : "No reportado"
                }}</span
              >
            </p>
            <h4 class="datos__titulo">Datos Flor</h4>
            <p class="datos__item">
              Color Flor:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.color_flor}"
                >{{
                  monitoreo.color_flor
                    ? monitoreo.color_flor
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
                Flor abierta:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.flor_abierta}"
                >{{
                  monitoreo.flor_abierta
                    ? monitoreo.flor_abierta
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
                Flor boton:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.flor_boton}"
                >{{
                  monitoreo.flor_boton
                    ? monitoreo.flor_boton
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
                Fauna flor:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.fauna_flor}"
                >{{
                  monitoreo.fauna_flor
                    ? monitoreo.fauna_flor
                    : "No reportado"
                }}</span
              >
            </p>
            
            <!-- boton coultar -->
            <p @click="toggleDetalles(index + 'a')" class="recoger">
              <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
            </p>
          </div>
        </div>
        <!-- fin Desarrollo especie-->
        <!-- ambiente y crecimiento -->
        <div class="informacion__seccion" :id="index + 'b'">
          <button
            id="boton-especie"
            class="card__boton"
            @click="toggleDetalles(index + 'b')"
          >
            Ambiente y crecimiento
          </button>
          <div class="datos">
            <h4 class="datos__titulo">Ambiente</h4>
            
            <p class="datos__item">
              Precipitacion:
              <span class="dato" :class="{ sinInfo: !monitoreo.precipitacion }">{{
                monitoreo.precipitacion ? monitoreo.precipitacion : "No reportado"
              }}</span>
            </p>
            
            <p class="datos__item">
              Temperatura:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.temperatura }"
                >{{
                  monitoreo.temperatura
                    ? monitoreo.temperatura
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
              Humedad:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.humedad}"
                >{{
                  monitoreo.humedad
                    ? monitoreo.humedad
                    : "No reportado"
                }}</span
              >
            </p>
            
            <p class="datos__item">
              Factor climatico:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.factor_climatico }"
                >{{
                  monitoreo.factor_climatico
                    ? monitoreo.factor_climatico
                    : "No reportado"
                }}</span
              >
            </p>
            <h4 class="datos__titulo">Crecimiento</h4>
           
            <p class="datos__item">
              Medida Peso Frutos:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.medida_peso_frutos}"
                >{{
                  monitoreo.medida_peso_frutos
                    ? monitoreo.medida_peso_frutos
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
              Medida Peso semillas:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.medida_peso_sem}"
                >{{
                  monitoreo.medida_peso_sem
                    ? monitoreo.medida_peso_sem
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
              Follaje:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.follaje_porcentaje}"
                >{{
                  monitoreo.follaje_porcentaje
                    ? monitoreo.follaje_porcentaje
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
              Fitosanitario:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.fitosanitario }"
                >{{
                  monitoreo.fitosanitario
                    ? monitoreo.fitosanitario
                    : "No reportado"
                }}</span
              >
            </p>
            <!-- boton coultar -->
            <p @click="toggleDetalles(index + 'b')" class="recoger">
              <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
            </p>
          </div>
        </div>
        <!-- fin ambiente y crecimiento -->
        <!-- observaciones -->
        <div class="informacion__seccion" :id="index + 'c'">
          <button
            id="boton-especie"
            class="card__boton"
            @click="toggleDetalles(index + 'c')"
          >
            Obervaciones
          </button>
          <div class="datos">            
            <p class="datos__item">
              Frutos:
              <span class="dato" :class="{ sinInfo: !monitoreo.observacion_frutos}">{{
                monitoreo.observacion_frutos? monitoreo.observacion_frutos: "No reportado"
              }}</span>
            </p>
            
            <p class="datos__item">
              
              Flor:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.observaciones_flor }"
                >{{
                  monitoreo.observaciones_flor
                    ? monitoreo.observaciones_flor
                    : "No reportado"
                }}</span
              >
            </p>
            <p class="datos__item">
              Follaje:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.observaciones_follaje}"
                >{{
                  monitoreo.observaciones_follaje
                    ? monitoreo.observaciones_follaje
                    : "No reportado"
                }}</span
              >
            </p>
                     
            <p class="datos__item">
              General:
              <span
                class="dato"
                :class="{ sinInfo: !monitoreo.observaciones}"
                >{{
                  monitoreo.observaciones
                    ? monitoreo.observaciones
                    : "No reportado"
                }}</span
              >
            </p>
           
            <!-- boton coultar -->
            <p @click="toggleDetalles(index + 'c')" class="recoger">
              <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
            </p>
          </div>
        </div>
        <!-- fin obervaciones -->
      </div>
    </div>
  </main>
   <!-- paginador -->
   <section class="paginador">
      <div class="paginador__botones">
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="report.currentPage > 1"
          @click="report.changePage(report.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="report.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === report.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="report.currentPage < report.totalPages"
          @click="report.changePage(report.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
        v-if="report.monitoringData.length == 0 && !report.cargando"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
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
.recoger {
  margin: 0;
  text-align: center;
  font-size: 1rem;
}
.recoger:hover {
  cursor: pointer;
  color: var(--primary);
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
/* seccion especie */
.fecha__monitoreo{
  text-align: center;
  margin: .5rem;
}
.especie {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 0 0.5rem;
  margin-bottom: 0rem;
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
.monitoreos__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .monitoreos__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .monitoreos__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1820px) {
  .monitoreos__grid {
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
.datos__item {
  text-align: center;
  margin: 0.2rem 0;
  padding: 0 2rem;
}
.datos__titulo{
  text-align: center;
  font-weight: 700;
  padding: 0;
  margin: 0;
  color: var(--primary);
  border-bottom: 1px solid var(--primary);
}
.datos__item:last-of-type {
  margin-bottom: 2rem;
}

.informacion__seccion {
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
.informacion__seccion.active .datos {
  display: block;
}
</style>