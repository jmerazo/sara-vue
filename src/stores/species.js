import {ref, onMounted,computed} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from '../stores/modal'
import {useConsultaStore} from '../stores/consulta'
import APIService from '../services/APIService'



export const useEspeciesStore = defineStore('especies', () => {
    const modal = useModalStore();
    const consulta = useConsultaStore()
    const especies = ref([]);
    const especie = ref({});
    const noResultados = computed(() => especies.value.length === 0 );
    const especiesOriginales = ref([]);

    onMounted(async () => {
      consulta.cargando = true
      const { data } = await APIService.getSpecies();
      especies.value = data;
      especiesOriginales.value = data;
      consulta.cargando = false
    });
  
    async function seleccionarEspecie(nombre_comun) {
      consulta.cargando = true
      const { data } = await APIService.lookSpecie(nombre_comun);
      especie.value = data;
      consulta.cargando = false
      modal.handleClickModal();
      
    }

    //quitar los filtros del motor de busqueda
    function quitarFiltroEspecie(){
      if(especiesOriginales.value !==[]){
        especies.value = especiesOriginales.value
      }
    }

    
    function buscarTermino(termino) {
      
      especies.value = especiesOriginales.value.filter(term => {
        const lowerTermino = termino.toLowerCase();
        const lowerNomComunes = term.nom_comunes ? term.nom_comunes.toLowerCase() : '';
        const lowerCientifico = term.nombre_cientifico ? term.nombre_cientifico.toLowerCase(): '';
        const lowerFamilia = term.familia ? term.familia.toLowerCase(): '';
  
        return (
          lowerNomComunes.includes(lowerTermino) ||
          lowerFamilia.includes(lowerTermino) ||
          lowerCientifico.includes(lowerTermino)
        );
      });
    }

    
    return {
      especies,
      especie,
      noResultados,
      especiesOriginales,
      seleccionarEspecie,
      buscarTermino,
      quitarFiltroEspecie
    };
});
