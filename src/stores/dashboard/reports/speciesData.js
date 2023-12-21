import { ref, onMounted, computed, watch } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";

export const useEspeciesData = defineStore("especiesData", () => {
  const especiesData = ref([]);
  const especiesOriginalesData = ref([]);
  const datosImport = ref([]);
  const cargando = ref(false);
  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(20); // Elementos por página

  onMounted(async () => {
    cargando.value = true;
    const { data } = await APIService.getSpeciesData();
    especiesData.value = data;
    especiesOriginalesData.value = data;
    cargando.value = false;
  });

  function cargarData() {
    especiesData.value.forEach((especie) => {
      datosImport.value.push(especie);
    });
  }

  //cargar datos de importacion
  watch(
    () => especiesData.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );

  // Calcula el número total de páginas en función de los datos
  const totalPages = computed(() =>
    Math.ceil(especiesData.value.length / itemsPerPage.value)
  );

  // Calcula las especies a mostrar en la página actual
  const displayedEspeciesData = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return especiesData.value.slice(start, end);
    } catch {
      console.log("esperando paginación...");
    }
  });

  //función para cambiar de página
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //quitar los filtros del motor de busqueda
  function quitarFiltroEspecie() {
    if (especiesOriginalesData.value) {
      especiesData.value = especiesOriginalesData.value;
    }
  }

  function buscarTermino(termino) {
    changePage(1);
    especiesData.value = especiesOriginalesData.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerNomComunes = term.nom_comunes
        ? term.nom_comunes.toLowerCase()
        : "";
      const lowerCientifico = term.nombre_cientifico
        ? term.nombre_cientifico.toLowerCase()
        : "";

      // Verifica si term.cod_especie es igual al término (ya sea número o cadena)
      const termCodEspecie = term.cod_especie.toString(); // Convierte el número a cadena

      return (
        lowerNomComunes.includes(lowerTermino) ||
        termCodEspecie === termino || // Compara término y código de especie
        lowerCientifico.includes(lowerTermino)
      );
    });
  }

  return {
    cargando,
    currentPage,
    itemsPerPage,
    totalPages,
    displayedEspeciesData,
    especiesData,
    especiesOriginalesData,
    datosImport,
    buscarTermino,
    quitarFiltroEspecie,
    changePage,
  };
});
