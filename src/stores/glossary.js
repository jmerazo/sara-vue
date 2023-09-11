import {ref, onMounted, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useGlossaryStore = defineStore('glossary',()=>{
    
    const glossary = ref([])
    const selectedLetter = ref(null);
    const searchTerm = ref('');
    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(16); // Elementos por página

    onMounted(async ()=>{
        const {data} = await APIService.getGlossary()
        glossary.value = data
    })


    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() => Math.ceil(glossary.value.length / itemsPerPage.value));

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

    //funcion de filtrado vista glosario
    function getFilteredGlossary() {
        if (selectedLetter.value !== null) {
            const letter = selectedLetter.value.toLowerCase();
            return glossary.value.filter((term) => term.word.toLowerCase().startsWith(letter));
        } else if (searchTerm.value !== '') {
            const search = searchTerm.value.toLowerCase();
            return glossary.value.filter(
              (term) =>
                term.word.toLowerCase().includes(search)
            );
        } else {
            return glossary.value;
        }
    }
    
    function setSelectedLetter(letter) {
        selectedLetter.value = letter;
    }

    function setSearchTerm(term) {
        searchTerm.value = term;
    }

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        displayedGlossary,
        glossary,
        selectedLetter,
        searchTerm,
        setSelectedLetter,
        setSearchTerm,
        getFilteredGlossary,
        changePage
    }
})