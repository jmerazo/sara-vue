import {ref, onMounted, computed, watch } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useGlossaryStore = defineStore('glossary',()=>{
    
    const glossary = ref([])
    const selectedLetter = ref(null);
    const searchTerm = ref('');

    onMounted(async ()=>{
        const {data} = await APIService.getGlossary()
        glossary.value = data
    })

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
        glossary,
        selectedLetter,
        searchTerm,
        setSelectedLetter,
        setSearchTerm,
        getFilteredGlossary
    }
})