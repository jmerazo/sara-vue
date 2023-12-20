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
    ordenarPorFechas(monitoringData.value, "fecha_monitoreo");
    ordenarPorFechas(monitoringDataOriginal.value, "fecha_monitoreo");
    cargando.value = false;
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

  //motor de busqueda para el reporte de monitoreos realizados
  function buscarTermino(termino) {
    changePage(1);
     monitoringData.value =  monitoringDataOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerComun = term.nom_comunes
        ? term.nom_comunes.toLowerCase()
        : "";
      const lowerNombre_cientifico = term.nombre_cientifico
        ? term.nombre_cientifico.toLowerCase()
        : "";
      // Verifica si la placa es igual al término (ya sea número o cadena)
      const termCdoEspecie =
        term.cod_especie != null ? term.cod_especie.toString() : ""; // Convierte el número a cadena
      const termPlaca =
        term.numero_placa != null ? term.numero_placa.toString() : ""; // Convierte el número a cadena

      return (
        lowerComun.includes(lowerTermino) ||
        lowerNombre_cientifico.includes(lowerTermino) ||
        termCdoEspecie === termino ||// Compara término y numero placa
        termPlaca === termino // Compara término y numero placa
      );
    });
  }

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil( monitoringData.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a monitoreos por especie
  const displayedData = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return  monitoringData.value.slice(start, end);
    } catch {
      console.log("esperando paginación...");
    }
  });

  //función para cambiar de página monitoreos por especie
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //quitar los filtros del motor de busqueda
  function quitarFiltroBuscado() {
    if (monitoringDataOriginal.value) {
      monitoringData.value = monitoringDataOriginal.value;
    }
  }
  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    displayedData,
    datosImport,
    monitoringData,
    buscarTermino,
    changePage,
    quitarFiltroBuscado
  };
});
