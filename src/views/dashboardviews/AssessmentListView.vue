<script setup>
import { computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGeneralEvaluations } from "@/stores/dashboard/reports/generalEvaluations";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";
import { useModalStore } from "../../stores/modal";
//componentes
import LoadingData from "@/components/LoadingData.vue";
//import ModalForestSpecieUpdate from "@/components/dashboard/ModalForestSpecieUpdate.vue";
import ModalCandidateAdd from "@/components/dashboard/ModalCandidateAdd.vue";

const modal = useModalStore();
const report = useGeneralEvaluations();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  report.quitarFiltroBuscado();
  next();
});

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

//furncion para mostrar el contenido evaluaciones
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
    <h1 class="reporte__heading">Reporte general de evaluaciones</h1>
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
      <div class="botones__descarga" v-if="displayedPageRange.length >= 1">
        <a
          @click="
            descargarExcel(
              report.datosImport,
              `Reporte general de evaluaciones - ${obtenerFecha()}`
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
              `Reporte general de evaluaciones - ${obtenerFecha()}`,
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
    <main class="evaluaciones__grid">
      <div v-for="(evaluacion, index) in report.displayedData" :key="index">
        <div class="card">
          <div class="card__encabezado">
            <p class="fecha__evaluacion">
              Fecha Evaluación:
              <span class="dato">{{ evaluacion.fecha_evaluacion }}</span>
            </p>
          </div>
          <!-- datos de la especie -->
          <div class="especie">
            <div class="especie__imagen">
              <img src="/icons/icono-evalucacion.png" alt="icono evalucaion" />
            </div>
            <div>
              <p class="especie__info nombre__comun">Expediente:</p>
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.cod_expediente }"
                >{{ evaluacion.cod_expediente }}</span
              >
            </div>
            <p class="especie__info">
              código especie:
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.cod_especie }"
                >{{ evaluacion.cod_especie }}</span
              >
            </p>
            <p class="especie__info">
              # placa:
              <span
                class="dato"
                :class="{ sinInfo: !evaluacion.numero_placa }"
                >{{
                  evaluacion.numero_placa
                    ? evaluacion.numero_placa
                    : "Sin placa"
                }}</span
              >
            </p>
          </div>
          <hr />
          <!-- fin especie -->
          <!-- datos Ubicacion -->
          <div class="informacion__seccion" :id="index + 'a'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'a')"
            >
              Ubicación
            </button>
            <div class="datos">
              <p class="datos__item">
                Departamento:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.departamento }"
                  >{{
                    evaluacion.departamento
                      ? evaluacion.departamento
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Municipio:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.municipio }"
                  >{{
                    evaluacion.municipio ? evaluacion.municipio : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Corregimiento:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.corregimiento }"
                  >{{
                    evaluacion.corregimiento
                      ? evaluacion.corregimiento
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Vereda:
                <span class="dato" :class="{ sinInfo: !evaluacion.vereda }">{{
                  evaluacion.vereda ? evaluacion.vereda : "No reportado"
                }}</span>
              </p>

              <p class="datos__item">
                Predio:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.nombre_del_predio }"
                  >{{
                    evaluacion.nombre_del_predio
                      ? evaluacion.nombre_del_predio
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Propietario:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.nombre_propietario }"
                  >{{
                    evaluacion.nombre_propietario
                      ? evaluacion.nombre_propietario
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Celular:
                <span class="dato" :class="{ sinInfo: !evaluacion.celular }">{{
                  evaluacion.celular ? evaluacion.celular : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Correo:
                <span class="dato" :class="{ sinInfo: !evaluacion.correo }">{{
                  evaluacion.correo ? evaluacion.correo : "No reportado"
                }}</span>
              </p>

              <!-- boton coultar -->
              <p @click="toggleDetalles(index + 'a')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin Ubicacion-->
          <!-- Datos evalucion -->
          <div class="informacion__seccion" :id="index + 'b'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'b')"
            >
              Evaluación
            </button>
            <div class="datos">
              <h4 class="datos__titulo">Estados</h4>

              <p class="datos__item">
                Dominancia:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.dominancia }"
                  >{{
                    evaluacion.dominancia
                      ? evaluacion.dominancia
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Copa:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.estado_copa }"
                  >{{
                    evaluacion.estado_copa
                      ? evaluacion.estado_copa
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Posicion copa:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.posicion_copa }"
                  >{{
                    evaluacion.posicion_copa
                      ? evaluacion.posicion_copa
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Forma fuste:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.forma_fuste }"
                  >{{
                    evaluacion.forma_fuste
                      ? evaluacion.forma_fuste
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Alt. Bifurcacion:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.alt_bifurcacion }"
                  >{{
                    evaluacion.alt_bifurcacion
                      ? evaluacion.alt_bifurcacion
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Fitosanitario:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.fitosanitario }"
                  >{{
                    evaluacion.fitosanitario
                      ? evaluacion.fitosanitario
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Presencia:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.presencia }"
                  >{{
                    evaluacion.presencia ? evaluacion.presencia : "No reportado"
                  }}</span
                >
              </p>
              <h4 class="datos__titulo">Resultado</h4>
              <p class="datos__item">
                Puntaje:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.resultado }"
                  >{{
                    evaluacion.resultado ? evaluacion.resultado : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.evaluacion }"
                  >{{
                    evaluacion.evaluacion
                      ? evaluacion.evaluacion
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Evaluador:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.usuario_evaluador }"
                  >{{
                    evaluacion.usuario_evaluador
                      ? evaluacion.usuario_evaluador
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
          <!-- fin datos evaluacion -->
          <!-- Atributos -->
          <div class="informacion__seccion" :id="index + 'c'">
            <button
              id="boton-especie"
              class="card__boton"
              @click="toggleDetalles(index + 'c')"
            >
              Atributos
            </button>
            <div class="datos">
              <p class="datos__item">
                Eje X:
                <span class="dato" :class="{ sinInfo: !evaluacion.eje_x }">{{
                  evaluacion.eje_x ? evaluacion.eje_x : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Eje Y:
                <span class="dato" :class="{ sinInfo: !evaluacion.eje_y }">{{
                  evaluacion.eje_y ? evaluacion.eje_y : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Abcisa XY:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.abcisa_xy }"
                  >{{
                    evaluacion.abcisa_xy ? evaluacion.abcisa_xy : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Cap:
                <span class="dato" :class="{ sinInfo: !evaluacion.cap }">{{
                  evaluacion.cap ? evaluacion.cap : "No reportado"
                }}</span>
              </p>
              <p class="datos__item">
                Altitud:
                <span class="dato" :class="{ sinInfo: !evaluacion.altitud }">{{
                  evaluacion.altitud ? evaluacion.altitud : "No reportado"
                }}</span>
              </p>

              <p class="datos__item">
                Altura comercial:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.altura_comercial }"
                  >{{
                    evaluacion.altura_comercial
                      ? evaluacion.altura_comercial
                      : "No reportado"
                  }}</span
                >
              </p>
              <p class="datos__item">
                Altura Total:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.altura_total }"
                  >{{
                    evaluacion.altura_total
                      ? evaluacion.altura_total
                      : "No reportado"
                  }}</span
                >
              </p>

              <p class="datos__item">
                Cobertura:
                <span
                  class="dato"
                  :class="{ sinInfo: !evaluacion.cobertura }"
                  >{{
                    evaluacion.cobertura ? evaluacion.cobertura : "No reportado"
                  }}</span
                >
              </p>

              <!-- boton coultar -->
              <p @click="toggleDetalles(index + 'c')" class="recoger">
                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']" />
              </p>
            </div>
          </div>
          <!-- fin atributos -->
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

    <div
      @click="modal.handleClickModalCandidateAdd()"
      class="agregar"
    ></div>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
        v-if="report.evaluacionData.length == 0 && !report.cargando"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->

    <ModalCandidateAdd/>
  </div>
</template>

<style scoped>
.agregar {
  background-image: url("/icons/icon-add.png");
  padding: 0;
  margin: 0;
  height: 3rem;
  background-position: center;
  background-size: cover;
  position: fixed;
  bottom: 10%;
  right: -1px;
  z-index: 2;
  width: 4rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.agregar:hover {
  transform: scale(1.08);
}

@media (min-width: 768px) {
  .agregar {
    right: 1%;
    height: 4rem;
    overflow: hidden;
    border-radius: 50%;
  }
  .agregar::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/icons/icon-add.png");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    transition: transform 0.3s ease-out;
  }
  .agregar:hover::before {
    transform: scale(1.08);
  }
  .agregar:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  }
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
.fecha__evaluacion {
  text-align: center;
  margin: 0.5rem;
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
.evaluaciones__grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .evaluaciones__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .evaluaciones__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1820px) {
  .evaluaciones__grid {
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

/* tarjeta de datos */
.datos__item {
  text-align: center;
  margin: 0.2rem 0;
  padding: 0 2rem;
}
.datos__titulo {
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