<script setup>
import { computed } from "vue";
import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";
import { useCandidateStore } from '@/stores/dashboard/reports/SpecieCandidates'
import ModalInfoCandidate from '@/components/dashboard/modals/ModalInfoCandidate.vue';
import ModalCandidates from '@/components/dashboard/modals/ModalCandidates.vue'



const consulta = useCandidateStore();

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = consulta.currentPage;
  const totalPages = consulta.totalPagesCandidates;
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
      Candidatos de la especie {{ consulta.nombreEspecie }}
    </h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="consulta.buscarTermino($event.target.value)"
        />
      </div>
      <div class="botones__descarga" v-if="displayedPageRange.length > 1">
        <a @click="descargarExcel(consulta.datosImport,`candidatos ${consulta.nombreEspecie}`)" class="boton" href="#"
          ><font-awesome-icon
            class="boton__excel"
            :icon="['fas', 'file-excel']"
        /></a>
        <a
          @click="descargarPdf(consulta.datosImport, `candidatos de la especie ${consulta.nombreEspecie} - ${obtenerFecha()}`,8,1)"
          class="boton"
          href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
        
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <main>
      <table class="tabla">
        <thead class="tabla__encabezado">
          <tr class="tabla__fila">
            <th class="dato__encabezado fecha">Fecha evaluación</th>
            <th class="dato__encabezado"># Placa</th>
            <th class="dato__encabezado">Código expediente</th>
            <th class="dato__encabezado">Departamento</th>
            <th class="dato__encabezado">Municipio</th>
            <th class="dato__encabezado">Acciones</th>
          </tr>
        </thead>
        <tbody class="tabla__contenido">
          <tr
            class="tabla__fila"
            v-for="candidato in consulta.displayedCandidates"
            :key="candidato.ShortcutIDEV"
          >
            <td class="tabla__dato fecha">
              <span class="nombre__campo">Fecha evaluación: </span>
              {{ candidato.fecha_evaluacion }}
            </td>
            <td class="tabla__dato">
              <span class="nombre__campo"># Placa: </span>
              <span
                :class="{
                  placa: !candidato.numero_placa,
                }"
              >
                {{
                  candidato.numero_placa ? candidato.numero_placa : "Sin placa"
                }}
              </span>
            </td>
            <td class="tabla__dato">
              <span class="nombre__campo">Código expediente: </span>
              {{ candidato.cod_expediente }}
            </td>
            <td class="tabla__dato">
              <span class="nombre__campo">Departamento: </span>
              {{ candidato.departamento }}
            </td>
            <td class="tabla__dato">
              <span class="nombre__campo">Municipio: </span>
              {{ candidato.municipio }}
            </td>
            <td class="tabla__dato tabla__botones">
              <button
                @click="consulta.verMonitoreosCandidato(candidato.ShortcutIDEV)"
                class="tabla__boton"
              >
                <font-awesome-icon :icon="['fas', 'eye']" /> Ver Monitoreos
              </button>
              <button
                @click="consulta.mostrarInfoCandidato(candidato)"
                class="tabla__boton tabla__boton--secundario"
              >
                <font-awesome-icon :icon="['fas', 'angles-right']" /> Info
                Candidato
              </button>
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
          @click="consulta.changePageCandidates(consulta.currentPage - 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-left']" />
        </button>

        <button
          v-for="page in displayedPageRange"
          :key="page"
          @click="consulta.changePageCandidates(page)"
          class="paginador__boton"
          :class="{ 'paginador__boton-actual': page === consulta.currentPage }"
        >
          {{ page }}
        </button>
        <button
          class="paginador__boton paginador__boton--siguiente"
          v-if="consulta.currentPage < consulta.totalPages"
          @click="consulta.changePageCandidates(consulta.currentPage + 1)"
        >
          <font-awesome-icon :icon="['fas', 'angles-right']" />
        </button>
      </div>
    </section>
    <!--fin paginador -->
    <!-- texto validacion buscador -->
    <section class="validacion__contenido">
      <h1
        v-if="consulta.candidatosEspecie.length == 0"
        class="validacion__heading"
      >
        No hay resultados de búsqueda
      </h1>
    </section>
    <!--fin texto validacion buscador -->
    <ModalCandidates/>
    <ModalInfoCandidate/>
  </div>
</template>

<style scope>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.3rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.8rem;
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
  width: 100%;
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

.placa {
  background-color: rgb(248, 205, 205);
  width: 30%;
  border-radius: 7px;
  padding: 1px;
  color: rgb(145, 18, 18);
}
.tabla__botones {
  display: flex;
  gap: 1rem;
}
.tabla__boton {
  background-color: var(--primary);
  text-align: center;
  color: var(--blanco);
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  transition: background-color 0.3s ease;
}
.tabla__boton--secundario {
  background-color: var(--secondary);
}

.tabla__boton:hover {
  background-color: var(--primary-hover);
}
.tabla__boton--secundario:hover {
  background-color: var(--secondary-hover);
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
  }

  .nombre__campo {
    font-weight: 900;
    display: inline;
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
  .tabla__botones {
    gap: 0.7rem;
    margin-bottom: 1rem;
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
</style>