<script setup>
import { ref,computed } from "vue";
import Alerta from "@/components/dashboard/Alert.vue";
import { useSpecieMonitoriong } from "@/stores/dashboard/reports/SpecieMonitoring";

import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";

const consulta = useSpecieMonitoriong();

const fechaInicial = ref("");
const fechaFinal = ref("");
const error = ref("");

const limpiar = () => {
  fechaInicial.value = "";
  fechaFinal.value = "";
  consulta.limpiarFiltroFecha();
};

const consultarFechas = () => {
  if (!fechaFinal.value || !fechaInicial.value) {
    error.value = "Debe ingresar un rango de fechas";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }
  if (fechaInicial.value > fechaFinal.value) {
    error.value = "La fecha inicial no puede ser mayor a la fecha final";
    setTimeout(() => {
      error.value = "";
    }, 3000);
    return;
  }
  consulta.filtrarFecha(fechaInicial.value, fechaFinal.value);
};


//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = consulta.currentPage;
  const totalPages = consulta.totalPages;
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
    <!-- encabezado vista -->
    <h1 class="reporte__heading">
      Monitoreos de la especie {{ consulta.nombreEspecie }}
    </h1>
    <div class="contenido__header">
      <fieldset class="buscador">
        <legend class="buscador__titulo">Filtrar fecha de monitoreo</legend>

        <div class="buscador__flex">
          <div class="buscador__inputs">
            <div>
              <label class="buscador__label">Fecha inicial: </label>
              <input
                class="buscador__input"
                type="date"
                v-model="fechaInicial"
              />
            </div>
            <div>
              <label class="buscador__label">Fecha final: </label>
              <input class="buscador__input" type="date" v-model="fechaFinal" />
            </div>
          </div>

          <div class="buscador__botones">
            <button @click="consultarFechas()" class="buscador__boton">
              Filtrar fechas
            </button>
            <button
              v-if="fechaInicial && fechaFinal"
              @click="limpiar"
              class="buscador__boton buscador__boton--limpiar"
            >
              limpiar filtro
            </button>
          </div>
        </div>
        <Alerta v-if="error">
          <p>{{ error }}</p>
        </Alerta>
      </fieldset>
      <div class="botones__descarga" v-if="displayedPageRange.length > 1">
        <a
          @click="
            descargarExcel(
              consulta.datosImport,
              `Monitoreos ${consulta.nombreEspecie} - ${obtenerFecha()}`
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
              consulta.datosImport,
              `Monitoreos de la especie ${consulta.nombreEspecie} - ${ obtenerFecha() }`,11,5
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
      </div>
    </div>
  </div>

  <!-- fin encabezado vista -->

  <hr />
  <main>
    <table class="tabla">
      <thead class="tabla__encabezado">
        <tr class="tabla__fila">
          <th class="dato__encabezado fecha">Fecha monitoreo</th>
          <th class="dato__encabezado">Altura total</th>
          <th class="dato__encabezado">Altura comercial</th>
          <th class="dato__encabezado">Estado Follaje</th>
          <th class="dato__encabezado">Tamaño follaje</th>
        </tr>
      </thead>
      <tbody class="tabla__contenido">
        <tr
          class="tabla__fila"
          v-for="monitoreo in consulta.displayedMonitoring"
          v-bind:key="monitoreo.IDmonitoreo"
        >
          <td class="tabla__dato fecha">
            <span class="nombre__campo">Fecha monitoreo</span>
            {{ monitoreo.fecha_monitoreo }}
          </td>
          <td class="tabla__dato" :class="{ sinInfo: !monitoreo.altura_total }">
            <span class="nombre__campo">Altura Total: </span
            >{{
              monitoreo.altura_total ? monitoreo.altura_total : "Por evaluar"
            }}
          </td>
          <td
            class="tabla__dato"
            :class="{ sinInfo: !monitoreo.altura_comercial }"
          >
            <span class="nombre__campo">Altura comerical: </span
            >{{
              monitoreo.altura_comercial
                ? monitoreo.altura_comercial
                : "Por evaluar"
            }}
          </td>
          <td class="tabla__dato" :class="{ sinInfo: !monitoreo.follaje }">
            <span class="nombre__campo">Follaje estado: </span
            >{{ monitoreo.follaje ? monitoreo.follaje : "Por evaluar" }}
          </td>
          <td
            class="tabla__dato tabla__ultimo"
            :class="{ sinInfo: !monitoreo.follaje_porcentaje }"
          >
            <span class="nombre__campo">Tamaño Follaje: </span
            >{{
              monitoreo.follaje_porcentaje
                ? monitoreo.follaje_porcentaje
                : "Por evaluar"
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </main>

<!-- paginador -->
<section class="paginador">
      <div class="paginador__botones">
        <button
          class="paginador__boton paginador__boton--anterior"
          v-if="consulta.currentPage > 1"
          @click="consulta.changePage(consulta.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="consulta.changePage(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === consulta.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="consulta.currentPage < consulta.totalPages"
          @click="consulta.changePage(consulta.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
      v-if="consulta.monitoreosEspecie.length == 0"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->








  

  
</template>

<style  scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1rem;
  margin: 2rem 0 1rem 0;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.5rem;
    margin: 3rem;
  }
}
.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 0.5rem;
}

/* buscador */
.buscador {
  border: 1px solid var(--primary);
}

.buscador:last-of-type {
  margin-bottom: 0rem;
}
.buscador legend {
  background-color: var(--primary);
  width: 100%;
  text-align: center;
  color: var(--blanco);
  text-transform: uppercase;
  font-weight: 400;
  padding: 0.1rem;
  font-size: 0.9rem;
  margin-bottom: 0.1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
@media (min-width: 768px) {
  .buscador legend {
    margin-bottom: 1rem;
  }
}
.buscador__flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}
.buscador__label {
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  display: block;
  text-align: center;
}

@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    text-align: left;
    font-size: 1rem;
  }
}
.buscador__inputs {
  display: flex;
  font-size: 0.8rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
}
@media (min-width: 992px) {
  .buscador__inputs {
    flex-direction: row;
    gap: 1rem;
  }
}

