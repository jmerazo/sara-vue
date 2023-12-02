import {ref, onMounted,computed} from 'vue'
import {defineStore} from 'pinia'
import { useConsultaStore } from '@/stores/consulta'
import APIService from '@/services/APIService'



export const useEspeciesData = defineStore('especiesData', () => {
    
    const consulta = useConsultaStore()
    const especiesData = ref([]);
    const especiesOriginalesData = ref([]);

    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(20); // Elementos por página


    onMounted(async () => {
      consulta.cargando = true
      const { data } = await APIService.getSpeciesData();
      especiesData.value = data;
      especiesOriginalesData.value = data;
      consulta.cargando = false
    });
  

    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() => Math.ceil(especiesData.value.length / itemsPerPage.value));

    // Calcula las especies a mostrar en la página actual
    const displayedEspeciesData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return especiesData.value.slice(start, end);
    });

    //función para cambiar de página
    function changePage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }

    //quitar los filtros del motor de busqueda
    function quitarFiltroEspecie(){
      if(especiesOriginalesData.value){
        especiesData.value = especiesOriginalesData.value
      }
    }

    function buscarTermino(termino) {
        changePage(1);
        especiesData.value = especiesOriginalesData.value.filter(term => {
          const lowerTermino = termino.toLowerCase();
          const lowerNomComunes = term.nom_comunes ? term.nom_comunes.toLowerCase() : '';
          const lowerCientifico = term.nombre_cientifico ? term.nombre_cientifico.toLowerCase() : '';
          
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
      currentPage,
      itemsPerPage,
      totalPages,
      displayedEspeciesData,
      especiesData,
      especiesOriginalesData,
      
      buscarTermino,
      quitarFiltroEspecie,
      changePage,
    };
});
