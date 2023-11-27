<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useReportsGeneral } from '../../stores/dashboard/reports'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const reports = useReportsGeneral();
const dataLoaded = ref(false);
let dataTable = null; // Variable para almacenar la instancia de DataTable

// Opciones para DataTable
const options = {
  data: reports.assessmentData, // Datos a mostrar
  dom: 'Blfrtip',
  columns: [
    { data: 'numero_placa', title: 'Número placa' },
    { data: 'cod_expediente', title: 'Código de expediente' },
    { data: 'cod_especie', title: 'Código Especie' },
    { data: 'fecha_evaluacion', title: 'Fecha de evaluación' },
    { data: 'departamento', title: 'Departamento' },
    { data: 'municipio', title: 'Municipio' },
    { data: 'nombre_del_predio', title: 'Predio' },
    { data: 'nombre_propietario', title: 'Propietario' },
    { data: 'corregimiento', title: 'Corregimiento' },
    { data: 'vereda', title: 'Vereda' },
    { data: 'correo', title: 'Correo' },
    { data: 'celular', title: 'Celular' },
    { data: 'altitud', title: 'Altitud' },
    { data: 'latitud', title: 'Latitud' },
    { data: 'g_lat', title: 'Grados' },
    { data: 'm_lat', title: 'Min' },
    { data: 's_lat', title: 'Seg' },
    { data: 'longitud', title: 'Longitud' },
    { data: 'g_long', title: 'Grados' },
    { data: 'm_long', title: 'Min' },
    { data: 's_long', title: 'Seg' },
    { data: 'coordenadas_decimales', title: 'Coord. GPS' },
    { data: 'abcisa_xy', title: 'Coord. Google' },
    { data: 'altura_total', title: 'Alt. Total' },
    { data: 'altura_comercial', title: 'Alt. com' },
    { data: 'municipio', title: 'municipio' },
    { data: 'entorno_individuo', title: 'Entorno' },
    { data: 'cobertura', title: 'Cobertura' },
    { data: 'dominancia_if', title: 'Dominancia' },
    { data: 'forma_fuste', title: 'Forma fuste' },
    { data: 'dominancia', title: 'Dominancia Eje' },
    { data: 'alt_bifurcacion', title: 'Bifurcación' },
    { data: 'estado_copa', title: 'Estado copa' },
    { data: 'fitosanitario', title: 'Est. Fitosanitario' },
    { data: 'presencia', title: 'Parasitas' },
    { data: 'resultado', title: 'resultado' },
    { data: 'evaluacion', title: 'Evaluación' },
    { data: 'observaciones', title: 'Observaciones' },
  ],
  pageLength: 15,
  buttons: [
    {
      extend: 'copy',
      text: 'Copy',
      exportOptions: {
        columns: ':visible'
      }
    }, 'csv', 
    {
      extend: 'excel',
      text: '<i class="fas fa-file-excel"></i> Excel',
      className: 'btn btn-primary'
    }, 'print',
    {
      extend: 'pdfHtml5',
      exportOptions: {
        columns: ':visible'
      },
      customize: function(doc) {
        // Cargar las fuentes necesarias
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
    }
  ],
  select: true,
  paging: true, // Habilita la paginación
  lengthMenu: [10, 15, 25, 50],
  lengthChange: true, // Habilita el control de longitud de página
};

onMounted(async () => {
    await reports.fetchAssessmentData();
    console.log('data: ', reports.assessmentData)
    options.data = reports.assessmentData; // Actualiza los datos cuando se cargan
    dataLoaded.value = true;    

    if (dataLoaded.value) {
      initializeDataTable();
    }
});

function initializeDataTable() {
  const tableElement = document.getElementById('assessment-table');
  if (tableElement) {
    dataTable = $(tableElement).DataTable(options);
  }
}

// Destruir la instancia de DataTable cuando el componente se desmonte
onBeforeUnmount(() => {
  if (dataTable !== null) {
    dataTable.destroy(true);
    dataTable = null;
  }
});
</script>

<template>
  <div v-if="dataLoaded" class="m-3">
    <DataTable id="assessment-table" :options="options" class="display">
      <template v-slot:head>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
        </tr>
      </template>
      <template v-slot:default="{ items }">
        <tbody>
          <tr v-for="(assessment, rowIndex) in items" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ assessment[column.data] }}
            </td>
          </tr>
        </tbody>
      </template>
    </DataTable>
  </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-select-dt';
</style>