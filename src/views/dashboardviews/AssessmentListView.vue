<script setup>
import { onMounted, ref } from 'vue';
import { useReportsGeneral } from '../../stores/dashboard/reports'

const reports = useReportsGeneral();
const dataLoaded = ref(false);

// Opciones para DataTable
const options = {
  data: reports.assessmentData, // Datos a mostrar
  columns: [
    { data: 'numero_placa', title: 'Número placa' },
    { data: 'cod_expediente', title: 'Código de expediente' },
    { data: 'cod_especie', title: 'Código Especie' },
    { data: 'fecha_evaluacion', title: 'Fecha de evaluación' },
  ],
  pageLength: 15,
  buttons: ['copy', 'excel', 'pdf', 'print'],
};

onMounted(async () => {
    await reports.fetchAssessmentData();
    console.log('data: ', reports.assessmentData)
    options.data = reports.assessmentData; // Actualiza los datos cuando se cargan
    dataLoaded.value = true;    
});
</script>

<template>
    <div v-if="dataLoaded" class="m-3">
      <DataTable id="assessment-table" :options="options">
        <template v-slot:head>
          <tr>
            <th>Número placa</th>
            <th>Código de expediente</th>
            <th>Código Especie</th>
            <th>Fecha de evaluación</th>
          </tr>
        </template>
        <template v-slot:default="{ items }">
          <tbody>
            <tr v-for="(assessment, index) in items" :key="index">
              <td>{{ assessment.numero_placa }}</td>
              <td>{{ assessment.cod_expediente }}</td>
              <td>{{ assessment.cod_especie }}</td>
              <td>{{ assessment.fecha_evaluacion }}</td>
            </tr>
          </tbody>
        </template>
      </DataTable>
    </div>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>