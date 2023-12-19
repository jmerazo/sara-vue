import { ref, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";

export const useSamplesMade = defineStore("samplesMade", () => {

  const samplesData = ref({});
  const samplesDataOriginal = ref([]);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  const fetchSamplesData = async () => {
    const { data } = await APIService.getSamplesData();
    samplesData.value = data;
    samplesDataOriginal.value = data;
    samplesData.value.sort((a, b) => {
      const fechaA = new Date(a.fecha_coleccion);
      const fechaB = new Date(b.fecha_coleccion);
      return fechaB - fechaA;
    });
  };

  // Calcula el número total de páginas del objeto monitoreos por especie
  const totalPages = computed(() =>
    Math.ceil(samplesData.value.length / itemsPerPage.value)
  );

  // Calcula el numero de páginas a monitoreos por especie
  const displayedSamples = computed(() => {
    try {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return samplesData.value.slice(start, end);
    } catch {
      console.log("no hay paginación");
    }
  });

  //función para cambiar de página monitoreos por especie
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    samplesData,
    displayedSamples,
    changePage,
    fetchSamplesData,
  };
});
