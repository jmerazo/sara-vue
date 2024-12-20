import { ref, onMounted, watch, computed } from "vue";
import { defineStore } from "pinia";
import { ordenarPorFechas, downloadPdf } from "@/helpers/";
import APIService from "@/services/APIService";

export const useGeneralEvaluations = defineStore("generalEvaluations", () => {
  //data
  const evaluacionData = ref({});
  const evaluacionDataOriginal = ref([]);
  const datosImport = ref([]);
  const cargando = ref(false);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  onMounted(async () => {
    cargando.value = true;
    const { data } = await APIService.getAssessmentData();
    evaluacionData.value = data;    
    evaluacionDataOriginal.value = data;
   
    
    ordenarPorFechas(evaluacionData.value, "eventDate");
    ordenarPorFechas(evaluacionDataOriginal.value, "eventDate");
    cargando.value = false;
  });

  // function cargarData() {
  //   const headers = [
  //     'Fecha del Evento',
  //     'Cód. Expediente',
  //     'Nombre Común',
  //     'Nombre Científico'
  //   ];
  
  //   const data = evaluacionData.value.map(dato => [
  //     dato.eventDate,
  //     dato.cod_expediente,
  //     dato.cod_especie.vernacularName,
  //     `${dato.cod_especie.scientificName} - ${dato.cod_especie.scientificNameAuthorship}`
  //   ]);
  
  //    datosImport.value = [headers, ...data];
  // }

  const loadDataPdf = ()=>{
    const headers = [
      'Fecha del Evento',
      'Cód. Expediente',
      'placa',
    ]
    
    evaluacionData.value.map(item =>{
      const row = [item.eventDate, item.cod_expediente, item.numero_placa]
      datosImport.value.push(row)
    })
    console.log('cargando datos para pdf...');
    
    //downloadPdf(headers, datosImport.value, 'Reporte de evaluaciones')
  }

  //cargar datos de importación
  // watch(
  //   () => evaluacionData.value,
  //   () => {
  //     datosImport.value = [];
  //     cargarData();
  //   },
  //   { deep: true }
  // );

  //motor de búsqueda para el reporte de evaluaciones realizadas
  function buscarTermino(termino) {
    changePage(1);
    evaluacionData.value = evaluacionDataOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerCod_expediente = term.cod_expediente
        ? term.cod_expediente.toLowerCase()
        : "";

      // Verifica si la placa es igual al término (ya sea número o cadena)
     
      const termPlaca =
        term.numero_placa != null ? term.numero_placa.toString() : ""; // Convierte el número a cadena

      return (
        lowerCod_expediente.includes(lowerTermino) ||
        termPlaca === termino // Compara término y numero placa
      );
    });
  }

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil(evaluacionData.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a monitoreos por especie
  const displayedData = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return evaluacionData.value.slice(start, end);
    } catch {
      console.log("esperando paginación...");
    }
  });

  //función para cambiar de página monitoreos por especie
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
    }
  }

  // Función para ir a la primera página
  function goToFirstPage() {
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
  }

  // Función para ir a la última página
  function goToLastPage() {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
  }

  //quitar los filtros del motor de busqueda
  function quitarFiltroBuscado() {
    if (evaluacionDataOriginal.value) {
      evaluacionData.value = evaluacionDataOriginal.value;
    }
  }
  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    datosImport,
    evaluacionData,
    displayedData,
    changePage,
    buscarTermino,
    quitarFiltroBuscado,
    goToFirstPage,
    goToLastPage,
    loadDataPdf
  };
});
