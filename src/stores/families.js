import {ref, onMounted, computed} from 'vue'
import {defineStore} from 'pinia'
import {useConsultaStore} from './consulta'
import APIService from '../services/APIService'

export const useFamiliasStore = defineStore('familias',()=>{
    
    const familias = ref([])
    const familiasOriginal= ref([])
    const consulta = useConsultaStore()
    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(10); // Elementos por página

    onMounted(async ()=>{
        consulta.cargando = true
        const {data} = await APIService.getFamilies()
        familias.value = data
        familiasOriginal.value = data
        consulta.cargando = false
    })

     // Calcula el número total de páginas en función de los datos
     const totalPages = computed(() => Math.ceil(familias.value.length / itemsPerPage.value));

     // Calcula las familias a mostrar en la página actual
     const displayedFamilias = computed(() => {
     const start = (currentPage.value - 1) * itemsPerPage.value;
     const end = start + itemsPerPage.value;
     return familias.value.slice(start, end);
     });
 
     //función para cambiar de página
     function changePage(page) {
       if (page >= 1 && page <= totalPages.value) {
         currentPage.value = page;
       }
     }


    //quitar los filtros del motor de busqueda
    function quitarFiltroFamilia(){
      if(familiasOriginal){
          familias.value = familiasOriginal.value
      }
    }

    function buscarTermino(termino) {
      
        familias.value = familiasOriginal.value.filter(term => {
          const lowerTermino = termino.toLowerCase();
          const lowerFamilia = term.familia ? term.familia.toLowerCase(): '';
    
          return (
            lowerFamilia.includes(lowerTermino)
          );
        });
      }

    return {
        currentPage,
        itemsPerPage,
        totalPages,
        displayedFamilias,
        familias,
        buscarTermino,
        quitarFiltroFamilia,
        changePage
        
        
    }
})