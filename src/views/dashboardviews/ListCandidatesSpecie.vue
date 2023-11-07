<script setup>
import { useConsultaStore } from "@/stores/consulta";

const consulta = useConsultaStore();
</script>
<template>
  <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">
    Candidatos de la especie {{ consulta.nombreEspecie }}
  </h1>

  <hr />
  <table class="bg-slate-50 shadow-md border rounded-lg mx-auto mt-5 table custom-table">
    <thead>
      <tr>
        <th class="px-4 py-2 text-gray-600">Fecha evaluación</th>
        <th class="px-4 py-2 text-gray-600">Numero de placa</th>
        <th class="px-4 py-2 text-gray-600">Código expediente</th>
        <th class="px-4 py-2 text-gray-600">Departamento</th>
        <th class="px-4 py-2 text-gray-600">Municipio</th>
        <th class="px-4 py-2 text-gray-600">Altura comercial</th>
        <th class="px-4 py-2 text-gray-600">Altura total</th>
        <th class="px-4 py-2 text-gray-600">Evaluación</th>
        <th class="px-4 py-2 text-gray-600">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="candidato in consulta.displayedCandidates"
        v-bind:key="candidato.ShortcutIDEV"
      >
        <td class="px-4 py-3 border">{{ candidato.fecha_evaluacion }}</td>
        <td  class="px-4 py-3 border">
          <button 
            :class="{'font-bold rounded-lg bg-red-200 p-1': !candidato.numero_placa }"
            >
            {{ candidato.numero_placa ? candidato.numero_placa : 'Sin placa' }}
          </button>
        </td>
       
        <td class="px-4 py-3 border">{{ candidato.cod_expediente }}</td>
        <td class="px-4 py-3 border">{{ candidato.departamento }}</td>
        <td class="px-4 py-3 border">{{ candidato.municipio }}</td>
        <td class="px-4 py-3 border">{{ candidato.altura_comercial }}</td>
        <td class="px-4 py-3 border">{{ candidato.altura_total }}</td>
        <td class="px-4 py-3 border">{{ candidato.evaluacion }}</td>
        <td class="px-4 py-3 border">
          <button
            @click="consulta.verMonitoreosCandidato(candidato.ShortcutIDEV)"
            class="w-full btn rounded-lg font-bold p-1 text-gray-900 bg-green-600 hover:bg-green-500 hover:shadow-lg"
          >
            <font-awesome-icon :icon="['fas', 'eye']" /> Ver Monitoreos
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- paginador -->
  <div class="flex justify-center mt-5 mb-10">
    <button
      v-for="page in consulta.totalPagesCandidates"
      :key="page"
      @click="consulta.changePageCandidates(page)"
      class="px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600"
      :class="{ 'bg-green-600': page === consulta.currentPage }"
    >
      {{ page }}
    </button>
  </div>

  <h1
    v-if="consulta.candidatosEpecie.length == 0"
    class="text-center font-bold text-2xl mt-5 mb-40"
  >
    No hay monitoreos para la especie
    <span class="text-green-900">{{ consulta.nombreEspecie }}</span>
  </h1>
</template>

<style scope>
.custom-table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-collapse: collapse; /* Agregamos esto para mostrar todos los bordes */
}

.custom-table th, .custom-table td {
  border: 1px solid rgba(0, 0, 0, 0.125); /* Borde para todas las celdas */
  padding: 0.5rem; /* Ajusta el espaciado interior de las celdas */
}

.custom-table th {
  background-color: #f8f9fa;
  text-align: left;
}

/* Estilo responsivo para que la tabla sea desplazable horizontalmente en pantallas pequeñas */
@media (max-width: 767px) {
  .custom-table {
    overflow-x: auto;
    display: block;
  }
  
  .custom-table thead {
    display: none;
  }
  
  .custom-table tbody {
    display: block;
  }
  
  .custom-table tbody tr {
    margin-bottom: 0.625rem;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .custom-table tbody tr td {
    padding: 0.625rem;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    flex-basis: 100%;
    text-align: center;
  }
}
</style>