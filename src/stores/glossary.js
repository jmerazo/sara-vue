import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";

export const useGlossaryStore = defineStore("glossary", () => {
  //data glosario
  const glossary = ref([]);
  const glossaryOriginal = ref([]);

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(16); // Elementos por página

  onMounted(async () => {
    const { data } = await APIService.getGlossary();
    glossary.value = data;
    glossaryOriginal.value = data;
  });

  // Calcula el número total de páginas en función de los datos
  const totalPages = computed(() =>
    Math.ceil(glossary.value.length / itemsPerPage.value)
  );

  // Calcula las glossary a mostrar en la página actual
  const displayedGlossary = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return glossary.value.slice(start, end);
  });

  //función para cambiar de página
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //motor de busqueda vista glosario
  function buscarTermino(termino) {
    changePage(1);
    glossary.value = glossaryOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      lowerTermino.toString();
      const lowerWord = term.word ? term.word.toLowerCase() : "";

      return lowerWord.includes(lowerTermino);
    });
  }

  //buscar por letra
  function buscarLetra(letra) {
    console.log(letra)
    changePage(1);
    if (letra === "todo") {
      glossary.value = glossaryOriginal.value;

      return;
    }
    return (glossary.value = glossaryOriginal.value.filter((words) =>
      words.word.toLowerCase().startsWith(letra)
    ));
  }

  //quitar filtro glosario
  function quitarFiltro(){
    glossary.value = glossaryOriginal.value;
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    displayedGlossary,
    glossary,
    changePage,
    buscarTermino,
    buscarLetra,
    quitarFiltro
    
  };
});
