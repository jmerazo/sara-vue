<script setup>
import { onMounted, ref, onBeforeUnmount, watchEffect  } from 'vue';
import { useReportsGeneral } from '../../stores/dashboard/reports'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const reports = useReportsGeneral();
const dataLoaded = ref(false);
let dataTable = null; // Variable para almacenar la instancia de DataTable

// Opciones para DataTable
const options = {
  data: [], // Datos a mostrar
  dom: 'Blfrtip',
  columns: [
    { data: 'numero_placa', title: 'Número placa' },
    { data: 'nom_comunes', title: 'Nombre común' },
    { data: 'nombre_cientifico', title: 'Nombre científico' },
    { data: 'cod_especie', title: 'Código especie' },
    { data: 'fecha_coleccion', title: 'Fecha' },
    { data: 'nro_muestras', title: 'Hora' },
    { data: 'colector_ppal', title: 'Colector' },
    { data: 'siglas_colector_ppal', title: 'Siglas colector' },
    { data: 'nro_coleccion', title: 'Número colección' },
    { data: 'voucher', title: 'Voucher' },
    { data: 'nombres_colectores', title: 'Nombre colector asociados' },
    { data: 'otros_nombres', title: 'Otros nombres' },
    { data: 'descripcion', title: 'descripcion' },
    { data: 'usos', title: 'Usos' },
  ],
  pageLength: 10,
  buttons: [
    /* {
      extend: 'copy',
      text: 'Copy',
      exportOptions: {
        columns: ':visible'
      }
    }, */ 'csv', 
    {
      extend: 'excel',
      text: '<i class="fas fa-file-excel"></i> Excel',
      className: 'btn btn-primary'
    },
    'print',
    {
      extend: 'pdfHtml5',
      exportOptions: {
        columns: ':visible'
      },
      customize: function(doc) {
        // Configuración del documento PDF
        doc.defaultStyle.fontSize = 8; // Reducir el tamaño de la fuente
        doc.pageOrientation = 'landscape'; // Cambiar la orientación del papel a horizontal
        // ... otras configuraciones que desees
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
    await reports.fetchSamplesData();
    console.log('data: ', reports.samplesData)
    options.data = reports.samplesData; // Actualiza los datos cuando se cargan
    dataLoaded.value = true;    

    if (dataLoaded.value) {
      initializeDataTable();
    }
});

watchEffect(() => {
  if (dataLoaded.value) {
    initializeDataTable();
  }
});

function initializeDataTable() {
  const tableElement = document.getElementById('samples-table');
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
  <div v-if="dataLoaded" class="m-3 table-container">
    <div class="text-center">
      <h1 class="font-bold">Muestras realizadas</h1>
    </div>
    <DataTable id="sam-table" :options="options" class="display">
      <template v-slot:head>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{ column.title }}</th>
        </tr>
      </template>
      <template v-slot:default="{ items }">
        <tbody>
          <tr v-for="(sam, rowIndex) in items" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              {{ sam[column.data] }}
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

.table-container {
  max-width: 100%; /* Ancho máximo permitido */
  overflow-x: auto; /* Habilita el desplazamiento horizontal */
}
</style>