.buscador__boton {
  color: var(--blanco);
  background-color: var(--primary);
  padding: 0.2rem 0.4rem;
  border-radius: 5px;
  margin-left: 0.5rem;
  margin-bottom: 0.3rem;
  transition: background-color 0.3s ease;
}
.buscador__boton--limpiar {
  background-color: rgb(138, 9, 9);
  opacity: 0.8;
}

.buscador__boton:hover {
  background-color: var(--primary-hover);
}
.buscador__boton--limpiar:hover {
  background-color: rgb(138, 9, 9);
  opacity: 1;
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

/* Tabla */
/* Estilos para escritorio*/
.tabla {
  width: 70%;
  margin: 0 auto;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: var(--blanco);
}

.dato__encabezado {
  background-color: var(--primary-backgound);
}

.tabla__fila,
.tabla__dato {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.nombre__campo {
  font-weight: 900;
  display: none;
}

.dato__encabezado {
  font-weight: 900;
  border: 1px solid #ddd;
  padding: 5px;
  text-align: left;
}
/* Estilos para dispositivos */
@media (max-width: 768px) {
  .tabla,
  .dato__encabezado,
  .tabla__contenido,
  .tabla__fila,
  .tabla__dato {
    display: block;
  }
  .tabla {
    background-color: unset;
    width: 90%;
  }

  .nombre__campo {
    font-weight: 900;
    display: inline;
    margin: 0;
    padding: 0;
  }
  .tabla__ultimo {
    margin-bottom: 1rem;
  }

  .dato__encabezado {
    display: none;
  }
  .tabla__fila {
    padding: 0;
    border-radius: 5px;
    background-color: var(--blanco);
    margin-bottom: 1rem;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .tabla__dato {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 5px;
    position: relative;
  }

  .fecha {
    text-align: center;
    padding: 10px;
  }
}

/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 1.5rem;
}
.sinInfo {
  color: rgb(240, 176, 176);
}
</style>