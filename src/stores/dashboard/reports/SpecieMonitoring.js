import { ref, reactive, computed, watch } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {ordenarPorFechas} from '@/helpers'
import APIService from "@/services/APIService";

export const useSpecieMonitoring = defineStore("especieMonitoreo", () => {

  const cargando = ref(false);
  const router = useRouter();
  //monitoreos especie
  const monitoreosEspecie = ref({});
  const monitoreosEspecieOriginal = ref({});
  const nombreEspecie = ref("");

  const datosImport = ref([]);
  
  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  

  //consultar monitoreos de una especie
  async function verMonitoreosEspecie(cod_especie, nombre_especie) {
    cargando.value = true;
    nombreEspecie.value = nombre_especie;
    const { data } = await APIService.lookMonitoringSpecie(cod_especie);
    monitoreosEspecie.value = data
    monitoreosEspecieOriginal.value = data
    ordenarPorFechas(monitoreosEspecie.value,'fecha_monitoreo')
    ordenarPorFechas(monitoreosEspecieOriginal.value,'fecha_monitoreo')
    router.push("/monitoring-species");
    cargando.value = false;
  }

  function cargarData() {
    monitoreosEspecie.value.forEach((registro) => {
      datosImport.value.push(registro);
    });
  }

  //cargar datos de importacion
  watch(
    () => monitoreosEspecie.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil(monitoreosEspecie.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a monitoreos por especie
  const displayedMonitoring = computed(() => {
    try {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return monitoreosEspecie.value.slice(start, end);
    }catch{
      console.log('no hay paginación')
    }
  });

  //función para cambiar de página monitoreos por especie
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //filtrar fechas monitoreos especie
  function filtrarFecha(fechaInicio, fechaFin) {
    fechaInicio = new Date(fechaInicio);
    fechaFin = new Date(fechaFin);
    // Filtra el arreglo de objetos
    const resultadoFiltrado = monitoreosEspecieOriginal.value.filter(
      (monitoreo) => {
        const fechaMonitoreo = new Date(monitoreo.fecha_monitoreo);

        // Comprueba si la fecha de monitoreo está en el rango especificado
        return fechaMonitoreo >= fechaInicio && fechaMonitoreo <= fechaFin;
      }
    );

    return (monitoreosEspecie.value = resultadoFiltrado);
  }

  //resetear la tabla monitoreos especie
  function limpiarFiltroFecha() {
    monitoreosEspecie.value = monitoreosEspecieOriginal.value;
  }
  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    displayedMonitoring,
    monitoreosEspecie,
    nombreEspecie,
    datosImport,
    changePage,
    filtrarFecha,
    limpiarFiltroFecha,
    verMonitoreosEspecie,
  };
});
