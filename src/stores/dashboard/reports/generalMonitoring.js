import { ref, computed, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { ordenarPorFechas } from "@/helpers/";

import APIService from "@/services/APIService";

export const useGeneralMonitoring = defineStore("generalMonitoring", () => {
  const monitoringData = ref({});
  const monitoringDataOriginal = ref([]);
  const datosImport = ref([]);
  const cargando = ref(false);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  onMounted(async () => {
    cargando.value = true;
    const { data } = await APIService.getMonitoringData();
    monitoringData.value = data;
    monitoringDataOriginal.value = data;
    cargando.value = false;
    console.log(monitoringData.value);
    //ordenarPorFechas(monitoringData.value.value, "fecha_coleccion");
    //ordenarPorFechas(monitoringDataOriginal.value, "fecha_coleccion");
  });

  function cargarData() {
    monitoringData.value.forEach((dato) => {
      datosImport.value.push(dato);
    });
  }

  //cargar datos de importacion
  watch(
    () => monitoringData.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );

  return {
    datosImport,
    monitoringData,
  };
});
