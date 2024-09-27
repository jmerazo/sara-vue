import { ref, computed, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { ordenarPorFechas } from "@/helpers/";
import { useModalStore } from "../../modal";

import APIService from "@/services/APIService";


export const useGeneralMonitoring = defineStore("generalMonitoring", () => {
  const modal = useModalStore();

  //state iniciales de la vista
  const monitoringData = ref({});
  const monitoringDataOriginal = ref([]);
  const datosImport = ref([]);
  const cargando = ref(false);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  //seleccionar un monitoreos
  const currentSection = ref(0);
  const singleMonitoring = ref({});
  const placas = ref({});
  const isEdit = ref(false)
  const error = ref("");

  onMounted(async () => {
    cargando.value = true;
    const { data } = await APIService.getMonitoringData();
    monitoringData.value = data;
    monitoringDataOriginal.value = data;
    ordenarPorFechas(monitoringData.value, "fecha_monitoreo");
    ordenarPorFechas(monitoringDataOriginal.value, "fecha_monitoreo");
    cargando.value = false;
    generarPlacasUnicas();
  });

  /* function cargarData() {
    monitoringData.value.forEach((dato) => {
      datosImport.value.push(dato);
    });
  } */

  function cargarData() {
    const headers = [
      'Fecha',
      'Especie',
      'Temperatura',
      'Humedad',
      'Precipitación',
      'Fac. Climatico',
      'Flor',
      'Frutos'
    ];
  
    const data = monitoringData.value.map(dato => [
      dato.fecha_monitoreo,
      dato.specie.vernacularName,
      dato.temperatura,
      dato.humedad,
      dato.precipitacion,
      dato.factor_climatico,
      dato.flor_abierta,
      dato.frutos_verdes,
    ]);
  
    datosImport.value = [headers, ...data];
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
    monitoringData.value = monitoringDataOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerComun = term.specie.vernacularName ? term.specie.vernacularName.toLowerCase() : "";
      const lowerNombre_cientifico = term.specie.nombre_cientifico
        ? term.specie.nombre_cientifico.toLowerCase()
        : "";
      
      const termPlaca =
        term.evaluacion.numero_placa != null ? term.evaluacion.numero_placa.toString() : ""; // Convierte el número a cadena

      return (
        lowerComun.includes(lowerTermino) ||
        lowerNombre_cientifico.includes(lowerTermino) ||
        
        termPlaca === termino // Compara término y numero placa
      );
    });
  }

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil(monitoringData.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a monitoreos por especie
  const displayedData = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return monitoringData.value.slice(start, end);
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
  // ---------------------------------------------------------------------------------------------> crear y editar monitoreos
  //funcion para buscar y generar un objeto con placas unicas mas sus datos base
  function generarPlacasUnicas() {
    // Crea un objeto para almacenar las placas únicas
    const placasUnicas = {};

    // Recorre el objeto monitoringData
    for (const dato of monitoringData.value) {
      // Verifica si la placa ya existe en el objeto de placas únicas
      if (!placasUnicas.hasOwnProperty(dato.numero_placa)) {
        // Si la placa no existe, agrega el dato al objeto de placas únicas
        placasUnicas[dato.numero_placa] = {
          numero_placa: dato.numero_placa,
          cod_especie: dato.cod_especie,
          nom_comunes: dato.nom_comunes,
          nombre_cientifico: dato.nombre_cientifico,
        };
      }
    }

    // Asigna el objeto de placas únicas a la variable placas
    placas.value = placasUnicas;
  }
  //seleccionart un monitoreo
  function selectMonitoring(data, edit) {
    currentSection.value = 0;
    isEdit.value = edit
    singleMonitoring.value = data;
    modal.handleClickModalFormMonitoring();
  }

  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    displayedData,
    datosImport,
    monitoringData,
    singleMonitoring,
    currentSection,
    placas,
    error,
    isEdit, 
    buscarTermino,
    changePage,
    quitarFiltroBuscado,
    selectMonitoring,
  };
});
